<script lang="ts">
  import { onMount } from 'svelte';
  import {
    applyBonsaiOperation,
    bonsaiGridToMarkup,
    createBonsaiGrid,
    generateBonsai,
    type BonsaiType
  } from './bonsai';

  export let speed = 2;
  export let creditHref = '';
  export let creditLabel = '';

  const treeTypes: { value: BonsaiType; label: string; shortLabel: string }[] = [
    { value: 'classic', label: 'Classic', shortLabel: 'Classic' },
    { value: 'fibonacci', label: 'Fibonacci', shortLabel: 'Fibonacci' },
    { value: 'offset-fibonacci', label: 'Offset Fibonacci', shortLabel: 'Offset' },
    { value: 'random-fibonacci', label: 'Random Fibonacci', shortLabel: 'Wild' }
  ];

  let treeMarkup = '';
  let animationFrame = 0;
  let selectedType: BonsaiType = 'classic';
  let currentType: BonsaiType = 'classic';
  let prefersReducedMotion = false;
  let isMounted = false;
  let announcement = '';
  let generationNumber = 0;
  let treeFit = 1;
  let isGrowing = false;

  function randomSeed() {
    const values = new Uint32Array(1);
    if (globalThis.crypto?.getRandomValues) {
      globalThis.crypto.getRandomValues(values);
      return values[0];
    }
    return Math.floor(Math.random() * 4294967296);
  }

  function typeLabel(type: BonsaiType) {
    return treeTypes.find((option) => option.value === type)?.label ?? 'Classic';
  }

  function generateNewTree() {
    if (!isMounted) return;

    cancelAnimationFrame(animationFrame);
    isGrowing = true;
    currentType = selectedType;
    generationNumber += 1;

    const blueprint = generateBonsai({ seed: randomSeed(), type: selectedType });
    const grid = createBonsaiGrid(blueprint.width, blueprint.height);
    // Every growth rule draws into the same frame, so the pot and trunk share
    // one visual origin instead of each variation being cropped to its own edge.
    const frame = {
      minX: 0,
      maxX: blueprint.width - 1,
      minY: 0,
      maxY: blueprint.height - 1
    };
    // Keep the shared frame, but size it for the visible tree rather than its
    // empty side columns so every growth rule retains the original visual weight.
    treeFit = 192 / blueprint.width;
    treeMarkup = bonsaiGridToMarkup(grid, frame);

    const finishImmediately = prefersReducedMotion || speed <= 0;
    if (finishImmediately) {
      for (const operation of blueprint.operations) applyBonsaiOperation(grid, operation);
      treeMarkup = bonsaiGridToMarkup(grid, frame);
      announcement = `Generated ${typeLabel(currentType)} tree ${generationNumber}`;
      isGrowing = false;
      return;
    }

    const duration = Math.min(
      2400,
      Math.max(1200, blueprint.operations.length * Math.max(0.5, speed))
    );
    let appliedOperations = 0;
    let startTime = 0;

    const grow = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min(1, (time - startTime) / duration);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const targetOperations = Math.floor(easedProgress * blueprint.operations.length);

      while (appliedOperations < targetOperations) {
        applyBonsaiOperation(grid, blueprint.operations[appliedOperations]);
        appliedOperations += 1;
      }

      treeMarkup = bonsaiGridToMarkup(grid, frame);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(grow);
      } else {
        announcement = `Generated ${typeLabel(currentType)} tree ${generationNumber}`;
        isGrowing = false;
      }
    };

    animationFrame = requestAnimationFrame(grow);
  }

  function selectTreeType(type: BonsaiType) {
    selectedType = type;
    generateNewTree();
  }

  onMount(() => {
    isMounted = true;
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    generateNewTree();
    return () => cancelAnimationFrame(animationFrame);
  });
</script>

<div class="bonsai-stage">
  <div class="bonsai-art">
    <pre
      class="bonsai"
      class:growing={isGrowing}
      role="img"
      aria-label={`Procedurally generated ${typeLabel(currentType)} ASCII bonsai tree`}
      aria-busy={isGrowing}
      style:--bonsai-fit={`${treeFit}cqw`}
    >{@html treeMarkup}</pre>
  </div>

  <div class="tree-controls" aria-label="Bonsai generator controls">
    <p class="tree-controls-label">Growth rule <span>{typeLabel(selectedType)}</span></p>
    <div class="tree-mode-buttons" role="group" aria-label="Tree growth pattern">
      {#each treeTypes as type}
        <button
          type="button"
          class="tree-mode-button"
          class:active={selectedType === type.value}
          on:click={() => selectTreeType(type.value)}
          aria-label={`Use ${type.label} growth pattern`}
          aria-pressed={selectedType === type.value}
        >
          {type.shortLabel}
        </button>
      {/each}
    </div>
    <button
      type="button"
      class="tree-new-button"
      class:growing={isGrowing}
      on:click={generateNewTree}
      aria-label={`Generate a new ${typeLabel(selectedType)} tree`}
    >
      {isGrowing ? 'Growing…' : 'Grow another'}
    </button>
    <p class="tree-invite">Choose a growth rule, then grow a fresh variation.</p>
    {#if creditHref && creditLabel}
      <a class="tree-credit" href={creditHref} target="_blank" rel="noopener">{creditLabel}</a>
    {/if}
  </div>

  <span class="sr-only" aria-live="polite">{announcement}</span>
</div>

<style>
  .bonsai-stage {
    width: min(100%, 52rem);
    display: grid;
    grid-template-columns: minmax(0, 1fr) clamp(9rem, 15vw, 11rem);
    align-items: center;
    gap: clamp(0.75rem, 1.5vw, 1.25rem);
  }

  .bonsai-art {
    min-width: 0;
    container-type: inline-size;
  }

  .bonsai {
    font-family: "Roboto Mono", monospace;
    font-size: min(1.15rem, var(--bonsai-fit, 1rem));
    line-height: 1.2;
    white-space: pre;
    color: var(--bonsai-color, currentColor);
    min-height: calc(36 * 1.2em);
    max-width: 100%;
    overflow: hidden;
    transition: filter 180ms var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
  }

  .bonsai.growing {
    filter: saturate(1.08) brightness(1.04);
  }

  .bonsai :global(.bonsai-branch) { color: var(--bonsai-branch-1); }
  .bonsai :global(.bonsai-branch.bonsai-tone-1) { color: var(--bonsai-branch-2); }
  .bonsai :global(.bonsai-branch.bonsai-tone-2) { color: var(--bonsai-branch-3); }
  .bonsai :global(.bonsai-leaf) { color: var(--bonsai-leaf-1); }
  .bonsai :global(.bonsai-leaf.bonsai-tone-1) { color: var(--bonsai-leaf-2); }
  .bonsai :global(.bonsai-leaf.bonsai-tone-2) { color: var(--bonsai-leaf-3); }
  .bonsai :global(.bonsai-pot) { color: var(--bonsai-pot); }
  .bonsai :global(.bonsai-soil) { color: var(--bonsai-soil); }

  .tree-controls {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    width: 100%;
    padding-left: clamp(0.75rem, 1.5vw, 1.25rem);
    pointer-events: auto;
    font-family: "OverusedGrotesk", Arial, sans-serif;
  }

  .tree-controls-label {
    margin: 0 0 0.15rem;
    color: var(--muted);
    font-size: 0.875rem;
    line-height: 1.4;
    text-align: left;
  }

  .tree-controls-label span {
    color: var(--text);
  }

  .tree-credit {
    color: var(--dim);
    font-size: 0.75rem;
    line-height: 1.35;
    text-decoration: none;
  }

  .tree-credit:hover {
    color: var(--text);
  }

  .tree-credit:focus-visible {
    outline: 2px solid var(--text);
    outline-offset: 3px;
  }

  .tree-mode-buttons {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.35rem;
  }

  button {
    min-height: 3rem;
    border: 1px solid var(--border);
    border-radius: 0;
    background: var(--bg);
    color: var(--text);
    font: inherit;
    font-size: 0.875rem;
  }

  button {
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    transition:
      transform 140ms var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1)),
      background-color 180ms var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1)),
      border-color 180ms var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1)),
      color 180ms var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1));
  }

  @media (hover: hover) {
    button:hover {
      border-color: var(--muted);
      transform: translateY(-1px);
      will-change: transform;
    }
  }

  button:active {
    transform: scale(0.98);
  }

  button:focus-visible {
    outline: 2px solid var(--text);
    outline-offset: 3px;
  }

  .tree-mode-button,
  .tree-new-button {
    min-height: 2.75rem;
    padding: 0.55rem 0.7rem;
    font-size: 0.875rem;
    line-height: 1;
  }

  .tree-mode-button {
    border-color: var(--border);
    background: transparent;
  }

  .tree-mode-button:hover,
  .tree-mode-button.active {
    border-color: var(--text);
  }

  .tree-mode-button.active {
    background: var(--text);
    color: var(--bg);
  }

  .tree-new-button {
    border-color: var(--text);
  }

  .tree-new-button:hover {
    background: var(--text);
    color: var(--bg);
  }

  .tree-new-button.growing {
    animation: growing-indicator 900ms var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1)) infinite alternate;
  }

  @keyframes growing-indicator {
    from { box-shadow: 0 0 0 0 color-mix(in srgb, var(--text) 0%, transparent); }
    to { box-shadow: 0 0 0 4px color-mix(in srgb, var(--text) 18%, transparent); }
  }

  .tree-invite {
    margin: 0.3rem 0 0;
    color: var(--muted);
    font-family: "OverusedGrotesk", Arial, sans-serif;
    font-size: 0.875rem;
    line-height: 1.4;
    text-align: left;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .bonsai.growing { filter: none; }
    .tree-new-button.growing { animation: none; }
  }

  @media (max-width: 768px) {
    .bonsai-stage {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .bonsai-art {
      width: 100%;
    }

    .bonsai {
      font-size: min(0.6rem, var(--bonsai-fit, 0.6rem));
      line-height: 1.2;
      max-width: 100vw;
      overflow: hidden;
      align-self: center;
      min-height: calc(36 * 1.2em);
    }

    .tree-controls {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      width: calc(100% - 2rem);
      margin-top: 1.25rem;
      padding: 1rem 0 0;
      border-top: 1px solid var(--border);
      border-left: 0;
    }

    .tree-controls-label {
      width: 100%;
      text-align: center;
    }

    .tree-credit {
      width: 100%;
      text-align: center;
    }

    .tree-mode-buttons {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    .tree-invite {
      width: 100%;
      text-align: center;
    }

    .tree-mode-button,
    .tree-new-button {
      min-height: 2.75rem;
      font-size: 0.875rem;
    }
  }

  @media (min-width: 769px) {
    .bonsai-art {
      grid-column: 1 / -1;
      grid-row: 1;
    }

    .tree-controls {
      grid-column: 2;
      grid-row: 1;
      position: relative;
      z-index: 1;
      transform: translateX(clamp(2rem, 4vw, 4rem));
    }

    .bonsai {
      transform: translate(-13.5rem, 4rem) scale(1.15);
      transform-origin: center bottom;
    }
  }
</style>
