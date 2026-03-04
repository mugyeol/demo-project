# Todo cybertic tone & manner — 2026-03-04

## Context & Goals
The current todo UI is themed after warm retro stationery (beige parchment, rounded cards, offset drop shadows). The new requirement asks for a “cybertic” tone: dark glass panels, neon vaporwave accents, and circuitry-inspired affordances that feel like a command deck. Functionality (local-storage persistence, filters, stats, destructive actions) remains unchanged, so the work is a CSS+copy styling pass that re-skins the existing layout without touching data flow. Success criteria: (1) instant recognition of a futuristic/fiber-optic system through palette, typography, and subtle glow effects, (2) maintain readable contrast (WCAG AA for main text on dark backgrounds), (3) keep accessibility affordances—focus rings, large hit targets, reduced motion fallbacks—and (4) ensure the UI still works at 360px widths. Constraints: no new JS dependencies, no DOM restructuring beyond pseudo elements, and keep performance acceptable (avoid expensive blur filters on large surfaces). The theme should feel like a HUD overlay: layered grids, animated scanning highlights, and luminous outlines. We'll also translate the tone into micro details such as monospaced stats, “holographic” toolbar chips, and digital checkbox indicators.

## Direction Options
**Option A – Neon Grid Console.** Palette: midnight navy background (#020511 → #050b16), translucent panels (#0c1627, alpha). Accents: cyan (#39d0ff) + magenta (#ff38c3) gradients with electric-green highlight (#a3ff12). Typography: heading in Orbitron 600, body in Space Grotesk 500, monospace details in Share Tech Mono. Decor includes animated grid overlay and sweeping light `::after` across cards. Pros: immediate sci-fi association, easy to implement with CSS gradients. Cons: dark theme requires careful contrast management and more explicit focus outlines.
**Option B – Chrome Circuit Minimal.** Light background (#e8eef5) with chrome borders, blue accents, condensed grotesk typography. Pros: easier contrast, more minimal. Cons: less “cyberpunk” energy; might still feel like a generic SaaS UI.
**Option C – Terminal Matrix.** Pure black (#000) background, lime text, ASCII art. Pros: high nostalgia. Cons: monotone, fails readability for long sessions, sacrifices warmth. Option A best meets the “cybertic” goal while allowing expressive gradients and glows without overhauling markup.

## Final Experience Design
Typography import: `Orbitron` (600) for titles/buttons, `Space Grotesk` (400/500/600) for general text, and `Share Tech Mono` (400) for stats and microcopy. Root tokens:
- `--page-bg: #02040a`, `--page-bg-2: #050b16` for the canvas gradient.
- `--surface: rgba(8, 16, 32, 0.8)` translucent panels with backdrop blur (fallback to solid for browsers without blur).
- `--surface-strong: #0f172a` and `--surface-glow: rgba(57, 208, 255, 0.18)` for layered depths.
- `--ink: #f3f9ff`, `--muted: #8aa2cb`, `--border: rgba(74, 111, 177, 0.45)`, `--border-strong: #37e5ff`.
- `--accent: #6f3dff`, `--accent-strong: #ff3df0`, `--accent-subtle: rgba(111, 61, 255, 0.18)`, `--teal: #59f7ff`, `--danger: #ff5470`.

Layout: keep centered shell (max 720px) but switch from rounded parchment to beveled glass: 18px radius, 1px neon border, inner glow. `.todo-page` receives layered background—primary gradient, `::before` radial pulses, `::after` animated grid using `linear-gradient` stripes combined with `animation: driftGrid 40s linear infinite`. `main` uses `overflow: hidden` to keep effects contained.

Header: eyebrow becomes HUD label with `letter-spacing: 0.4em`, neon cyan text, digital caret `›`. Title uses Orbitron uppercase with gradient text fill and `text-shadow` for glow. Subtitle switches to `Share Tech Mono` with accent color, optionally featuring `[SYNCED/LOCAL]` style copy.

Form: `.todo-form` uses minimal gap, with `.todo-input` styled as glass input (transparent background, 1px glowing border, inset cyan focus line). `.add-btn` gets gradient `background: linear-gradient(120deg, var(--accent) 0%, var(--accent-strong) 100%)`, `box-shadow` for holographic glow, and `::after` highlight on hover. Placeholder text uses muted cyan.

Toolbar: convert to segmented chip row on a transparent bar. `.filter-btn` uses uppercase Orbitron, border + box shadow to mimic touch targets; `.is-active` state fills with neon gradient and adds inner glow. `.ghost-btn` now a danger-free “Clear done” text button with dotted border, top-right align.

Todo list: cards adopt `background: var(--surface)`, `border-image` gradient to create glowing edges, `box-shadow: 0 12px 30px rgba(4, 8, 16, 0.6)`. Each `.todo-item` adds `::before` diagonal sheen animation triggered on hover. Checkbox becomes 18px square with gradient fill, drop shadow, and SVG-like check via pseudo element. Done items dim and add `text-shadow` removal plus `border-color: rgba(255,255,255,0.1)` to feel disabled. Empty state uses dashed neon border and ASCII-style copy.

Footer stats use pills with translucent backgrounds and a subtle scanline GIF simulation via CSS animation (pure CSS stripes). Provide `prefers-reduced-motion` overrides to disable glow animations. Testing: run `npm run build` for regression + manual keyboard traversal to ensure focus-visible outlines remain high-contrast. EOF
