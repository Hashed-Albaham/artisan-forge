---
name: skill-delegation-dispatcher
description: "Token-optimized meta-router that dynamically delegates user tasks to specialized sub-skills using progressive disclosure. Saves up to 88% prompt tokens."
version: "1.0.0"
category: "Agent Architecture & Token Optimization"
---

# ⚡ Skill Delegation Dispatcher: Token-Optimized AI Architecture

> **The Problem**: Preloading multiple full-stack skills into an AI agent burns 10,000+ tokens per turn, driving up latency, cost, and hallucination rates.
> **The Solution**: A progressive 3-tier delegation pattern where only lightweight trigger signatures are kept in warm memory, and specialized skills are dynamically paged in on demand.

## 📊 Token Matrix
- **Monolithic Dump**: ~9,400 tokens per turn
- **Tier 1 (Dispatcher Index)**: ~120 tokens
- **Tier 2 (Targeted Active Skill)**: ~450 - 620 tokens
- **Total Prompt Savings**: **-88% to -94% tokens**
