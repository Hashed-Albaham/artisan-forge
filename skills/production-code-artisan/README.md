# ⚡ Production Code Artisan (مهارة الحرفي البرمجي الفائق)

<div align="center">

![Production Code Artisan Banner](https://img.shields.io/badge/Production%20Code-Artisan%20v2.5-blue?style=for-the-badge&logo=codeforces&logoColor=white)
![OWASP Hardened](https://img.shields.io/badge/Security-OWASP%20Top%2010-red?style=for-the-badge&logo=securityscorecard&logoColor=white)
![Anti-Slop Certified](https://img.shields.io/badge/Anti--Slop-100%25%20Verified-emerald?style=for-the-badge&logo=checkmarx&logoColor=white)
![RTL & Multilingual](https://img.shields.io/badge/Arabic%20RTL-Native%20Support-purple?style=for-the-badge&logo=globe&logoColor=white)
![License](https://img.shields.io/badge/License-Apache%202.0-yellow?style=for-the-badge)

**The battle-tested Skill that turns AI models into senior production engineers.**

[English](#-english) • [العربية](#-عربي) • [Quick Start](#-quick-start) • [Cursor & Claude Rules](#-cursor--claude-rules)

</div>

---

## 🎯 The Core Problem: Why AI Code Breaks in Production
Raw AI output often looks plausible but breaks immediately when deployed:
- Hallucinated imports or deprecated APIs
- Injected SQL strings (`WHERE id = '${id}'`)
- Fatal N+1 query waterfalls
- Silent error swallowing (`catch (e) {}`)
- Hardcoded secrets and missing env validations
- LTR/RTL text collisions in multilingual dashboards

**Production Code Artisan** fixes this at the model level via uncompromising engineering guardrails.

---

## 🚀 Quick Start

### Option 1: One-Click Cursor / Windsurf (.cursorrules)
```bash
curl -fsSL https://raw.githubusercontent.com/artisan-ai/production-code-artisan/main/.cursorrules -o .cursorrules
```

### Option 2: Claude Projects / System Prompt
Copy the contents of `SKILL.md` into your Claude Project Custom Instructions or Copilot instructions.

### Option 3: GitHub Actions Quality Gate
Add `.github/workflows/artisan-audit.yml` to automatically reject PRs with unparameterized SQL or AI TODO stubs.

---

## 🛡️ The 6 Golden Pillars

| Pillar | Flawed AI Habit | Artisan Production Standard |
| :--- | :--- | :--- |
| **1. Anti-Slop** | `// TODO: implement later` | Complete logic with zero placeholders |
| **2. OWASP Security** | Dynamic query concatenation | 100% Parameterized prepared statements |
| **3. Performance** | DB queries inside `.map()` loops | Batched queries & `Promise.all` |
| **4. Error Observability** | Silent `catch (e) {}` | Typed error inspection & structured logs |
| **5. Type Rigor** | Slapping `: any` everywhere | Strict interfaces & runtime Zod validation |
| **6. RTL & Localization** | Hardcoded `ml-4` margins | CSS logical properties (`ms-4`) & `<bdi>` |

---

## 📜 License
Apache License 2.0. Free for commercial, personal, and enterprise use.
