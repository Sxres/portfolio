<script>
  import { onMount, onDestroy } from 'svelte';
  import BonsaiTree from '$lib/BonsaiTree.svelte';

  let name = "Dragos Sorescu";
  let role = "developer / student";
  let bio = "Aspiring ML engineer based in Toronto, focused on machine learning and computer vision but very interested in robotics and embedded systems.";

  let dark = true;
  
  function toggleTheme() {
    dark = !dark;
    document.body.className = dark ? 'dark' : 'light';
  }

  let links = [
    { label: "github", href: "https://github.com/Sxres" },
    { label: "email", href: "mailto:sorescudragos847@gmail.com" },
    { label: "linkedin", href: "https://www.linkedin.com/in/dragos-sorescu/" },
    { label: "resume", href: "/Dragos Sorescu Resume.pdf" },
  ];

  let projects = [
    {
      title: "Playing Cards Detection",
      year: "2026",
      desc: "YOLOv26 based playing card detection for ranks and suits, OpenCV used for poker hand rankings with the treys.",
      tag: "opencv / ml",
      href: "https://github.com/Sxres/PlayingCardsDetection",
      ascii: `
+----------+
| [A♠] [K♥]|
| detect:  |
| > 98.2%  |
| [Q♦] [J♣]|
| straight |
+----------+`,
    },
    {
      title: "Skin Cancer Classification",
      year: "2026",
      desc: "DinoV2-based image classifier for skin cancer research - benign vs malignant detection from Stanford Multi-Modal AIMI dataset.",
      tag: "research / ml",
      href: "https://github.com/Sxres/SkinCancerImageClassificationResearch",
      ascii: `
+----------+
| scan >>> |
| [  img  ]|
| Dino v   |
| benign?  |
| malign?  |
+----------+`,
    },
    {
      title: "News Market Rag",
      year: "2025",
      desc: "RAG pipeline that ingests financial news and generates a market newsletter using retrieval-augmented generation.",
      tag: "ml / nlp",
      href: "https://github.com/Sxres/FunnyMarketNewsLetter",
      ascii: `
+----------+
| news >>  |
| embed()  |
| retrieve |
| > gen    |
| RAG      |
+----------+`,
    },
    {

      title: "Temperature Predictor",
      year: "2025",
      desc: "XGBoost regression model deplyed with Streamlit frontend that predicts future temperatures based on historical trend data.",
      tag: "app / ml",
      href: "https://github.com/Sxres/temperature_predictor_app",
      ascii: `
+----------+
| 22.4°C   |
| ↑ trend  |
| ~~~~~~~~ |
| predict: |
| 24.1°C   |
+----------+`,
    },
  ];

  const faces = ["= ]", "= )", "= D"];
  let faceIndex = 0;
  let face = faces[0];
  let animating = false;
  let interval = 0;

  function cycleFace() {
    if (animating) return;
    animating = true;
    faceIndex = (faceIndex + 1) % faces.length;
    face = faces[faceIndex];
    setTimeout(() => (animating = false), 300);
  }

  onMount(() => {
    document.body.className = 'dark';
  });

  onDestroy(() => {
    clearInterval(interval);
  });

</script>

<style>
  @font-face {
    font-family: 'OverusedGrotesk';
    src: url('/fonts/OverusedGrotesk-Book.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  /* ── reset ── */
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ── smooth theme transition on everything ── */
  :global(*, *::before, *::after) {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }

  /* ── bonsai gradient can't transition so disable it ── */
  :global(.bonsai) {
    transition: none !important;
  }

  :global(html) {
    scroll-behavior: smooth;
    scrollbar-width: none;
  }

  :global(html::-webkit-scrollbar) {
    display: none;
  }

  /* ── themes ── */
  :global(body.dark) {
    --bg: #0e0e0e;
    --text: #d4d0c8;
    --muted: #888;
    --dim: #555;
    --border: #222;
    --card-bg: #0e0e0e;
    --card-hover: #131313;
    --card-border: #1a1a1a;
    --ascii-color: #d4d0c8;
    --ascii-hover: #888;
    --nav-hover: #d4d0c8;
    --bonsai-color: #d4d0c8;
  }

  :global(body.light) {
    --bg: #FAF7F6;
    --text: #1a1a1a;
    --muted: #666;
    --dim: #999;
    --border: #ddd;
    --card-bg: #FAF7F6;
    --card-hover: #f7f3f3;
    --card-border: #ddd;
    --ascii-color: #1a1a1a;
    --ascii-hover: #5e5e5e;
    --nav-hover: #1a1a1a;
    --bonsai-color: #1a1a1a;
  }

  :global(body) {
    background: var(--bg);
    color: var(--text);
    font-family: 'OverusedGrotesk', monospace;
    font-size: 16px;
    line-height: 1.6;
    cursor: default;
  }

  /* ── bonsai crap ── */
  .bonsai-wrap {
    position: fixed;
    right: 0;
    top: 0;
    height: 82vh;
    width: 55vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    pointer-events: none;
    z-index: 0;
    overflow: visible;
  }

  .bonsai-credit {
    font-size: 0.65rem;
    color: var(--dim);
    text-decoration: none;
    letter-spacing: 0.04rem;
    margin-top: 0.4rem;
    pointer-events: auto;
  }

  .bonsai-credit:hover {
  color: var(--text);
  }

  /* ── layout ── */
  .page {
    max-width: 680px;
    margin: 0;
    margin-left: 6vw;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }

  /* ── header ── */
  header {
    position: sticky;
    top: 0;
    background: var(--bg);
    z-index: 10;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    padding: 2rem 0;
    border-bottom: 1px solid var(--border);
    width: calc(100vw - 12vw);
  }

  nav {
    display: flex;
    gap: 2rem;
    flex: 1;
  }

  nav a {
    color: var(--dim);
    text-decoration: none;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
  }

  nav a:hover { color: var(--nav-hover); }

  .theme-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--dim);
    cursor: pointer;
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
    letter-spacing: 0.08em;
    font-family: 'OverusedGrotesk', monospace;
  }

  .theme-btn:hover {
    color: var(--text);
    border-color: var(--text);
  }

  /* ── hero ── */
  .hero {
    min-height: 88vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2.2rem;
    padding: 4rem 0;
  }

  .emoticon {
    font-size: 2.8rem;
    letter-spacing: -0.05em;
    color: var(--text);
    cursor: pointer;
    user-select: none;
    display: inline-block;
    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  }

  .emoticon.pop { transform: scale(1.1); }

  .hero-name {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1.0;
    color: var(--text);
    letter-spacing: -0.02em;
    font-weight: normal;
  }

  .hero-role {
    font-size: 0.85rem;
    color: var(--dim);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.8rem;
  }

  .hero-bio {
    font-size: 1rem;
    color: var(--muted);
    max-width: 45ch;
    line-height: 1.7;
  }

  /* ── section ── */
  .section {
    padding: 5rem 0;
    border-top: 1px solid var(--card-border);
  }

  /* ── projects ── */
  .projects {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    background: var(--card-border);
    border: 1px solid var(--card-border);
  }

  a.project-card {
    text-decoration: none;
    color: inherit;
    background: var(--card-bg);
    display: flex;
    flex-direction: column;
  }

  a.project-card:hover { background: var(--card-hover); }

  .ascii-thumb {
    font-family: monospace;
    font-size: 0.78rem;
    line-height: 1.45;
    color: var(--ascii-color);
    padding: 1.4rem 1.4rem 1rem;
    white-space: pre;
    border-bottom: 1px solid var(--card-border);
    overflow: hidden;
  }

  a.project-card:hover .ascii-thumb { color: var(--ascii-hover); }

  .project-meta {
    padding: 1.2rem 1.4rem 1.4rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .project-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .project-title {
    font-size: 0.95rem;
    color: var(--text);
    letter-spacing: 0.02em;
  }

  .project-year {
    font-size: 0.75rem;
    color: var(--dim);
  }

  .project-desc {
    font-size: 0.82rem;
    color: var(--muted);
    line-height: 1.55;
  }

  .project-tag {
    margin-top: 0.6rem;
    font-size: 0.68rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dim);
  }

</style>

<!-- bonsai fixed to right -->
<div class="bonsai-wrap">
  <BonsaiTree speed={1}/>
  <a href="https://github.com/Ben-Edwards44/PyBonsai" target="_blank" rel="noopener" class="bonsai-credit">
                  procedurally generated by PyBonsai
    </a>
</div>

<div class="page">
  <header>
    <nav>
      {#each links as link}
        <a href={link.href} target="_blank" rel="noopener">{link.label}</a>
      {/each}
    </nav>
    <button class="theme-btn" on:click={toggleTheme}>
      {dark ? 'light' : 'dark'}
    </button>
  </header>

  <section class="hero">
    <div>
      <span
        class="emoticon"
        class:pop={animating}
        on:click={cycleFace}
        role="button"
        tabindex="0"
        on:keydown={(e) => e.key === 'Enter' && cycleFace()}
      >{face}</span>
    </div>

    <div>
      <h1 class="hero-name">{name}</h1>
    </div>

    <div>
      <div class="hero-role">{role}</div>
      <p class="hero-bio">{bio}</p>
    </div>
  </section>

  <section class="section" id="work">
    <div class="projects">
      {#each projects as project}
        <a href={project.href} target="_blank" rel="noopener" class="project-card">
          <pre class="ascii-thumb">{project.ascii}</pre>
          <div class="project-meta">
            <div class="project-top">
              <span class="project-title">{project.title}</span>
              <span class="project-year">{project.year}</span>
            </div>
            <div class="project-desc">{project.desc}</div>
            <div class="project-tag">{project.tag}</div>
          </div>
        </a>
      {/each}
    </div>
  </section>
</div>