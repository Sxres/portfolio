<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import BonsaiTree from '$lib/BonsaiTree.svelte';
  import GithubIcon from '$lib/github.svg?raw';
  import LinkedInIcon from '$lib/linkedin.svg?raw';
  import ResumeIcon from '$lib/resume.svg?raw';

  // ─── Hero content ─────────────────────────────────────────────────────────────
  let firstName = "Hello,";
  let lastName = "I'm Dragos";
  let bio = [
    "Toronto-based full-stack machine learning developer with interests in robotics, agents, and low level systems.",
    "I'm a third year Computer Science student at Durham College looking to connect with cool people! Beyond programming, I enjoy rock climbing.",
  ];

  // ─── Nav links ────────────────────────────────────────────────────────────────
  let links = [
    { label: "GitHub",   href: "https://github.com/Sxres",                   raw: GithubIcon   },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dragos-sorescu/", raw: LinkedInIcon },
    { label: "Resume",   href: "/Dragos Sorescu Resume.pdf",                  raw: ResumeIcon   }
  ];

  // ─── Currently Working On ──────────────────────────────────────────────────────
  let workingOn = {
    title: "Dimas",
    href: "https://github.com/Sxres/FunnyMarketNewsLetter",
    img: "/thumbnails/MoonAnimation.gif",
    bio: [
      "Claude-powered stock research agent. Ask about any ticker and it fetches live price, news, fundamentals & insider trades then writes a professional or WSB-style analysis. No pre-ingestion, all on-demand.",
      "Looking to implement AWS services to fully deploy a working product.",
    ],
  };

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
    { label: "AWS",          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { label: "MySQL",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    { label: "PostgreSQL",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },

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

  let interval = 0;


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
  /* ─── Fonts ───────────────────────────────────────────────────────────────────── */
  @font-face {
    font-family: 'OverusedGrotesk';
    src: url('/fonts/OverusedGrotesk-Book.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face{
    font-family: 'Geist-Light';
    src: url('/fonts/Geist-Light.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
    @font-face{
    font-family: 'Geist-Regular';
    src: url('/fonts/Geist-Regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
    @font-face{
    font-family: 'Geist-Thin';
    src: url('/fonts/Geist-Thin.otf') format('opentype');
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
    transition: background-color 0.3s var(--ease-out-quart), border-color 0.3s var(--ease-out-quart), color 0.3s var(--ease-out-quart);
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
    --bonsai-branch-1: oklch(66% 0.1 55);
    --bonsai-branch-2: oklch(72% 0.09 67);
    --bonsai-branch-3: oklch(55% 0.075 42);
    --bonsai-leaf-1: oklch(68% 0.17 30);
    --bonsai-leaf-2: oklch(58% 0.15 20);
    --bonsai-leaf-3: oklch(74% 0.15 52);
    --bonsai-pot: oklch(66% 0.018 260);
    --bonsai-soil: oklch(54% 0.065 88);
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
    --bonsai-branch-1: oklch(40% 0.1 55);
    --bonsai-branch-2: oklch(46% 0.12 67);
    --bonsai-branch-3: oklch(31% 0.08 42);
    --bonsai-leaf-1: oklch(48% 0.19 30);
    --bonsai-leaf-2: oklch(39% 0.16 20);
    --bonsai-leaf-3: oklch(58% 0.18 52);
    --bonsai-pot: oklch(31% 0.015 260);
    --bonsai-soil: oklch(29% 0.04 88);
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
    --theme-transition-ease: var(--ease-out-quart);
    --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
    --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ─── Page layout ─────────────────────────────────────────────────────────────── */
  /* Left-aligned content column, capped so it doesn't compete with the bonsai. */
  .page {
    max-width: 780px;
    margin: 0;
    margin-left: 2vw;
    padding: 0;
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
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    padding: 1.2rem 6vw;
    border-bottom: 1px solid var(--border);
    width: 100%;
    margin-left: 0;
    --theme-transition-speed: 0.3s;
    --theme-transition-ease: var(--ease-out-quart);
  }

  .site-identity {
    color: var(--text);
    flex: 0 0 auto;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    text-decoration: none;
  }

  .header-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.8rem;
  }

  .header-actions nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header-actions nav a {
    color: var(--text);
    text-decoration: none;
    font-size: 0.875rem;
    letter-spacing: 0.01em;
    font-weight: 500;
    min-height: 2.75rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .header-actions nav a:hover { color: var(--muted); }

  .header-actions nav a :global(svg) {
    width: 16px;
    height: 16px;
    transform: none;
  }

  .header-email {
    min-height: 2.75rem;
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--text);
    color: var(--bg);
    background: var(--text);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition:
      transform 140ms var(--ease-out-quart),
      background-color var(--theme-transition-speed) var(--theme-transition-ease),
      color var(--theme-transition-speed) var(--theme-transition-ease);
  }

  .header-email:is(:hover, :focus-visible) {
    background: transparent;
    color: var(--text);
    transform: translateY(-1px);
  }

  /* SVG icon color transitions for nav and footer during theme switch. */
  .header-actions nav a :global(svg),
  .header-actions nav a :global(svg *) {
    transition: color var(--theme-transition-speed) var(--theme-transition-ease), fill var(--theme-transition-speed) var(--theme-transition-ease), stroke var(--theme-transition-speed) var(--theme-transition-ease), opacity var(--theme-transition-speed) var(--theme-transition-ease);
    transition-delay: 0s !important;
  }

  /* Dark/light toggle button in the header. */
  .theme-btn {
    min-height: 2.75rem;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
    cursor: pointer;
    font-size: 0.875rem;
    padding: 0.4rem 0.65rem;
    margin: 0;
    letter-spacing: 0.02em;
    font-family: 'OverusedGrotesk', monospace;
  }

  .theme-btn:hover {
    color: var(--text);
    border-color: var(--text);
  }

  .theme-btn:active { transform: scale(0.97); }

  /* ─── Bonsai tree ─────────────────────────────────────────────────────────────── */
  /* Desktop: fixed to the right half of the viewport, behind page content. */
  .bonsai-wrap {
    position: fixed;
    right: 0;
    top: 8rem;
    height: calc(81vh - 6rem);
    width: 57vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    pointer-events: none;
    z-index: 0;
    overflow: visible;
  }

  @media (min-width: 769px) {
    .bonsai-wrap { transform: translate(0, 2rem); }
  }

  /* ─── Hero ────────────────────────────────────────────────────────────────────── */
  .hero {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem 0;
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: min(100%, 44rem);
    padding: clamp(1.25rem, 2.5vw, 2rem);
    background: var(--card-bg);
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

  /* ─── Currently Working On ───────────────────────────────────────────────────── */
  .working-on-outer {
    margin-top: 3rem;
    margin-bottom: 6rem;
  }

  .working-on-inner {
    text-decoration: none;
    color: inherit;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    cursor: pointer;
    font: inherit;
    text-align: left;
    width: 100%;
    transition:
      transform 220ms var(--ease-out-quint),
      background-color 180ms var(--ease-out-quart),
      border-color 180ms var(--ease-out-quart);
  }

  .working-on-inner:is(:hover, :focus-visible) {
    border-color: var(--muted);
    transform: translateY(-2px);
  }

  .working-on-inner .thumb-wrap {
    width: 220px;
    height: 220px;
    flex-shrink: 0;
  }

  .working-on-inner .project-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 85% 60%;
    display: block;
    transition: transform 260ms var(--ease-out-expo);
    transform: scale(1.15);
  }

  .working-on-inner:is(:hover, :focus-visible) .project-thumb {
    transform: scale(1.2);
  }

  .working-on-inner-info {
    padding: 1rem 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.6rem;
    flex: 1;
    min-width: 0;
  }

  .working-on-title {
    font-size: 2rem;
    color: var(--text);
    letter-spacing: 0.02em;
    font-weight: normal;
    margin: 0;
  }

  .working-on-bio {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.4;
    margin: 0;
    word-wrap: break-word;
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
    background: var(--card-bg);
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
    transition:
      transform 220ms var(--ease-out-quint),
      background-color 180ms var(--ease-out-quart),
      border-color 180ms var(--ease-out-quart);
    cursor: pointer;
    font: inherit;
    text-align: left;
    width: 100%;
  }

  .project-card:is(:hover, :focus-visible) {
    border-color: var(--muted);
    transform: translateY(-2px);
  }

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
    transition: transform 260ms var(--ease-out-expo);
  }

  /* Zoom thumbnail on hover to signal interactivity behind the overlay. */
  .project-card:is(:hover, :focus-visible) .project-thumb { transform: scale(1.15); }

  /* Tag pills overlaid on the thumbnail (bottom-left corner). */
  .project-tags {
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    display: flex;
    gap: 0.4rem;
    transition: opacity 160ms var(--ease-out-quart);
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
  .project-card:is(:hover, :focus-visible) .project-tags {
    opacity: 0;
  }

  /* Dark overlay that reveals the project description on hover. */
  .card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.72);
    opacity: 0;
    transition: opacity 180ms var(--ease-out-quart);
    z-index: 2;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 0.9rem;
  }

  .project-card:is(:hover, :focus-visible) .card-overlay { opacity: 1; }

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
    margin-top: 5rem;
    margin-bottom: 1.5rem;
    border-top: 1px solid var(--border);
    padding: 1.25rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.5rem;
  }

  .footer-meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .footer-prompt {
    color: var(--muted);
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .footer-email {
    color: var(--text);
    width: fit-content;
    font-size: clamp(1.25rem, 2.2vw, 1.75rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-decoration: none;
  }

  .footer-email span {
    display: inline-block;
    margin-left: 0.15em;
    transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .footer-email:hover span {
    transform: translate(0.14em, -0.14em);
  }

  .footer-links {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.8rem;
  }

  .footer-links a {
    color: var(--text);
    min-height: 2.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.875rem;
    text-decoration: none;
  }

  .footer-links a:hover {
    color: var(--muted);
  }

  :global(a:focus-visible),
  button:focus-visible {
    outline: 2px solid var(--text);
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(*, *::before, *::after) {
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }

  /* ─── Mobile (≤ 768px) ────────────────────────────────────────────────────────── */
  @media (max-width: 768px) {
    :global(html),
    :global(body) {
      overflow-x: hidden;
    }

    :global(body) {
      --theme-transition-speed: 0.3s;
    }

    /* The same generated tree moves inline above the hero on compact screens. */
    .bonsai-wrap {
      position: relative;
      inset: auto;
      width: 100%;
      height: auto;
      min-height: 19rem;
      padding: 1.25rem 0 0.5rem;
      overflow: hidden;
      justify-content: flex-start;
    }

    .page {
      margin-left: 0;
      padding: 0 1.2rem;
      max-width: 100%;
      overflow-x: clip;
    }

    header {
      width: 100%;
      margin-left: 0;
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 0.55rem;
      padding: 0.85rem 1rem;
      --theme-transition-speed: 0.3s;
    }

    .header-actions { display: contents; }

    .header-actions nav {
      grid-column: 1 / -1;
      grid-row: 2;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.35rem;
      align-items: center;
    }

    .header-actions nav a {
      font-size: 0.8rem;
      letter-spacing: 0.02em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      white-space: nowrap;
    }

    .header-actions nav a :global(svg) {
      width: 14px;
      height: 14px;
      transform: none;
      flex: 0 0 auto;
    }

    .theme-btn {
      grid-column: 2;
      grid-row: 1;
      font-size: 0.875rem;
    }

    .header-email { grid-column: 1; grid-row: 1; width: fit-content; }

    /* Hero doesn't need min-height since the bonsai is inline above it. */
    .hero {
      min-height: unset;
      padding: 1.5rem 0 3rem;
      gap: 1.6rem;
    }

    /* Stack project cards to single column. */
    .projects { grid-template-columns: 1fr; }

    .working-on-inner {
      flex-direction: column;
    }

    .working-on-inner .thumb-wrap {
      width: 100%;
      height: 180px;
    }

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
      gap: 0.75rem;
      margin-top: 4rem;
    }

    .footer-links {
      justify-content: flex-start;
    }
  }

  /* ─── Mobile (≤ 480px) ────────────────────────────────────────────────────────── */
  @media (max-width: 480px) {
    header { padding: 0.85rem 0.75rem; }

    .header-actions nav     { gap: 0.28rem; }
    .header-actions nav a   { font-size: 0.875rem; }

    .theme-btn {
      font-size: 0.75rem;
      padding: 0.4rem 0.55rem;
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

<header>
  <a class="site-identity" href="/" aria-label="Dragos Sorescu, home">Dragos Sorescu</a>
  <div class="header-actions">
    <nav aria-label="Profile links">
      {#each links as link}
        <a href={link.href} target="_blank" rel="noopener">
          {@html link.raw}
          {link.label}
        </a>
      {/each}
    </nav>
    <a class="header-email" href="mailto:sorescudragos847@gmail.com">Let’s talk</a>
  </div>
  <button
    class="theme-btn"
    on:click={toggleTheme}
    aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
  >
    {dark ? 'light' : 'dark'}
  </button>
</header>

<!-- Fixed beside the hero on desktop; inline above it on compact screens. -->
<div class="bonsai-wrap">
  <BonsaiTree
    speed={1}
    creditHref="https://github.com/Ben-Edwards44/PyBonsai"
    creditLabel="browser-native bonsai adapted from PyBonsai"
  />
</div>

<div class="page">
  <!-- ─── Hero ─────────────────────────────────────────────────────────────────── -->
  <section class="hero">
    <div class="hero-copy">
      <div class="hero-header">
        <span class="hero-header-line">{firstName}</span>
        <h1 class="hero-name">{lastName}</h1>
      </div>
      <div>
        {#each bio as paragraph}
          <p class="hero-bio">{paragraph}</p>
        {/each}
      </div>
    </div>
  </section>

  <!-- ─── Currently Working On ──────────────────────────────────────────────────── -->
  <section class="working-on-outer">
    <h1 class="section-main-title">Currently Working On</h1>
    <a href={workingOn.href} target="_blank" rel="noopener" class="working-on-inner">
      <div class="thumb-wrap">
        <img class="project-thumb" src={workingOn.img} alt={workingOn.title} />
      </div>
      <div class="working-on-inner-info">
        <h2 class="working-on-title">{workingOn.title}</h2>
        {#each workingOn.bio as line}
          <p class="working-on-bio">{line}</p>
        {/each}
      </div>
    </a>
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
      <p class="footer-prompt">Have an ambitious system in mind?</p>
      <a class="footer-email" href="mailto:sorescudragos847@gmail.com">Let’s build it together <span aria-hidden="true">↗</span></a>
    </div>
    <nav class="footer-links" aria-label="Footer links">
      <a href="https://github.com/Sxres" target="_blank" rel="noopener">GitHub</a>
      <a href="https://www.linkedin.com/in/dragos-sorescu/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="/Dragos Sorescu Resume.pdf" target="_blank" rel="noopener">Résumé</a>
    </nav>
  </footer>

</div>
