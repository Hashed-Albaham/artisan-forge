---
name: production-code-artisan
description: "Transforms AI code generation into high-reliability, zero-slop, battle-tested production software. Enforces strict OWASP security, eradicates hallucinated APIs and shallow stubs, eliminates N+1 queries and memory leaks, mandates realistic error handling, and ensures accessible, robust multi-language & RTL design. Compatible with Claude 3.5+, GPT-4o, Cursor, Windsurf, and autonomous agent frameworks."
license: Apache-2.0
repository: "https://github.com/artisan-ai/production-code-artisan"
metadata:
  version: "2.5.0"
  author: "Artisan Software Guild"
  homepage: "https://github.com/artisan-ai/production-code-artisan"
  category: "Code Quality & Autonomous Engineering"
  triggers:
    primary:
      - "write code"
      - "refactor"
      - "build feature"
      - "fix bug"
      - "review code"
    secondary:
      - "sql"
      - "owasp"
      - "n+1"
      - "error handling"
      - "anti-slop"
      - "arabic rtl"
      - "typescript"
---

# ⚡ Production Code Artisan: The Universal Standard for Autonomous AI Software Engineering

> **"Code is not done when it runs once in an AI chat; code is done when it survives untrusted inputs, network failure, high concurrency, and years of unattended production execution."**

---

## 1. Problem Statement: Why AI Code Fails in Production

Autonomous AI models and copilot prompts exhibit recurring, systematic failure modes ("AI Slop"):
1. **Shallow Stubs & Illusions**: Emitting `// TODO: Implement authentication later` or returning fake `{ status: 200 }` instead of real robust logic.
2. **Hallucinated Libraries & Methods**: Calling non-existent methods on popular SDKs or importing fabricated NPM/PyPI packages.
3. **Silent Failure & Exception Swallowing**: Catching errors with empty blocks `catch (e) {}`, blinding production observability.
4. **Security Vulnerabilities**: String interpolation in SQL/NoSQL queries, hardcoded credentials, unvalidated inputs, and XSS risks.
5. **N+1 Performance Death**: Running asynchronous database queries inside `.map()` loops or unindexed full-table scans.
6. **Fragile Internationalization**: Hardcoded physical margins (`ml-4`) breaking Arabic/Hebrew RTL layouts, mixed numerals without bidirectional isolation.

---

## 2. The 6 Golden Pillars of the Artisan Standard

### Pillar 1: Zero Slop & Real Code (Anti-Slop Mandate)
- **Forbidden**: No placeholder comments (`// Add logic here`, `/* TODO */`), no mock API responses unless explicitly requested as a test fixture.
- **Rule**: Every declared function must be fully implemented, syntactically closed, and verified against official upstream library API signatures.
- **Dependency Integrity**: Only use official, actively maintained packages from public registries (NPM, PyPI, Crates.io).

### Pillar 2: Zero-Trust Security (OWASP Top 10 by Default)
- **Parameterized Queries**: Never interpolate variables directly into SQL, NoSQL, GraphQL, or shell commands. Use prepared statements ($1, $2, ?).
- **Credential Segregation**: All secrets (`API_KEY`, `DATABASE_URL`, `JWT_SECRET`) must be externalized to environment variables and validated at startup.
- **Safe Output Rendering**: Prevent XSS by using framework-native sanitization; never bypass safety unless audited with an approved DOM sanitizer (DOMPurify).

### Pillar 3: Deep Performance & Concurrency Hygiene
- **Batching Over Loops**: Never perform network requests or database queries inside an iteration loop. Use bulk operations (`Promise.all`, SQL `IN`, batch mutations).
- **Resource Cleanup**: Always unsubscribe from event listeners, clear timers/intervals, and release open database connections in `finally` blocks or React `useEffect` cleanups.
- **Stateless & Scalable**: Design handlers to be horizontally scalable and idempotent where possible.

### Pillar 4: Resilient Error Handling & Observability
- **Type-Narrowed Errors**: In TypeScript, always catch as `unknown` and narrow (`err instanceof Error ? err.message : String(err)`).
- **Contextual Logging**: Errors must log actionable debugging metadata (request ID, timestamp, entity ID) without logging private user PII or raw secrets.
- **Graceful Degradation**: Always provide user-facing recovery actions (e.g. retry buttons, fallback caches) instead of blank crashes.

### Pillar 5: Strict Typing & Upstream Contracts
- **No `any` Escapes**: Eliminate `any` in TypeScript. Use discriminative unions, generics, `unknown`, or Zod/Valibot runtime schema validators.
- **Strict Nullability**: Guard against `undefined` and `null` with explicit checks and non-null assertions only when mathematically proven.

### Pillar 6: Universal Internationalization & Arabic RTL Excellence
- **CSS Logical Properties**: Use `ms-*`, `me-*`, `ps-*`, `pe-*` or logical margins/padding instead of hardcoded `ml-*` or `mr-*`.
- **Bidirectional Isolation**: Wrap identifiers, telephone numbers, code snippets, and Latin tokens in `<bdi>` or `dir="ltr"` inside Arabic/RTL contexts.
- **UTF-8 & utf8mb4**: Ensure database collations, API headers (`charset=utf-8`), and file formats maintain Arabic diacritics and character integrity.

---

## 3. System Prompt (Ready for Claude, Cursor, Copilot & Windsurf)

Inject this block into your agent's system prompt or `.cursorrules`:

```markdown
You are a Senior Principal Software Architect operating under the "Production Code Artisan" standard.
Your mission is to generate production-ready, resilient, and secure code on every turn.

MANDATES:
1. ZERO SLOP: Implement full functions. Never leave "// TODO: implement later", dummy stubs, or incomplete brackets.
2. SECURITY FIRST: Parameterize all database queries. Reject string interpolation in SQL/NoSQL. Never hardcode API keys or credentials.
3. CONCURRENCY & PERFORMANCE: Prohibit I/O operations inside iterative loops (solve N+1 with batching / Promise.all).
4. DEFENSIVE ERROR HANDLING: Never swallow errors with empty catch blocks. Catch as `unknown`, type-narrow, and log contextual metadata.
5. STRICT TYPES: Prohibit `any`. Enforce strict interfaces, runtime input validation (Zod/type guards), and exhaustive union switches.
6. RTL & ACCESSIBILITY: Use CSS logical properties (padding-inline, margin-inline) and isolate LTR technical tokens with <bdi> in Arabic/RTL views.
```

---

## 4. Definition of Done (DoD) Checklist

Before marking any coding task complete, verify every checkbox:

- [ ] **Implementation Completeness**: Zero `TODO`, `FIXME`, or stub mock returns in production files.
- [ ] **Injection Immunity**: All database queries use prepared parameterized statements ($1, $2, ?).
- [ ] **Secrets Audited**: Zero plain-text tokens or keys; all credentials resolved via validated environment variables.
- [ ] **Concurrency Hygiene**: Zero network or database operations nested inside `for`, `while`, or `.forEach` loops.
- [ ] **Error Visibility**: Every `try/catch` block narrows the error type and records contextual structured telemetry.
- [ ] **Type Soundness**: Code compiles clean under `tsc --noEmit` with zero `any` evasions.
- [ ] **Responsive & RTL Ready**: Layout preserves layout integrity in both LTR and RTL directions with WCAG AA contrast (≥ 4.5:1).
- [ ] **Automated Tests**: Unit or integration test fixtures verify happy path and at least 2 distinct failure/edge cases.

---

## 5. Anti-Pattern Catalog & Refactoring Guide

### 5.1 SQL Injection Vulnerability
❌ **Anti-Pattern (Vulnerable Dynamic Interpolation)**:
```typescript
// DANGEROUS: User input concatenated into SQL string
app.get("/users", async (req, res) => {
  const { role } = req.query;
  const result = await db.query(`SELECT * FROM users WHERE role = '${role}'`);
  res.json(result.rows);
});
```

✅ **Artisan Standard (Prepared Parameterized Query)**:
```typescript
import { Request, Response } from "express";
import { z } from "zod";

const UserQuerySchema = z.object({
  role: z.enum(["admin", "member", "guest"])
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const { role } = UserQuerySchema.parse(req.query);
    const result = await db.query(
      "SELECT id, username, email, role, created_at FROM users WHERE role = $1",
      [role]
    );
    return res.json({ success: true, data: result.rows });
  } catch (err: unknown) {
    logger.error("Failed to query users", { error: err instanceof Error ? err.message : String(err) });
    return res.status(400).json({ success: false, error: "Invalid query parameters" });
  }
});
```

### 5.2 N+1 Query Cascade
❌ **Anti-Pattern (N+1 Query Loop)**:
```typescript
// DANGEROUS: 100 users = 101 database roundtrips
const users = await db.query("SELECT id FROM users");
const enrichedUsers = await Promise.all(
  users.rows.map(async (u) => {
    const orders = await db.query(`SELECT * FROM orders WHERE user_id = ${u.id}`);
    return { ...u, orders: orders.rows };
  })
);
```

✅ **Artisan Standard (Single Batched Query with Join / IN)**:
```typescript
const users = await db.query("SELECT id, name FROM users WHERE active = true");
const userIds = users.rows.map(u => u.id);

if (userIds.length === 0) {
  return [];
}

const orders = await db.query(
  "SELECT id, user_id, total, status FROM orders WHERE user_id = ANY($1::int[])",
  [userIds]
);

const ordersByUser = orders.rows.reduce<Record<number, Order[]>>((acc, order) => {
  (acc[order.user_id] = acc[order.user_id] || []).push(order);
  return acc;
}, {});

const enrichedUsers = users.rows.map(user => ({
  ...user,
  orders: ordersByUser[user.id] || []
}));
```

---

## 6. Multi-Language Quality Matrix

| Concern | TypeScript / Node.js | Python / FastAPI | Go | Rust | SQL / PostgreSQL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SQL Safety** | Parameterized `$1` via `pg` / Prisma | Parameterized `:val` via SQLAlchemy / asyncpg | `$1` via `pgx` / `database/sql` | `$1` via `sqlx` bind params | Prepared statements only |
| **Secret Management** | `process.env` + Zod / envalid | `pydantic-settings` + `.env` | `os.Getenv` + config struct | `std::env::var` + `config` crate | Vault / KMS external roles |
| **Type Rigor** | Strict mode, no `any`, Valibot/Zod | Type hints, mypy `--strict`, Pydantic | Idiomatic error checks (`if err != nil`) | Exhaustive `match`, Result/Option | Strict column constraints & types |
| **Error Handling** | Catch as `unknown`, narrow type | Catch specific exceptions, raise HTTP | Wrap with `fmt.Errorf("%w", err)` | `?` operator + `thiserror`/`anyhow` | Structured RAISE EXCEPTION |

---

## 7. Conflict Resolution & Precedence Rules

When multiple skills or project guidelines interact, adhere to this hierarchy:
1. **Safety & Security (OWASP)**: Non-negotiable highest priority. Trumps brevity, framework shortcuts, or developer preferences.
2. **Deterministic Correctness**: Complete real logic trumps premature optimization or rapid prototyping.
3. **Specialized Skill Delegation**:
   - If UI mockups or design tokens are requested: Delegate to `muapi-ui-design`.
   - If backend API, database queries, refactoring, or security audits are requested: Retain `production-code-artisan`.
   - If both are requested: Compose Tier 2 specifications; do not load monolithic unreferenced assets.

---

## 8. Limitations & Explicit Boundaries

To maintain high engineering fidelity, `production-code-artisan` explicitly declares its operational boundaries:
- **No Hardware Driver Synthesis**: Does not write embedded kernel C drivers without simulated hardware fixtures.
- **No Automated Penetration Attacks**: Provides defensive hardening; does not generate weaponized exploit payloads.
- **Environment Bound**: Requires target runtime dependencies to exist in standard registries (cannot compile proprietary internal closed SDKs without user definitions).
