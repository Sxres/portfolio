---
name: Dragos Sorescu Portfolio
description: A cultivated, cinematic portfolio for a full-stack ML/AI builder who makes cool stuff.
colors:
  night-soil: "#0e0e0e"
  night-soil-lift: "#131313"
  deep-bark: "#1a1a1a"
  twig-line: "#222222"
  shadow-moss: "#555555"
  weathered-bark: "#888888"
  pale-bark: "#dfd8cc"
  bonsai-ash: "#d4d0c8"
  winter-leaf: "#faf7f6"
  winter-leaf-lift: "#f7f3f3"
  leaf-ink: "#535353"
  dormant-gray: "#999999"
  branch-line-light: "#dddddd"
  pure-white: "#ffffff"
  tag-black: "#000000f3"
  canopy-overlay: "#000000b8"
  overlay-chalk: "#ffffffe0"
typography:
  display:
    fontFamily: "OverusedGrotesk, Arial, sans-serif"
    fontSize: "clamp(4rem, 8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "OverusedGrotesk, Arial, sans-serif"
    fontSize: "clamp(2.8rem, 5.4vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "OverusedGrotesk, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "OverusedGrotesk, Arial, sans-serif"
    fontSize: "clamp(3.5rem, 6vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  project-title:
    fontFamily: "OverusedGrotesk, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 4vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  body-large:
    fontFamily: "OverusedGrotesk, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.4vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  body:
    fontFamily: "OverusedGrotesk, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "OverusedGrotesk, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  micro:
    fontFamily: "OverusedGrotesk, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  bonsai:
    fontFamily: "Roboto Mono, monospace"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
spacing:
  xs: "0.5rem"
  sm: "0.8rem"
  md: "1rem"
  lg: "1.2rem"
  xl: "1.5rem"
  2xl: "2rem"
  3xl: "3rem"
  4xl: "4rem"
  5xl: "6rem"
  6xl: "8rem"
components:
  theme-toggle:
    backgroundColor: "{colors.night-soil}"
    textColor: "{colors.weathered-bark}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.4rem 0.7rem"
  navigation-link:
    backgroundColor: "{colors.night-soil}"
    textColor: "{colors.pale-bark}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0"
  project-tag:
    backgroundColor: "{colors.tag-black}"
    textColor: "{colors.pure-white}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.3rem 0.5rem"
  project-card:
    backgroundColor: "{colors.night-soil}"
    textColor: "{colors.pale-bark}"
    rounded: "{rounded.md}"
    padding: "0"
  featured-work:
    backgroundColor: "{colors.night-soil}"
    textColor: "{colors.pale-bark}"
    rounded: "{rounded.md}"
    padding: "clamp(2rem, 4vw, 4rem)"
---

# Design System: Dragos Sorescu Portfolio

## 1. Overview

**Creative North Star: "The Cultivated System"**

The portfolio should feel like a carefully trained bonsai: technically structured, visibly alive, and shaped by a point of view. Its cinematic quality comes from the tension between a quiet monochrome frame and a few decisive moments—the procedural tree growing into view, large unhurried type, and project imagery that reveals more when approached.

The system is minimal without becoming anonymous. Borders, crops, overlays, and responsive pacing create subtle layers instead of shadows or ornamental effects. It is creative, clean, and out-of-the-box, and it explicitly rejects the corporate résumé, templated SaaS landing page, hacker-terminal costume, and generic AI-generated design.

**Key Characteristics:**

- A dark-first, warm-neutral canvas with a complete light counterpart.
- Large, plainspoken typography with generous sectional pacing.
- Cinematic project imagery contained by precise, modest geometry.
- Subtle depth from borders, image crops, overlays, and interaction states.
- A procedurally generated bonsai as the singular signature element.

## 2. Colors

The palette is a bonsai in winter: near-black soil and branches, pale bark and ash, and quiet off-white light. It is intentionally neutral so that project imagery and the living tree carry the chromatic energy.

### Primary

- **Night Soil** (#0e0e0e): Default dark canvas and card surface. It carries most of the initial viewport.
- **Winter Leaf** (#faf7f6): Default light canvas and card surface. Use as the true light-mode counterpart, not as a decorative cream theme.

### Neutral

- **Pale Bark** (#dfd8cc): Primary dark-mode text; its warm cast keeps the near-black canvas human.
- **Bonsai Ash** (#d4d0c8): Procedural tree, active navigation, and high-contrast dark-mode accents.
- **Weathered Bark** (#888888): Dark-mode supporting copy; it passes AA against Night Soil at 5.45:1.
- **Shadow Moss** (#555555): Existing dark-mode dim role. At 2.59:1 against Night Soil, reserve it for nonessential decoration until the implementation is raised to AA.
- **Deep Bark** (#1a1a1a): Light-mode ink and the darkest card boundary.
- **Leaf Ink** (#535353): Light-mode supporting copy; it passes AA against Winter Leaf at 7.22:1.
- **Dormant Gray** (#999999): Existing light-mode dim role. At 2.67:1 against Winter Leaf, reserve it for nonessential decoration until the implementation is raised to AA.
- **Twig Line** (#222222) and **Branch Line Light** (#dddddd): Quiet structural dividers in dark and light modes.
- **Night Soil Lift** (#131313) and **Winter Leaf Lift** (#f7f3f3): Minimal hover-state surface shifts.
- **Canopy Overlay** (#000000b8), **Tag Black** (#000000f3), **Overlay Chalk** (#ffffffe0), and **Pure White** (#ffffff): Media-overlay utilities only.

### Named Rules

**The Living Contrast Rule.** Keep the frame neutral and let real project imagery and the bonsai provide visual life. Never add a generic neon accent to make the portfolio look more technical.

**The Readable Bark Rule.** Essential small text must meet WCAG 2.2 AA. Weathered Bark and Leaf Ink are the muted text floors; Shadow Moss and Dormant Gray are decorative-only until their contrast is corrected.

## 3. Typography

**Display Font:** OverusedGrotesk (with Arial and sans-serif fallback)  
**Body Font:** OverusedGrotesk (with Arial and sans-serif fallback)  
**Signature Font:** Roboto Mono (bonsai rendering only)

**Character:** OverusedGrotesk gives the site a clean, slightly idiosyncratic voice without turning technical content into terminal cosplay. Roboto Mono is isolated to the procedural artifact where fixed-width alignment is functional. Geist files are present in the repository but are not part of the active system.

### Hierarchy

- **Display** (400, clamp(4rem, 8vw, 6rem), 0.9): The two-line introduction. Keep letter-spacing at -0.035em and balance line breaks deliberately.
- **Headline** (400, clamp(2.8rem, 5.4vw, 5.5rem), 0.95): Major section headings.
- **Statement** (400, clamp(2.6rem, 6.4vw, 6rem), 0.98): Full-width positioning and personal statements.
- **Title** (400, clamp(3.5rem, 6vw, 6rem), 0.9): Featured-project title only.
- **Project Title** (400, clamp(2.4rem, 4vw, 4.5rem), 0.95): Selected-project names with a 12ch desktop measure.
- **Body Large** (400, clamp(1rem, 1.4vw, 1.2rem), 1.45): Hero introduction and important section support.
- **Body** (400, 1rem, 1.5–1.6): General copy, kept within 65–75ch.
- **Label** (400, 0.875rem, normal tracking): Navigation and compact metadata. Use normal title case; do not turn every section into a tracked uppercase label.
- **Micro** (400, 0.75rem, normal tracking): Desktop-only supporting metadata. It rises to the Label size on mobile.
- **Bonsai** (400, 1.2rem desktop / 0.55rem mobile, 1.3 / 1.2): Fixed-width procedural output only.

### Named Rules

**The One Technical Voice Rule.** Monospace earns its place only where alignment is functional—the bonsai. Do not expand it into hacker-terminal UI copy, fake command prompts, or decorative code labels.

## 4. Elevation

The Cultivated System uses no box shadows. Depth is subtly layered through 1px borders, dark image overlays, controlled thumbnail crops, sticky navigation, and small background shifts. Media may zoom within an overflow-clipped frame, but containers remain visually grounded.

### Named Rules

**The Rooted Surface Rule.** Surfaces stay flat and connected to the page. Use borders or imagery to establish hierarchy; do not combine decorative borders with broad soft shadows.

**The Cinematic Layer Rule.** Reserve overlays and image scaling for project media. Text and navigation should remain crisp, stable, and immediately readable.

## 5. Components

Components are cinematic and minimal: quiet at rest, precise in geometry, and expressive only when interaction reveals more of the work.

### Buttons

- **Shape:** Square theme control with no authored radius.
- **Primary:** The email CTA inverts the active theme with a 1px matching border and 0.7rem 1rem padding. It returns to a transparent surface on hover.
- **Hover / Focus / Active:** Use the 180ms interaction token and ease-out curve. Focus uses a 2px theme-text outline with 4px offset; the primary action moves down 1px while pressed.
- **Theme Toggle:** Transparent background, 1px border, Weathered Bark text, and 0.4rem 0.7rem padding. Mobile controls are at least 44px tall.

### Chips

- **Style:** Project tags use Tag Black, Pure White, 4px corners, 0.3rem 0.5rem padding, and compact 0.75rem text.
- **State:** Tags are descriptive rather than selectable. They rise to the 0.875rem Label size on mobile.

### Cards / Containers

- **Corner Style:** Project media uses 8px corners on desktop and 4px on compact mobile. Featured media remains square to the full-width composition.
- **Background:** Copy stays on the theme canvas so project rows feel cut into the composition rather than floated above it.
- **Shadow Strategy:** None; reference the Rooted Surface Rule.
- **Border:** Project rows use single top or bottom structural dividers; do not box every project.
- **Internal Padding:** Featured copy uses clamp(2rem, 4vw, 4rem); selected-project copy uses 1rem block padding.
- **Media Behavior:** Image-led, overflow clipped, with a restrained 260ms zoom on fine-pointer hover. Off-screen media is lazy-loaded, and animated GIFs provide still WebP sources for reduced motion.

### Navigation

- **Desktop:** Sticky identity at left and a compact 0.875rem link row at right, separated from the page by one bottom divider.
- **Mobile:** Preserve the identity, primary email action, and theme toggle; defer GitHub, LinkedIn, and résumé to the footer. Every visible control is at least 44px tall.
- **States:** Text moves from the muted role to the primary text color on hover. Keyboard focus uses the global 2px outline.

### Procedural Bonsai

The bonsai is the signature component and the only terminal-adjacent visual. It grows character-by-character inside the hero’s right-hand stage, becomes a full-width second act on mobile, and resolves immediately when reduced motion is requested. Loading, timeout, error, and retry states use the same flat component language. Its role is to prove creative coding through a living result, not to decorate the page with generic code aesthetics.

## 6. Do's and Don'ts

### Do:

- **Do** make the site itself proof that Dragos can ship a complete, original system.
- **Do** use Night Soil (#0e0e0e), Pale Bark (#dfd8cc), Winter Leaf (#faf7f6), and Deep Bark (#1a1a1a) as the core dual-theme anchors.
- **Do** keep cards at 8px corners and use one subtle boundary or overlay to create depth.
- **Do** let project imagery and the procedural bonsai carry the memorable visual moments.
- **Do** preserve a complete reduced-motion path for tree growth, image zoom, theme transitions, and future animation.
- **Do** make email the clearest collaboration action and LinkedIn the secondary fallback.

### Don't:

- **Don't** turn the portfolio into a corporate résumé page.
- **Don't** use a templated SaaS landing-page structure, hero metrics, generic feature-card grids, or sales-funnel chrome.
- **Don't** expand the bonsai's fixed-width type into a hacker-terminal aesthetic.
- **Don't** ship generic AI-generated design or AI slop: no gradient text, decorative grids, glass cards, repeated tiny uppercase eyebrows, or identical icon cards.
- **Don't** pair 1px decorative borders with broad soft shadows or exceed 16px corner radii on cards.
- **Don't** use Shadow Moss (#555555) or Dormant Gray (#999999) for essential or interactive text at their current contrast.
- **Don't** animate every section by reflex; use motion only where it reveals process, authorship, or project detail.
