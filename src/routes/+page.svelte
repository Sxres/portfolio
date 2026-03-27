<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import BonsaiTree from '$lib/BonsaiTree.svelte';
  import GithubIcon from '$lib/github.svg?raw';
  import LinkedInIcon from '$lib/linkedin.svg?raw';
  import EmailIcon from '$lib/email.svg?raw';
  import ResumeIcon from '$lib/resume.svg?raw';

  let firstName = "Hello,";
  let lastName = "I'm Dragos";
  let role = "developer / student";
  let bio = [
  "Toronto-based full-stack machine learning developer with interests in UX, design, robotics, and low level systems.",
  "I'm a third year Computer Science student at Durham College looking to improve my skills. Beyond programming, I enjoy rock climbing, and linux ricing.",
  "Welcome to my website."
  ];

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

  let dark = true;
  let selected: (typeof projects)[number] | null = null;

  const MAX_CARD_TAGS = 4;

  function getTags(tagString: string) {
    return tagString
      .split('/')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  
  function toggleTheme() {
    dark = !dark;
    const body = document.body;
    body.classList.toggle('dark', dark);
    body.classList.toggle('light', !dark);
  }

  let links = [
    { label: "GitHub", href: "https://github.com/Sxres", raw: GithubIcon },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dragos-sorescu/", raw: LinkedInIcon},
    { label: "Resume", href: "/Dragos Sorescu Resume.pdf", raw: ResumeIcon },
    { label: "Email", href: "mailto:sorescudragos847@gmail.com", raw: EmailIcon },
  ];

  let projects = [
    {
      title: "Playing Cards Detection",
      year: "2026",
      desc: "YOLOv26 based playing card detection for ranks and suits, OpenCV used for poker hand rankings with the treys.",
      tag: "OpenCV / Yolo / NumPy",
      href: "https://github.com/Sxres/PlayingCardsDetection",
      img: "/thumbnails/PokerProject.png",
      details: "Built a real-time playing card detection system using a fine-tuned YOLOv26 model. Detects card rank and suit live via webcam with bounding boxes and confidence scores. Also includes a poker hand evaluator.",
    },
    {
      title: "Skin Cancer Classification Research",
      year: "2026",
      desc: "DinoV2-based image classifier for skin cancer research - benign vs malignant detection from Stanford Multi-Modal AIMI dataset.",
      tag: "Yolo / Deep Learning / DinoV2 ",
      href: "https://github.com/Sxres/SkinCancerImageClassificationResearch",
      img: "/thumbnails/skincancer2.png",
      details: "Researching self-supervised learning on binary classification of skin lesions (malignant vs benign) from dermoscopy images using DINOv2 and ResNet models on the MRA-MIDAS Stanford dataset.",
    },
    {
      title: "LotWatch",
      year: "2026",
      desc: "Built a computer vision system in Python that processes parking lot video footage and classifies each space as occupied or empty on every frame.",
      tag: "Python / OpenCV / NumPy ",
      href: "https://github.com/Sxres/FunnyMarketNewsLetter",
      img: "/thumbnails/LotWatch.gif",
      details: "Built a computer vision system in Python that processes parking lot video footage and classifies each space as occupied or empty on every frame using MOG2 background subtraction and Laplacian variance.",
    },
    {
      title: "Temperature Predictor",
      year: "2025",
      desc: "End-to-end ML project covering data collection, regression model training, API serving with FastAPI, and containerized frontend/backend deployment with Docker Compose.",
      tag: "Python / XGBoost / FastAPI /Docker / GCP / Streamlit / Matplotlib / Plotly / Shap",
      href: "https://github.com/Sxres/temperature_predictor_app",
      img: "/thumbnails/TempProject.png",
      details: "Built a complete end-to-end machine learning pipeline for temperature forecasting. Collected and cleaned weather data, engineered time-based features, and trained an XGBoost regression model to predict future temperatures. Exposed model inference through a FastAPI endpoint and created a Streamlit frontend for interactive input and prediction visualization. Containerized both frontend and backend with Docker, then orchestrated the full stack with Docker Compose for one-command local startup. Deployed to cloud with Google Cloud Run",
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
    document.body.classList.add('dark');
    document.body.classList.remove('light');
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

  /* reset */
  :global(*) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* smooth theme transition on everything */
  :global(*, *::before, *::after) {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }

  /* bonsai gradient can't transition so disable it */
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

  /* themes */
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

  :global(body) {
    background: var(--bg);
    color: var(--text);
    font-family: 'OverusedGrotesk', monospace;
    font-size: 16px;
    line-height: 1.6;
    cursor: default;
    overflow-x: hidden;
  }

  /* desktop bonsai */
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

  /* mobile bonsai */
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
  /* mobile bonsai */

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

  /* layout */
  .page {
    max-width: 780px;
    margin: 0;
    margin-left: 5vw;
    padding: 0 2rem;
    position: relative;
    z-index: 1;
  }

  /* header */
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
  }

  nav {
    display: flex;
    gap: 2rem;
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

  nav a :global(svg) {
    width: 18px;
    height: 18px;
    transform: translateX(-4px) translateY(4px);
  }

  nav a:hover { color: var(--muted); }

  .theme-btn {
    background: none;
    border: 1px solid var(--border);
    color: var(--muted);
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

  /* hero */
  .hero {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2.0rem;
    padding: 4rem 0;
  }



  .hero-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .hero-header-line {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1.0;
    color: var(--text);
    letter-spacing: -0.02em;
    font-weight: normal;
  }

  .hero-name {
    font-size: clamp(2rem, 5vw, 4.5rem);
    line-height: 1.0;
    color: var(--text);
    letter-spacing: -0.02em;
    font-weight: normal;
    display: block;
    width: 100%;
  }

  .section-main-title {
    font-size: clamp(1.5rem, 3.2vw, 2.7rem);
    line-height: 1.05;
    color: var(--text);
    letter-spacing: -0.02em;
    font-weight: normal;
    margin-bottom: 1rem;
  }

  .hero-bio {
    font-size: 1.2rem;
    color: var(--muted);
    max-width: 85ch;
    line-height: 1.4;
    margin-bottom: 0.6rem;
  }

  /* projects  */
  .projects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    background: none;
    border: none;
  }

  .project-card {
    text-decoration: none;
    color: inherit;
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: border-color 0.2s;
    cursor: pointer;
    font: inherit;
    text-align: left;
    width: 100%;
  }

  .project-card:hover {
    border-color: var(--muted);
  }
  .project-title {
  font-size: 0.9rem;
  color: var(--text);
  }
  .project-thumb {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  
  .thumb-wrap {
    position: relative;
    overflow: hidden;
  }

  .project-card:hover .project-thumb {
    transform: scale(1.15);
  }
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
  /* beginning of toolkit crap */
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


  /* project title*/
  .section-title {
    color: var(--text);
    margin-top: 8rem;
  }
  .modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  border: 0;
  background: transparent;
  cursor: default;
}

.modal {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 10px;
  max-width: 700px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 3rem 1.5rem 1.5rem;
  position: relative;
  z-index: 1;
}

.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  color: var(--text);
  font-size: 1.2rem;
  cursor: pointer;
}

.modal-img {
  width: 100%;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.modal-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.modal-details {
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.7;
  white-space: pre-line;
  margin-bottom: 1rem;
}

.modal-link {
  color: var(--muted);
  font-size: 0.85rem;
  text-decoration: none;
}

.modal-link:hover {
  color: var(--text);
}

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

  .footer-icons a:hover :global(svg) {
    opacity: 1;
  }

  /* mobile */
  @media (max-width: 768px) {
    /* hide desktop fixed bonsai */
    .bonsai-wrap {
      display: none;
    }
    
    .bonsai-credit {
      text-align: center;
      width: 100%;
    }

    /* show inline mobile bonsai */
    .bonsai-wrap-mobile {
      padding: 0.5 0 0.5rem;
      display: flex;
    }

    .page {
      margin-left: 0;
      padding: 0 1.2rem;
    }

    header {
      width: 100%;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1.2rem 0;
    }

    nav {
      gap: 1.2rem;
      flex-wrap: wrap;
    }

    /* hero doesn't need min-height since bonsai is above it now */
    .hero {
      min-height: unset;
      padding: 1.5rem 0 3rem;
      gap: 1.6rem;
    }



    .site-footer {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>

<!-- desktop bonsai: fixed to right -->
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
  <!-- mobile bonsai: inline above hero -->
  <div class="bonsai-wrap-mobile">
    <BonsaiTree speed={1}/>
    <a href="https://github.com/Ben-Edwards44/PyBonsai" target="_blank" rel="noopener" class="bonsai-credit">
                        procedurally generated bonsai by PyBonsai
    </a>
  </div>

  <section class="hero">
    <div class="hero-header">
      <span class="hero-header-line">{firstName}</span>
      <h1 class="hero-name">{lastName}</h1>
    </div>
    <div>
          {#each bio as paragraph}
        <p class="hero-bio" >{paragraph}</p>
      {/each}
    </div>
  </section>

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

  
  <section class="section-title">
  <h1 class="section-main-title">Some of My Projects</h1>
  <div class="projects">
    {#each projects as project}
      {@const tags = getTags(project.tag)}
      <button type="button" class="project-card" on:click={() => selected = project}>
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
  </div>
  <div class="project-meta">
    <span class="project-title">{project.title}</span>
    <span class="project-year">{project.year}</span>
  </div>
</button>
    {/each}
  </div>
</section>

  <footer class="site-footer">
    <div class="footer-meta">
      <p class="footer-line">Made By <span class="footer-name">Dragos Sorescu</span></p>
      <p class="footer-line">Last Updated on March 27, 2026</p>
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

{#if selected}
  <div class="modal-backdrop" role="presentation">
    <button
      type="button"
      class="modal-overlay"
      aria-label="Close project modal"
      on:click={() => selected = null}
    ></button>
    <div class="modal">
      <button class="modal-close" on:click={() => selected = null}>✕</button>
      <img src={selected.img} alt={selected.title} class="modal-img" />
      <div class="modal-tags">
        {#each getTags(selected.tag) as t}
          <span class="tag">{t}</span>
        {/each}
      </div>
      <p class="modal-details">{selected.details}</p>
      <a href={selected.href} target="_blank" rel="noopener" class="modal-link">View on GitHub</a>
    </div>
  </div>
{/if}