# ⚡ Production Code Artisan Suite

<div align="center">

[![Quality Gate](https://github.com/artisan-ai/production-code-artisan/actions/workflows/artisan-quality-gate.yml/badge.svg)](https://github.com/artisan-ai/production-code-artisan/actions)
[![Validate Skills](https://github.com/artisan-ai/production-code-artisan/actions/workflows/validate-skills.yml/badge.svg)](https://github.com/artisan-ai/production-code-artisan/actions)
[![Token Economy](https://img.shields.io/badge/Token%20Reduction-88.03%25-10b981.svg)](benchmarks/token-reduction.json)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](LICENSE)
[![Security: OWASP Top 10](https://img.shields.io/badge/Security-OWASP%20Hardened-emerald.svg)](SECURITY.md)
[![TypeScript: Strict](https://img.shields.io/badge/TypeScript-Strict%20Zero--Errors-3178c6.svg)](tsconfig.json)

**The battle-tested Skill Suite that transforms AI coding models into senior software architects.**<br/>
Eliminates AI slop, secures OWASP vulnerabilities, automates Atomic Design mockups, and reduces prompt token waste by **88%**.

[Features](#-key-capabilities) • [Architecture](#-3-tier-progressive-disclosure) • [Quick Start](#-quick-start) • [Quality Gate](#-multi-stage-quality-gate) • [License](#-license)

</div>

---

## 💡 The Problem: Why AI-Generated Code Fails in Production

Autonomous AI coding agents frequently exhibit destructive failure modes:
1. **Shallow Stubs & Illusions**: Emitting `// TODO: implement later` or returning hardcoded dummy `{ status: 200 }` objects.
2. **Security Vulnerabilities**: Raw string interpolation in SQL/NoSQL statements, hardcoded secrets, and missing input bounds checking.
3. **Silent Exception Swallowing**: `catch (e) {}` blocks that leave production systems blind to downstream failures.
4. **N+1 Database Loop Cascades**: Firing asynchronous database queries inside `.map()` loops, starving connection pools.
5. **Token Bloat**: Monolithic multi-skill prompts dumping 9,000+ tokens into context memory on every interaction turn.

---

## 🚀 Key Capabilities

### 1. `production-code-artisan` (Tier 2 Core Standard)
- **Zero-Slop Mandate**: Zero placeholder comments or fake mocks; full syntactically verified business logic.
- **OWASP Hardened**: Parameterized queries ($1, ?), environment variable secrets, and runtime schema parsing via Zod.
- **Concurrency Hygiene**: Eliminates queries inside loops with batch operations (`ANY($1::int[])`).
- **Universal Arabic RTL**: CSS logical properties (`padding-inline`, `margin-inline`) and `<bdi>` token isolation.

### 2. `muapi-ui-design` (Tier 2 Visual Architecture)
- **Atomic Design Hierarchy**: Composes Atoms, Molecules, Organisms, and platform Templates.
- **Design Tokens Integration**: Conforms to W3C Design Tokens Community Group (DTCG) and Style Dictionary standards (`design-tokens.json` + JSON Schema).
- **Automated CLI Client**: `generate-mockup.sh` delivers responsive mockups (16:9, 9:16, 4:3) with input validation and error diagnostics.

### 3. Progressive Disclosure Router (Tier 1 Dispatcher)
- **88.03% Token Reduction**: Paged on-demand loading lowers turn footprint from ~9,420 to ~1,128 tokens.
- **Weighted Intent Engine**: Deterministic trigger evaluation with explicit exclusion handling and fallback precedence.

### 4. AST-Level Anti-Slop Linter (`scripts/detect-slop.ts`)
- **Native TypeScript Compiler API**: Deep AST tree traversal replaces brittle regex to catch empty catches, SQL string interpolations, hardcoded credentials, and lazy TODOs.

---

## 🏗️ 3-Tier Progressive Disclosure Architecture

```
[User Request Turn]
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ Tier 1: Router Signature (~120 tokens, warm memory)    │
│  • Lightweight intent scoring & route matching         │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────┐
│ Tier 2: Domain-Targeted Skill (~600 tokens, on demand) │
│  • production-code-artisan OR muapi-ui-design          │
└───────────────────────┬────────────────────────────────┘
                        │ (Only when heavy scripts or generation required)
                        ▼
┌────────────────────────────────────────────────────────┐
│ Tier 3: Tool Execution Payload (~2,200 tokens)         │
│  • generate-mockup.sh, design-tokens.json, AST linter  │
└────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start

### 1. Enable in Cursor or Windsurf
Drop `.cursorrules` into your project root:
```bash
curl -sSL https://raw.githubusercontent.com/artisan-ai/production-code-artisan/main/skills/production-code-artisan/.cursorrules -o .cursorrules
```

### 2. Run the AST Anti-Slop Audit
```bash
npm run audit:slop
```

### 3. Generate High-Fidelity UI Mockups
```bash
export MUAPI_KEY="your_token"
./skills/muapi-ui-design/generate-mockup.sh \
  --prompt "Real-time Kubernetes Telemetry & Cost Dashboard" \
  --platform web \
  --theme emerald-slate
```

---

## 🛡️ Multi-Stage Quality Gate

Our CI pipeline enforces zero-compromise engineering:

| Stage | Tool | Purpose |
| :--- | :--- | :--- |
| **Stage 1** | **Gitleaks** | Detects leaked secrets, private keys, and API tokens. |
| **Stage 2** | **Semgrep** | Audits OWASP Top 10 vulnerabilities (SQLi, XSS, NoSQLi). |
| **Stage 3** | **AST Anti-Slop** | Traverses TypeScript AST for empty catches & lazy stubs. |
| **Stage 4** | **Trivy** | Scans dependencies and filesystem for CVEs. |

---

## 📊 Token Economy Benchmark

Benchmarked on 200 real-world developer prompts using `cl100k_base`:

```
=================================================
Average Baseline:    9,420 tokens / turn
Average Optimized:   1,128 tokens / turn
Net Token Reduction: 88.03% (8.35x lower operational cost)
=================================================
```

---

## 📄 License & Security

- Licensed under the [Apache-2.0 License](LICENSE).
- Security vulnerability disclosure policy: [SECURITY.md](SECURITY.md).
- Contribution guide: [CONTRIBUTING.md](CONTRIBUTING.md).
- Changelog: [CHANGELOG.md](CHANGELOG.md).
