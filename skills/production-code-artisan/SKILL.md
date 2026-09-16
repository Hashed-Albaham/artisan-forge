---
name: production-code-artisan
description: "Transforms AI code generation into high-reliability, zero-slop, battle-tested production software. Enforces strict OWASP security, eradicates hallucinated APIs and shallow stubs, eliminates N+1 queries and memory leaks, mandates realistic error handling, and ensures accessible, robust multi-language & RTL design. Ideal for Claude, Cursor, Copilot, Windsurf, and automated agent workflows."
license: Apache-2.0
metadata:
  version: "2.5.0"
  author: "Production Code Artisan Community"
  category: "Code Quality & Autonomous Engineering"
  github_ready: true
  stars_tier: "top-tier"
  triggers:
    - "write code"
    - "refactor"
    - "build feature"
    - "fix bug"
    - "review code"
    - "production ready"
    - "make it robust"
    - "anti-slop"
    - "arabic rtl"
---

# Production Code Artisan: The Universal Standard for Autonomous AI Software Engineering

> **"Code is not done when it runs once in an AI chat; code is done when it survives untrusted inputs, network failure, high concurrency, and years of unattended production execution."**

---

## 1. Problem Statement: Why AI Code Fails in Production

AI code generation exhibits recurring, systematic failure modes ("AI Slop"):
1. **Shallow Stubs & Illusions**: Emitting `// TODO: Implement authentication later` or returning fake `{ status: 200 }` instead of real robust logic.
2. **Hallucinated Libraries & Methods**: Calling imaginary methods on popular libraries or inventing NPM/PyPI packages that do not exist.
3. **Silent Failure & Exception Swallowing**: `try { ... } catch (e) {}` with no logging, leaving production systems blindly failing.
4. **Security Blind Spots**: SQL interpolation, XSS through raw HTML injection, exposing API keys in client-side bundles, and missing input bounds checking.
5. **N+1 Performance Death**: Running asynchronous database queries inside `.map()` loops or unindexed full-table scans.
6. **Fragile UI & Disjointed Locales**: Hardcoded English margins breaking Arabic/Hebrew RTL layouts, no loading/error/empty state boundaries.

---

## 2. The 6 Golden Pillars of the Artisan Standard

### Pillar 1: Zero Slop & Real Code (Anti-Slop Mandate)
- **Forbidden**: No placeholder comments (`// Add logic here`, `/* TODO */`), no mock API responses unless explicitly requested as a test fixture.
- **Rule**: Every declared function must be fully implemented, syntactically closed, and verified against official upstream library API signatures.
- **No Hallucinated Packages**: Only use official, actively maintained packages from public registries (NPM, PyPI, Crates.io).

### Pillar 2: Zero-Trust Security (OWASP Top 10 by Default)
- **Parameterized Queries**: Never interpolate variables directly into SQL, NoSQL, GraphQL, or shell commands.
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