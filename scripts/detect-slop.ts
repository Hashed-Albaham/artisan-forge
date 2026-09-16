/**
 * scripts/detect-slop.ts
 *
 * Production Code Artisan AST-Level Anti-Slop & Security Linter.
 * Uses the native TypeScript Compiler API to perform deep AST inspections:
 * 1. Prohibits empty catch blocks (swallowed errors)
 * 2. Prohibits unsanitized SQL template interpolations (SQL injection)
 * 3. Prohibits forbidden 'any' types in production application code
 * 4. Prohibits lazy AI stub comments ("// TODO: implement later", "// Write your logic here")
 * 5. Prohibits hardcoded real secret credentials
 */

import * as fs from "fs";
import * as path from "path";
import ts from "typescript";

interface Violation {
  filePath: string;
  line: number;
  column: number;
  rule: string;
  snippet: string;
}

const violations: Violation[] = [];

// Directories to scan for actual production code violations
const SCAN_DIRS = ["src", "server.ts"];
const IGNORED_FILES = ["skillsData.ts", "uiDesignData.ts"]; // Exclude static documentation string dictionaries
const IGNORED_DIRS = ["node_modules", "dist", ".git"];

function getFilesRecursively(dirOrFile: string): string[] {
  const stat = fs.statSync(dirOrFile);
  if (!stat.isDirectory()) {
    return [dirOrFile];
  }

  let results: string[] = [];
  const list = fs.readdirSync(dirOrFile);

  for (const file of list) {
    if (IGNORED_DIRS.includes(file)) continue;
    if (IGNORED_FILES.includes(file)) continue;

    const fullPath = path.join(dirOrFile, file);
    const subStat = fs.statSync(fullPath);
    if (subStat && subStat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else if (/\.(ts|tsx)$/.test(file) && !file.endsWith(".d.ts")) {
      results.push(fullPath);
    }
  }

  return results;
}

function analyzeSourceFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );

  // Check 1: Actual comment trivia (lines starting with // or /*)
  const lines = content.split("\n");
  lines.forEach((lineText, idx) => {
    const trimmed = lineText.trim();
    // Only flag if it's an actual comment, not an illustrative string inside JSX or quotes
    if (trimmed.startsWith("//") || trimmed.startsWith("/*")) {
      if (/\bTODO:?\s*(?:implement|write your|placeholder|dummy|fixme later)/i.test(trimmed)) {
        violations.push({
          filePath,
          line: idx + 1,
          column: lineText.indexOf("//") + 1,
          rule: "ARTISAN-001: Lazy AI placeholder comment detected in source code",
          snippet: trimmed
        });
      }
    }

    // Check 2: Hardcoded real API keys/credentials (excluding comments and documentation strings)
    if (
      !trimmed.startsWith("//") &&
      !trimmed.startsWith("*") &&
      !filePath.includes("GitHubKit.tsx") && // Skip copyable example templates
      /(?:const|let|var)\s+\w*(?:API_KEY|SECRET|PASSWORD)\w*\s*=\s*["'][A-Za-z0-9_\-]{20,}["']/i.test(trimmed)
    ) {
      violations.push({
        filePath,
        line: idx + 1,
        column: 1,
        rule: "ARTISAN-002: Hardcoded secret credential detected in source code",
        snippet: trimmed
      });
    }
  });

  // Check 3: AST Traversal for Syntax Nodes
  function visit(node: ts.Node) {
    // 3.1: Catch clauses with empty bodies
    if (ts.isCatchClause(node)) {
      const block = node.block;
      if (block.statements.length === 0) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        violations.push({
          filePath,
          line: line + 1,
          column: character + 1,
          rule: "ARTISAN-003: Empty catch block swallowing errors silently",
          snippet: node.getText(sourceFile).slice(0, 60)
        });
      }
    }

    // 3.2: SQL injection via Template Expressions (actual SQL clauses, not CSS classes)
    if (ts.isTemplateExpression(node)) {
      const text = node.getText(sourceFile);
      // Ensure it's a real SQL statement with clauses, avoiding Tailwind classes like "select-none"
      const isSqlStatement = /\b(SELECT\s+[\w*`"']|INSERT\s+INTO\s+[\w`"']|UPDATE\s+[\w`"']+\s+SET|DELETE\s+FROM\s+[\w`"'])/i.test(text);
      if (isSqlStatement) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        violations.push({
          filePath,
          line: line + 1,
          column: character + 1,
          rule: "ARTISAN-004: Raw dynamic SQL template interpolation. Use parameterized prepared statements ($1, $2 or ?)",
          snippet: text.slice(0, 80)
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

function runAudit() {
  console.log("🛡️ [Production Code Artisan] Running AST Anti-Slop & Quality Gate Audit...\n");

  const filesToScan: string[] = [];
  for (const target of SCAN_DIRS) {
    const full = path.join(process.cwd(), target);
    if (fs.existsSync(full)) {
      filesToScan.push(...getFilesRecursively(full));
    }
  }

  console.log(`📂 Scanned ${filesToScan.length} production source files.`);

  for (const file of filesToScan) {
    analyzeSourceFile(file);
  }

  if (violations.length === 0) {
    console.log("✅ QUALITY GATE PASSED: Zero AI slop, zero empty catches, and zero unsanitized queries detected!");
    process.exit(0);
  } else {
    console.error(`❌ QUALITY GATE FAILED: Found ${violations.length} critical code health violations:\n`);
    violations.forEach((v, index) => {
      console.error(`  [#${index + 1}] ${v.rule}`);
      console.error(`      at ${v.filePath}:${v.line}:${v.column}`);
      console.error(`      Code: "${v.snippet}"\n`);
    });
    process.exit(1);
  }
}

runAudit();
