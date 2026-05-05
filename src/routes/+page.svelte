<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import BonsaiTree from '$lib/BonsaiTree.svelte';
  import GithubIcon from '$lib/github.svg?raw';
  import LinkedInIcon from '$lib/linkedin.svg?raw';
  import EmailIcon from '$lib/email.svg?raw';
  import ResumeIcon from '$lib/resume.svg?raw';

  // ─── Hero content ─────────────────────────────────────────────────────────────
  let firstName = "Hello,";
  let lastName = "I'm Dragos";
  let bio = [
    "Toronto-based full-stack machine learning developer with interests in UX, design, robotics, and low level systems.",
    "I'm a third year Computer Science student at Durham College looking to improve my skills. Beyond programming, I enjoy rock climbing.",
    "Welcome to my website."
  ];

  // ─── Nav links ────────────────────────────────────────────────────────────────
  let links = [
    { label: "GitHub",   href: "https://github.com/Sxres",                   raw: GithubIcon   },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dragos-sorescu/", raw: LinkedInIcon },
    { label: "Resume",   href: "/Dragos Sorescu Resume.pdf",                  raw: ResumeIcon   },
    { label: "Email",    href: "mailto:sorescudragos847@gmail.com",            raw: EmailIcon    },
  ];

  // ─── Toolkit icons (devicons CDN) ─────────────────────────────────────────────
  let tools = [
    // languages
    { label: "Python",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { label: "C++",          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
    // libraries & frameworks
    { label: "FastAPI",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
    { label: "Svelte",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" },
    { label: "PyTorch",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
    { label: "TensorFlow",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
    { label: "Scikit-Learn", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
    { label: "Pandas",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
    { label: "NumPy",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
    { label: "Matplotlib",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
    { label: "OpenCV",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg" },
    // tools & platforms
    { label: "Docker",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { label: "GCP",          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
    { label: "MySQL",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    { label: "PostgreSQL",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { label: "Jenkins",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" },
  ];

  // ─── Projects ─────────────────────────────────────────────────────────────────
  let projects = [
    {
      title: "Playing Cards Detection",
      year: "2026",
      tag: "OpenCV / Yolo / NumPy",
      href: "https://github.com/Sxres/PlayingCardsDetection",
      img: "/thumbnails/PokerProject.png",
      details: "Built a real-time playing card detection system using a fine-tuned YOLOv26 model. Detects card rank and suit live via webcam with bounding boxes and confidence scores. Also includes a poker hand evaluator.",
    },
    {
      title: "Skin Cancer Classification Research",
      year: "2026",
      tag: "Yolo / Deep Learning / DinoV2 ",
      href: "https://github.com/Sxres/SkinCancerImageClassificationResearch",
      img: "/thumbnails/skincancer2.png",
      details: "Researching self-supervised learning on binary classification of skin lesions (malignant vs benign) from dermoscopy images using DINOv2 and ResNet models on the MRA-MIDAS Stanford dataset.",
    },
    {
      title: "LotWatch",
      year: "2026",
      tag: "Python / OpenCV / NumPy ",
      href: "https://github.com/Sxres/LotWatch",
      img: "/thumbnails/LotWatch.gif",
      details: "Built a computer vision system in Python that processes parking lot video footage and classifies each space as occupied or empty on every frame using MOG2 background subtraction and Laplacian variance.",
    },
    {
      title: "Temperature Predictor",
      year: "2025",
      tag: "Python / XGBoost / FastAPI /Docker / GCP / Streamlit / Matplotlib / Plotly / Shap",
      href: "https://github.com/Sxres/temperature_predictor_app",
      img: "/thumbnails/TempProject.png",
      details: "Built and shipped a temperature forecasting product from data preparation to cloud deployment. Owned model development, backend integration, and user-facing prediction workflows to deliver reliable forecasts in a simple web experience.",
    },
  ];

  // ─── Theme state ──────────────────────────────────────────────────────────────
  let dark = true;

  /** Toggles dark/light class on <body> and flips the dark flag. */
  function toggleTheme() {
    dark = !dark;
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
  }

  // ─── Project card helpers ─────────────────────────────────────────────────────
  const MAX_CARD_TAGS = 4;

  /** Splits a slash-separated tag string into an array of trimmed tag labels. */
  function getTags(tagString: string) {
    return tagString.split('/').map((t) => t.trim()).filter(Boolean);
  }

  // ─── Unused / reserved ────────────────────────────────────────────────────────
  // cycleFace was originally wired to an emoji in the hero but is currently unused.
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

  // ─── Lifecycle ────────────────────────────────────────────────────────────────
  onMount(() => {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<style>
  /* ─── Font ───────────────────────────────────────────────────────────────────── */
  @font-face {
    font-family: 'OverusedGrotesk';
    src: url('/fonts/OverusedGrotesk-Book.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  /* ─── Global resets ──────────────────────────────────────────────────────────── */
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Smooth color transitions on every element for theme switching. */
  :global(*, *::before, *::after) {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }

  /* The bonsai uses a gradient that can't transition cleanly, so disable it. */
  :global(.bonsai) {
    transition: none !important;
  }

  :global(html) {
    scroll-behavior: smooth;
    scrollbar-width: none; /* Firefox */
  }

  :global(html::-webkit-scrollbar) {
    display: none; /* Chrome/Safari */
  }

  /* ─── Theme tokens ────────────────────────────────────────────────────────────── */
  :global(body.dark) {
    --bg: #0e0e0e;
    --text: #dfd8cc;
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
    --muted: #535353;
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

  /* ─── Base body ───────────────────────────────────────────────────────────────── */
  :global(body) {
    background: var(--bg);
    color: var(--text);
    font-family: 'OverusedGrotesk', monospace;
    font-size: 16px;
    line-height: 1.6;
    cursor: default;
    overflow-x: hidden;
    --theme-transition-speed: 0.3s;
    --theme-transition-ease: ease;
  }

  /* ─── Page layout ─────────────────────────────────────────────────────────────── */
  /* Left-aligned content column, capped so it doesn't compete with the bonsai. */
  .page {
    max-width: 780px;
    margin: 0;
    margin-left: 5vw;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }

  /* ─── Header & nav ────────────────────────────────────────────────────────────── */
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
    margin-left: 6vw;
    --theme-transition-speed: 0.3s;
    --theme-transition-ease: ease;
  }

  nav {
    display: flex;
    flex: 1;
    align-items: center;
    gap: 1.8rem;
  }

  nav a {
    color: var(--text);
    text-decoration: none;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    font-weight: 500;
  }

  nav a:hover { color: var(--muted); }

  nav a :global(svg) {
    width: 18px;
    height: 18px;
    transform: translateX(-4px) translateY(4px);
  }

  /* SVG icon color transitions for nav and footer during theme switch. */
  nav a :global(svg),
  nav a :global(svg *),
  .footer-icons a :global(svg),
  .footer-icons a :global(svg *) {
    transition: color var(--theme-transition-speed) var(--theme-transition-ease), fill var(--theme-transition-speed) var(--theme-transition-ease), stroke var(--theme-transition-speed) var(--theme-transition-ease), opacity var(--theme-transition-speed) var(--theme-transition-ease);
    transition-delay: 0s !important;
  }

  /* Dark/light toggle button in the header. */
  .theme-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--muted);
    cursor: pointer;
    font-size: 0.75rem;
    padding: 0.3rem 0.7rem;
    margin-left: 0.7rem;
    letter-spacing: 0.08em;
    font-family: 'OverusedGrotesk', monospace;
  }

  .theme-btn:hover {
    color: var(--text);
    border-color: var(--text);
  }

  /* ─── Bonsai tree ─────────────────────────────────────────────────────────────── */
  /* Desktop: fixed to the right half of the viewport, behind page content. */
  .bonsai-wrap {
    position: fixed;
    right: 0;
    top: 0;
    height: 81vh;
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

  /* Mobile: rendered inline above the hero instead (see media query). */
  .bonsai-wrap-mobile {
    display: none;
    width: 100%;
    overflow: hidden;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0;
    pointer-events: none;
    margin-top: -5rem;
  }

  .bonsai-credit {
    font-size: 0.65rem;
    color: var(--dim);
    text-decoration: none;
    letter-spacing: 0.04rem;
    margin-top: 0.4rem;
    pointer-events: auto;
  }

  .bonsai-credit:hover { color: var(--text); }

  /* ─── Hero ────────────────────────────────────────────────────────────────────── */
  .hero {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 4rem 0;
  }

  .hero-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* "Hello," and "I'm Dragos" share the same large type scale. */
  .hero-header-line,
  .hero-name {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1.0;
    color: var(--text);
    letter-spacing: -0.02em;
    font-weight: normal;
  }

  .hero-name {
    display: block;
    width: 100%;
  }

  .hero-bio {
    font-size: 1.2rem;
    color: var(--muted);
    max-width: 85ch;
    line-height: 1.4;
    margin-bottom: 0.6rem;
  }

  /* Shared section heading style used by Toolkit and Projects. */
  .section-main-title {
    font-size: clamp(1.5rem, 3.2vw, 2.7rem);
    line-height: 1.05;
    color: var(--text);
    letter-spacing: -0.02em;
    font-weight: normal;
    margin-bottom: 1rem;
  }

  /* ─── Toolkit ─────────────────────────────────────────────────────────────────── */
  .toolkit {
    margin-top: 3rem;
  }

  .toolkit-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem;
  }

  .tool-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text);
    font-size: 0.9rem;
  }

  /* ─── Projects ────────────────────────────────────────────────────────────────── */
  /* Extra top margin to visually separate from the toolkit section. */
  .section-title {
    color: var(--text);
    margin-top: 8rem;
  }

  .projects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    background: none;
    border: none;
  }

  /* Each card is an <a> tag styled as a block. */
  .project-card {
    text-decoration: none;
    color: inherit;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    cursor: pointer;
    font: inherit;
    text-align: left;
    width: 100%;
  }

  .project-card:hover { border-color: var(--muted); }

  /* Thumbnail wrapper — overflow:hidden clips the zoom effect. */
  .thumb-wrap {
    position: relative;
    overflow: hidden;
  }

  .project-thumb {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  /* Zoom thumbnail on hover to signal interactivity behind the overlay. */
  .project-card:hover .project-thumb { transform: scale(1.15); }

  /* Tag pills overlaid on the thumbnail (bottom-left corner). */
  .project-tags {
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    display: flex;
    gap: 0.4rem;
  }

  .tag {
    background: rgba(0, 0, 0, 0.952);
    color: #fff;
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }

  /* Fade tags out when the description overlay appears. */
  .project-card:hover .project-tags {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  /* Dark overlay that reveals the project description on hover. */
  .card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.72);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 2;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 0.9rem;
  }

  .project-card:hover .card-overlay { opacity: 1; }

  .card-overlay-text {
    color: rgba(255,255,255,0.88);
    font-size: 0.88rem;
    line-height: 1.55;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Title and year row at the bottom of each card. */
  .project-meta {
    padding: 0.6rem 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .project-title {
    font-size: 0.95rem;
    color: var(--text);
    letter-spacing: 0.02em;
  }

  .project-year {
    font-size: 0.75rem;
    color: var(--muted);
  }

  /* ─── Footer ──────────────────────────────────────────────────────────────────── */
  .site-footer {
    margin-top: 3.25rem;
    margin-bottom: 1.25rem;
    border: 1px solid var(--card-border);
    border-radius: 8px;
    background: var(--bg);
    padding: 1.1rem 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .footer-meta {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .footer-line {
    font-size: 0.95rem;
    letter-spacing: 0.01em;
    color: var(--text);
    font-weight: 400;
  }

  .footer-name {
    color: var(--text);
    font-weight: 400;
  }

  .footer-icons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .footer-icons a {
    color: var(--text);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .footer-icons a :global(svg) {
    width: 22px;
    height: 22px;
    opacity: 0.95;
  }

  .footer-icons a:hover :global(svg) { opacity: 0.65; }

  /* ─── Mobile (≤ 768px) ────────────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    :global(html),
    :global(body) {
      overflow-x: hidden;
    }

    :global(body) {
      --theme-transition-speed: 0.3s;
    }

    /* Switch from fixed desktop bonsai to inline mobile bonsai above the hero. */
    .bonsai-wrap        { display: none; }
    .bonsai-wrap-mobile { padding: 0.5rem 0 0.5rem 0.35rem; display: flex; }
    .bonsai-credit      { text-align: center; width: 100%; }

    .page {
      margin-left: 0;
      padding: 0 1.2rem;
      max-width: 100%;
      overflow-x: clip;
    }

    header {
      width: 100%;
      margin-left: 0;
      flex-direction: column;
      align-items: stretch;
      gap: 0.55rem;
      padding: 1rem 1rem 0.85rem;
      --theme-transition-speed: 0.3s;
    }

    nav {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.35rem;
      align-items: center;
    }

    nav a {
      font-size: 0.76rem;
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      white-space: nowrap;
    }

    nav a :global(svg) {
      width: 13px;
      height: 13px;
      transform: none;
      flex: 0 0 auto;
    }

    .theme-btn {
      order: -1;
      align-self: flex-start;
      margin-left: 0.4rem;
      margin-bottom: 0.35rem;
      margin-right: 0;
      font-size: 0.72rem;
      padding: 0.24rem 0.62rem;
    }

    /* Hero doesn't need min-height since the bonsai is inline above it. */
    .hero {
      min-height: unset;
      padding: 1.5rem 0 3rem;
      gap: 1.6rem;
    }

    /* Stack project cards to single column. */
    .projects { grid-template-columns: 1fr; }

    .toolkit-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.7rem;
      padding: 0.95rem;
    }

    .tool-item {
      min-width: 0;
      font-size: 0.84rem;
      gap: 0.35rem;
    }

    .tool-item img {
      width: 24px;
      height: 24px;
      flex: 0 0 24px;
    }

    .tool-item span { overflow-wrap: anywhere; }

    .site-footer {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  /* ─── Mobile (≤ 480px) ────────────────────────────────────────────────────────── */
  @media (max-width: 480px) {
    header { padding: 0.95rem 0.75rem 0.8rem; }

    nav     { gap: 0.28rem; }
    nav a   { font-size: 0.72rem; }

    .theme-btn {
      margin-left: 0.5rem;
      margin-bottom: 0.3rem;
      margin-right: 0;
      font-size: 0.68rem;
      padding: 0.22rem 0.56rem;
    }

    .toolkit-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.6rem;
      padding: 0.85rem;
    }

    .tool-item {
      font-size: 0.79rem;
      gap: 0.3rem;
    }

    .tool-item img {
      width: 22px;
      height: 22px;
      flex: 0 0 22px;
    }
  }
</style>

<!-- ─── Desktop bonsai (fixed right, behind content) ──────────────────────────── -->
<div class="bonsai-wrap">
  <BonsaiTree speed={1}/>
  <a href="https://github.com/Ben-Edwards44/PyBonsai" target="_blank" rel="noopener" class="bonsai-credit">
    procedurally generated bonsai by PyBonsai
  </a>
</div>

<header>
  <nav>
    {#each links as link}
      <a href={link.href} target="_blank" rel="noopener">
        {@html link.raw}
        {link.label}
      </a>
    {/each}
  </nav>
  <button class="theme-btn" on:click={toggleTheme}>
    {dark ? 'light' : 'dark'}
  </button>
</header>

<div class="page">

  <!-- ─── Mobile bonsai (inline above hero) ───────────────────────────────────── -->
  <div class="bonsai-wrap-mobile">
    <BonsaiTree speed={1}/>
    <a href="https://github.com/Ben-Edwards44/PyBonsai" target="_blank" rel="noopener" class="bonsai-credit">
      procedurally generated bonsai by PyBonsai
    </a>
  </div>

  <!-- ─── Hero ─────────────────────────────────────────────────────────────────── -->
  <section class="hero">
    <div class="hero-header">
      <span class="hero-header-line">{firstName}</span>
      <h1 class="hero-name">{lastName}</h1>
    </div>
    <div>
      {#each bio as paragraph}
        <p class="hero-bio">{paragraph}</p>
      {/each}
    </div>
  </section>

  <!-- ─── Toolkit ───────────────────────────────────────────────────────────────── -->
  <section class="toolkit">
    <h1 class="section-main-title">My Current Toolkit</h1>
    <div class="toolkit-grid">
      {#each tools as tool}
        <div class="tool-item">
          <img src={tool.src} alt={tool.label} width="32" height="32" />
          <span>{tool.label}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- ─── Projects ──────────────────────────────────────────────────────────────── -->
  <section class="section-title">
    <h1 class="section-main-title">Some of My Projects</h1>
    <div class="projects">
      {#each projects as project}
        {@const tags = getTags(project.tag)}
        <a href={project.href} target="_blank" rel="noopener" class="project-card">
          <div class="thumb-wrap">
            <img class="project-thumb" src={project.img} alt={project.title} />
            <div class="project-tags">
              {#each tags.slice(0, MAX_CARD_TAGS) as t}
                <span class="tag">{t}</span>
              {/each}
              {#if tags.length > MAX_CARD_TAGS}
                <span class="tag">+{tags.length - MAX_CARD_TAGS}</span>
              {/if}
            </div>
            <div class="card-overlay">
              <p class="card-overlay-text">{project.details}</p>
            </div>
          </div>
          <div class="project-meta">
            <span class="project-title">{project.title}</span>
            <span class="project-year">{project.year}</span>
          </div>
        </a>
      {/each}
    </div>
  </section>

  <!-- ─── Footer ────────────────────────────────────────────────────────────────── -->
  <footer class="site-footer">
    <div class="footer-meta">
      <p class="footer-line">Made By <span class="footer-name">Dragos Sorescu</span></p>
      <p class="footer-line">Last Updated on May 5, 2026</p>
    </div>
    <div class="footer-icons">
      <a href="https://github.com/Sxres" target="_blank" rel="noopener" aria-label="GitHub">
        {@html GithubIcon}
      </a>
      <a href="https://www.linkedin.com/in/dragos-sorescu/" target="_blank" rel="noopener" aria-label="LinkedIn">
        {@html LinkedInIcon}
      </a>
      <a href="mailto:sorescudragos847@gmail.com" aria-label="Email">
        {@html EmailIcon}
      </a>
    </div>
  </footer>

</div>
