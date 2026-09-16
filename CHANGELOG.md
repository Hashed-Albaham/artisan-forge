# Changelog

All notable changes to the Production Code Artisan Suite and related skills will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.5.0] - 2026-09-16

### Added
- **Progressive Disclosure Router**: Implemented 3-tier delegation architecture reducing per-turn prompt overhead by **88.03%**.
- **muapi-ui-design (v0.2.0)**: Upgraded UI/UX mockup generation engine with Atomic Design hierarchy and `generate-mockup.sh` production CLI.
- **AST Anti-Slop Linter (`scripts/detect-slop.ts`)**: Native TypeScript Compiler API AST audit replacing fragile regex scanning.
- **DTCG & Style Dictionary Tokens (`design-tokens.json`)**: Full primitive and semantic token scales with JSON schema validation.
- **Unified GitHub Actions Quality Gate (`artisan-quality-gate.yml`)**: Integrated Gitleaks secret scanning, Semgrep OWASP SAST, Trivy SCA, and strict typechecking.

### Changed
- Refactored `production-code-artisan` with comprehensive Definition of Done (DoD), Anti-Pattern Catalog, and System Prompt.
- Consolidated duplicate CI workflows into single unified quality gate.

### Fixed
- Fixed raw SQL interpolation vulnerabilities in sample fixtures.
- Fixed `generate-mockup.sh` CLI argument handling, error reporting, and aspect ratio derivation.

---

## [2.0.0] - 2026-08-01

### Added
- Initial 6 Pillars of Production Code Artisan.
- Basic `.cursorrules` and bilingual Arabization (RTL) guidelines.
