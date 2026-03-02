# Todo UI Refresh — Modern Minimal
Date: 2026-03-02

## Context & Goals
The existing Todo surface leans into a botanical, slightly decorative visual system (Fraunces + Manrope, gradients, rounded glassmorphism). The new requirement is to restyle the experience so it reads as modern and minimal while preserving all current interactions and behavior. Because we cannot gather more inputs interactively in this automation run, the plan assumes the functionality stays identical: quick entry, filtering, clear status counts, and destructive actions. The redesign must accomplish: (1) a calmer foundation dominated by white/neutral surfaces, (2) tighter visual hierarchy that prioritizes task content, and (3) micro-interactions (hover/focus states) that feel precise but unobtrusive. Implementation-wise the lift is purely in styling the existing markup (React tree stays intact) so we can localize work to `src/App.css` plus any global typography tokens in `src/index.css`.

## Approach Options
**Option A — Neutral card refresh**: Keep the card layout but switch fonts to Inter/Spline Sans, flatten background to a muted gradient, and lean on hairline borders/shadows. Fast to ship because it is a palette & spacing update, but might still read as “designed” rather than purely utilitarian.

**Option B — Full-bleed board**: Remove the inner card altogether, pin controls to a sticky top bar, and let todos float over a single-color page. Strong minimal signal, yet larger layout tweaks risk new responsive bugs.

**Option C — Split-column dashboard**: Introduce a summary column and a tasks column with monochrome chips. Offers strongest “app” impression but requires structural markup changes and potential state refactors.

Given schedule + risk, Option A supplies the needed modern tone with minimal DOM churn, so we will implement that.

## Visual System & Layout
The refresh uses Space Grotesk (headings/eyebrow) paired with Inter (body) to evoke a contemporary SaaS aesthetic. The page background becomes a soft vertical wash (`#f6f7f9` to `#eef1f5`), while the shell is capped at 640px width with a sharp 12px radius, 1px neutral border, and subtle layered shadow (`0 20px 80px rgba(15,23,42,0.08)` plus `0 4px 12px rgba(15,23,42,0.03)`). Section spacing tightens to an 8px grid, and typography shifts to 16/14px base sizes with 20/28px leading as appropriate. Controls adopt pill shapes (8px radius) with monochrome backgrounds and color used sparingly: accent blue `#1b64f2` for primary actions, `#101828` for ink, and `#475467` for supportive text. Empty-state and stats chips inherit light gray surfaces instead of dashed boxes to keep everything calm.

## Interaction & Micro-states
Inputs gain 1px borders with 2px focus outlines using `color-mix` for accessible contrast. Buttons receive hover/focus states via opacity shifts instead of drop shadows; destructive buttons lean on `#d92d20` text over a tinted background with transitions. Filter chips use CSS variables to share base/active tokens, enabling a modern segmented-control feel where the active chip appears filled while others remain ghost. Checkbox styling uses the accent color to reinforce the primary system accent. Animations stay subtle: a single fade/slide for list items with reduced distance to feel crisp. Responsive rules ensure the form collapses to one column underneath 520px while maintaining comfortable hit targets.
