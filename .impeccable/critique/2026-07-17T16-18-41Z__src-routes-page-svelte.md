---
target: homepage (src/routes/+page.svelte)
total_score: 20
p0_count: 0
p1_count: 3
timestamp: 2026-07-17T16-18-41Z
slug: src-routes-page-svelte
---
Method: dual-agent (A: /root/design_review · B: /root/evidence_review)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2/4 | The bonsai announces completion, but its visual controls do not name the active pattern and the theme toggle only exposes its next action. |
| 2 | Match System / Real World | 3/4 | Mostly plainspoken, though “WSB-style”, “no pre-ingestion”, and the unlabeled bonsai controls assume technical context. |
| 3 | User Control and Freedom | 2/4 | Theme and tree are controllable, but project detail relies on hover and there is no clear collaboration path or internal orientation. |
| 4 | Consistency and Standards | 2/4 | The visual system is cohesive; the semantic hierarchy uses four h1s and social actions are duplicated in header and footer. |
| 5 | Error Prevention | 1/4 | Direct GIF use has no reduced-motion still alternative; CDN toolkit icons and outbound links lack graceful fallbacks. |
| 6 | Recognition Rather Than Recall | 2/4 | Tool labels help, but tree controls are anonymous dots and meaningful project copy is hidden on hover. |
| 7 | Flexibility and Efficiency | 2/4 | The responsive grid is useful, but there is no skip link, section navigation, visible keyboard treatment, or quick way to compare projects. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Restrained, authored visual language is diluted by a 16-item technology inventory and four equal-weight project cards. |
| 9 | Error Recovery | 1/4 | Bonsai status has a live announcement, but visitors get no visible explanation of modes or recovery path when media/resources fail. |
| 10 | Help and Documentation | 2/4 | “Try generating…” invites play but does not explain the controls or why they matter. |
| **Total** | | **20/40** | **Acceptable — significant improvement needed to make the work and conversion persuasive.** |

## Anti-Patterns Verdict

**LLM assessment:** This does not read as generic AI slop. The procedural bonsai is a genuinely authored, memorable signature and the dark/ash frame avoids SaaS, terminal, and gradient clichés. However, its information architecture follows a familiar developer-portfolio template: intro → current card → technology grid → equal project cards → social footer. The tree currently feels adjacent to that template rather than a narrative device that structures the proof.

**Deterministic scan:** The CLI detector reported 14 findings in `src/routes/+page.svelte`: six warnings at lines 137, 143, and 149 for unused Geist font-face declarations, plus eight literal font-size advisories at lines 334, 455, 555, 602, 633, 770, 799, and 810. The three `overused-font` warnings are false positives for the rendered UI: Geist is declared but not used; DESIGN.md explicitly says it is not part of the active system. The three design-system font warnings correctly expose stale declarations but are cleanup, not a visible brand failure. The eight size advisories are mechanically valid deviations from the documented type scale; visual review is needed before changing them.

**Visual overlays:** No reliable user-visible overlay is available. This environment exposes no mutable browser automation, so the fresh-tab injection preflight, overlay, visibility, and console evidence could not be attempted.

## Overall Impression

The site has a real point of view and a promising visual system. Its biggest opportunity is to make the work, not the toolkit, the proof: give a collaborator one unmistakable reason to contact Dragos now, then make the rest of the page substantiate that claim.

## What’s Working

- **An authored signature instead of a generic technical motif.** The procedural bonsai is interactive and purpose-specific; it signals creative coding without collapsing into terminal cosplay.
- **Restrained, coherent art direction.** The dark/ash palette, modest corner radii, flat bordered surfaces, and image-led work respect the cultivated-system concept.
- **Credibility without invented prestige.** Concrete projects, active research, direct repository links, and no fake client logos or metrics make the portfolio feel honest.

## Priority Issues

### [P1] Collaboration has no visual or narrative moment

**Why it matters:** Email appears as one peer among GitHub, LinkedIn, and the résumé. A potential collaborator learns who Dragos is but is not given a compelling invitation to begin a conversation.

**Fix:** Put one human collaboration CTA beside the hero proposition—“Have an ambitious system in mind? Let’s build it.”—and repeat a tailored invitation after the selected work. Make the footer a confident closing invitation rather than maintenance metadata.

**Suggested command:** `$impeccable clarify`

### [P1] The work has no hierarchy of proof

**Why it matters:** Four equal project cards and a separate technology grid make visitors infer depth themselves. The current-project note about future AWS deployment softens the full-stack positioning instead of substantiating it.

**Fix:** Feature one complete end-to-end system with a short problem → system → outcome → demo/repository sequence. Group remaining work by capability—such as vision, agents, and research—and frame in-progress work as an intentional next experiment.

**Suggested command:** `$impeccable shape`

### [P1] Essential project detail is hover-only and GIFs bypass reduced-motion intent

**Why it matters:** The project descriptions appear in `.project-card:hover`, so touch and keyboard visitors lose the evidence needed to evaluate the work. Animated GIFs also continue without a reduced-motion still path.

**Fix:** Keep a concise outcome visible at rest; reveal fuller context on focus as well as hover, or provide internal project detail pages. Use poster/still assets when reduced motion is requested and make thumbnail zoom/overlays optional.

**Suggested command:** `$impeccable harden`

### [P2] The bonsai interaction is distinctive but opaque and over-persistent

**Why it matters:** Four small unlabeled dot controls do not tell a visual user what will change. The fixed `57vw` desktop bonsai stays in the composition while the visitor reads later sections, competing with the work it is meant to introduce.

**Fix:** Name the active growth rule, add a brief visible explanation, and let the bonsai resolve or recede after the hero while retaining an intentional interaction moment.

**Suggested command:** `$impeccable polish`

### [P2] “My Current Toolkit” is résumé inventory rather than evidence

**Why it matters:** Sixteen logos ask the visitor to scan tools instead of seeing what those tools made. It is the most conventional portion of an otherwise specific portfolio.

**Fix:** Replace the grid with three work-grounded capability statements—e.g. perception in motion, agents that fetch and reason, systems that ship—linked to the relevant proof. Keep only technologies that clarify an individual project.

**Suggested command:** `$impeccable distill`

## Persona Red Flags

**Jordan — first-time collaborator:** The hero is personable, but it does not make a clear invitation to bring an idea. “Looking to implement AWS…” reads as an unfinished proof point, while project cards do not expose outcomes without hover. Jordan could leave thinking “interesting student portfolio,” rather than “this is someone I should contact.”

**Sam — technical collaborator evaluating range:** Sam must hover each project for technical detail and then leave the portfolio for GitHub to judge substance. The toolkit is faster to scan than the systems, so the portfolio over-signals familiar tools and under-signals system decisions, constraints, and outcomes.

**Casey — keyboard, touch, or motion-sensitive visitor:** Project descriptions lack a focus-visible equivalent to the hover overlay; GIFs have no reduced-motion alternative; bonsai controls have accessible labels but no visual labels. Multiple h1s and hidden scrollbars further weaken linear orientation.

## Minor Observations

- The footer’s “Last Updated on May 5, 2026” becomes dated quickly and is a weak final impression.
- Global transitions apply to every element with no page-level reduced-motion override.
- `target="_blank"` appears on the mailto link even though it is not a normal external document destination.
- Geist font faces are unused and should either be removed or intentionally adopted; removing them also resolves six detector warnings.
- Hiding the browser scrollbar removes a simple cue that the one-page portfolio contains more work below.

## Questions to Consider

- What one completed system should make a collaborator think, “I want this person on my project,” before they ever encounter the toolkit?
- Should the visitor remember “the bonsai portfolio,” or “the person who turns difficult ideas into working systems—with a bonsai that proves the point”?
