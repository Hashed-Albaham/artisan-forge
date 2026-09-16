# Contributing to Production Code Artisan

We welcome contributions from developers, architects, and AI researchers worldwide to keep AI code production-ready.

## Development Workflow

1. Fork and clone the repository.
2. Install dependencies: `npm ci`
3. Run AST Anti-Slop Audit: `npm run audit:slop`
4. Run Typecheck: `npm run lint`
5. Test skill generation scripts: `./skills/muapi-ui-design/generate-mockup.sh --dry-run -p "Test UI"`
6. Ensure all commits adhere to Conventional Commits format (`feat:`, `fix:`, `docs:`, `chore:`).
7. Submit a Pull Request. All CI stages (Gitleaks, Semgrep, AST slop audit, and typecheck) must pass green.
