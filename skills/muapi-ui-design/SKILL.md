---
name: muapi-ui-design
version: 0.2.0
description: "Generate high-fidelity UI/UX mockups, wireframes, and design systems for mobile and web apps using Atomic Design principles. Interacts with flux-dev via muapi.ai or CLI scripts."
license: Apache-2.0
repository: "https://github.com/artisan-ai/production-code-artisan/tree/main/skills/muapi-ui-design"
metadata:
  dependencies:
    - "generate-mockup.sh"
    - "design-tokens.json"
    - "curl"
    - "jq"
  environment:
    - "MUAPI_KEY"
  triggers:
    primary:
      - "design ui"
      - "ui mockup"
      - "wireframe"
      - "design system"
    secondary:
      - "atomic design"
      - "design tokens"
      - "ios design"
      - "material 3"
      - "bento grid"
---

# 🎨 UI/UX Design Mockup Skill (`muapi-ui-design`)

**A specialized skill for AI Agents to architect high-fidelity digital interfaces.**
Translates product requirements into structured technical design specifications for mockups, wireframes, and design systems using Atomic Design principles.

---

## 1. Core Competencies

1. **Atomic Design Orchestration**: Structuring interfaces from Atoms (buttons, inputs) to Organisms (headers, bento grids) for design consistency.
2. **Platform-Specific Layouts**: Designing for responsive breakpoints across Mobile (iOS Apple HIG / Android Material 3) and Web (SaaS / E-commerce).
3. **Design System & Token Integration**: Linking all specifications to `design-tokens.json` (typography scales, spacing, color palettes).
4. **Accessibility (WCAG 2.1 AA)**: Enforcing color contrast ratios (≥ 4.5:1), interactive focus states, and 44px/48dp touch targets.
5. **Comprehensive UI States**: Mandating Default, Hover, Active, Loading Skeleton, Error, and Empty state specifications.
6. **Bilingual & RTL Native**: First-class support for Arabic typography, CSS logical properties, and mirrored navigation.

---

## 2. Atomic Design Hierarchy & Concrete Code Examples

### Level 1: Atoms (Indivisible Elements)
Smallest reusable building blocks:
```typescript
// Atom: Primary Brand Button
export const Button: React.FC<{ variant?: "primary" | "ghost"; label: string }> = ({ variant = "primary", label }) => (
  <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[44px] ${
    variant === "primary" ? "bg-emerald-500 hover:bg-emerald-600 text-neutral-950 shadow-xs" : "bg-transparent text-neutral-300 hover:bg-neutral-800"
  }`}>
    {label}
  </button>
);
```

### Level 2: Molecules (Simple Combinations)
Multiple atoms operating as a single unit:
```typescript
// Molecule: SearchBar with Keyboard Shortcut Indicator
export const SearchBar: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <div className="relative flex items-center w-full max-w-md">
    <Search className="w-4 h-4 text-neutral-400 absolute start-3 pointer-events-none" />
    <input
      type="text"
      placeholder={placeholder}
      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl ps-9 pe-12 py-2 text-xs text-neutral-100 placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none min-h-[44px]"
    />
    <kbd className="absolute end-3 text-[10px] font-mono text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">
      ⌘K
    </kbd>
  </div>
);
```

### Level 3: Organisms (Distinct Interface Sections)
Complex self-contained modules composed of molecules and atoms:
```typescript
// Organism: Top Navigation Header with Brand, Search, and User Controls
export const NavigationHeader: React.FC = () => (
  <header className="w-full bg-neutral-950 border-b border-neutral-800 px-6 py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <LogoBadge />
      <span className="font-bold text-white text-sm">Artisan Cloud</span>
    </div>
    <SearchBar placeholder="Search clusters, logs, telemetry..." />
    <div className="flex items-center gap-3">
      <StatusIndicator status="active" />
      <Button variant="primary" label="New Cluster" />
    </div>
  </header>
);
```

### Level 4: Templates (Page Blueprint & Layout Grid)
Platform-specific layout framing all organisms:
- **Web SaaS**: 12-column responsive layout, 24px gutters, fixed 64px structural sidebar.
- **iOS Mobile**: 393×852 viewport, 44px safe area top, 34px home indicator safe area bottom, single-column bento scroll.
- **Android Mobile**: 412×915 viewport, Material 3 bottom navigation bar, 48dp minimum touch boundaries.

---

## 3. UI State Matrix Specification

Every generated interface component must account for the 6 core operational states:
1. **Default State**: Crisp vector contrast, neutral borders (`rgba(226, 232, 240, 0.16)`).
2. **Hover State**: Subtle 8% brightness shift, cursor pointer indicator.
3. **Active/Pressed State**: 2% scale contraction (`active:scale-[0.98]`).
4. **Loading State**: Shimmering skeleton loader with geometric placeholders matching actual text line-heights.
5. **Error State**: Non-blocking contextual alert badge with clear human-readable recovery instructions.
6. **Empty State**: Minimalist vector illustration, helpful copy explaining why data is absent, and a primary creation CTA.

---

## 4. Universal RTL & Arabic Support Specification

When generating designs for Arabic or multilingual audiences:
- **CSS Logical Properties**: Strictly use `start` and `end` (e.g., `ps-4`, `pe-4`, `ms-2`, `me-2`) instead of physical `left` or `right`.
- **Directional Icon Mirroring**: Arrows (`arrow-left`, `arrow-right`), chevrons, and pagination icons must mirror in RTL mode. Never mirror static status indicators or playback controls.
- **Bidirectional Isolation**: Numerical amounts, percentages, and Latin codes must be isolated with `<bdi>` to prevent reversed punctuation.

---

## 5. Tooling Integration: `generate-mockup.sh`

The skill ships with an automated, production-tested CLI tool for generating mockups:

```bash
# Example 1: Web SaaS Interface (16:9)
./skills/muapi-ui-design/generate-mockup.sh \
  --prompt "Real-time AI Model Observability and Token Cost Dashboard" \
  --platform web \
  --theme emerald-slate \
  --output observability_dashboard.png

# Example 2: Mobile Crypto Wallet (9:16)
./skills/muapi-ui-design/generate-mockup.sh \
  --prompt "DeFi Staking Wallet with Portfolio Graph and Quick Transfer" \
  --platform ios \
  --theme dark \
  --output ios_wallet.png
```
