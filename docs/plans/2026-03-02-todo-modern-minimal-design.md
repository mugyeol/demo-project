# 2026-03-02 — Todo Modern Minimal Design

## Requirements Summary
- Update the todo interface visuals to feel clean, modern, and minimalist.
- Preserve current functionality (adding, filtering, clearing todos) while improving perceived clarity and hierarchy.

## Current Observations
- Uses decorative serif display font paired with Manrope and glassmorphism background.
- Multiple shadows, gradients, and accent colors create a cozy aesthetic, not minimalist.
- Components already structured semantically, so changes can focus on CSS tokens.

## Candidate Directions
1. **Soft Monochrome Card** — Neutral gray background, single elevated card, accent reserved for primary CTA. Pros: conservative, quick. Cons: may still feel heavy.
2. **Bordered Layout** — Remove shadows, rely on crisp borders, two-column header (stats + actions). Pros: strongly minimalist. Cons: requires more spacing tweaks.
3. **Edge-to-Edge Rows** — Ditch card container, use full-width list similar to native apps. Pros: extremely minimal. Cons: loses contained feel and existing responsive padding.

## Selected Direction
Go with **Bordered Layout**: muted warm-gray background, central container with 1px strokes, lots of whitespace, Inter / "Plus Jakarta Sans" stack. Keep accent emerald for CTA + filter state. All other buttons become outline/ghost.

## Implementation Notes
- Replace current font import with `Inter` (weights 500/600) for text and `Space Grotesk` accent for title.
- Simplify background to linear gradient (#f7f7f8 → #eceef1) with noise effect via repeating-conic gradient.
- Container: white background, 1px border (#e2e4ea), 20px radius, drop existing shadow intensity.
- Inputs/buttons: flat backgrounds, 12px radius, 1px border, use CSS custom properties for accent (#0d9488) and neutrals (#111827, #4b5563, #e5e7eb).
- Todo rows: border, subtle hover highlight, checkboxes with custom accent.
- Empty state + footer adopt uppercase microcopy with letter spacing.
- Keep structure identical (no React changes) to avoid logic regressions.
