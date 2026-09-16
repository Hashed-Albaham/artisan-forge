# Example: Vulnerable Express Microservice vs. Hardened Artisan

This example demonstrates how the `production-code-artisan` skill transforms common AI-generated code vulnerabilities into hardened, production-grade microservices:

1. **Vulnerability 1: SQL Injection** — Eliminated dynamic template literal interpolation in SQL queries.
2. **Vulnerability 2: Plaintext Hardcoded Secret** — Extracted into validated environment variable.
3. **Vulnerability 3: Empty Catch Block** — Swapped for contextual error logging and structured failure responses.
4. **Vulnerability 4: N+1 Cascade Loop** — Replaced iterative queries with a single batched array query.
