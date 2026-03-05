<script>
  import { onMount, onDestroy } from 'svelte';

  export let speed = 1;
  export let apiUrl = "https://bonsai-api-434709608207.northamerica-northeast2.run.app";

  let tree = "";
  let loading = true;
  let done = false;
  let cancelled = false;

  onMount(async () => {
    try {
      const response = await fetch(`${apiUrl}/tree/instant`);
      const data = await response.json();
      const full = data.tree;
      loading = false;

      for (let i = 0; i < full.length; i++) {
        if (cancelled) break;
        tree += full[i];
        if (full[i] !== ' ') {
            await new Promise(r => setTimeout(r, speed));
  }
}
      done = true;
    } catch (err) {
      console.error("Bonsai failed:", err);
      loading = false;
      tree = "  could not grow tree :(";
      done = true;
    }
  });

  onDestroy(() => {
    cancelled = true;
  });
</script>

<pre class="bonsai" class:loading>{tree}{#if !done && !loading}<span class="cursor">▌</span>{/if}</pre>

<style>
  .bonsai {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.2rem;
    line-height: 1.3;
    white-space: pre;
    color: var(--bonsai-color);
    transition: none;
  }

  .bonsai.loading {
    opacity: 0.3;
  }

  .cursor {
    display: inline-block;
    animation: blink 0.8s step-end infinite;
    -webkit-text-fill-color: var(--bonsai-mid);
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
</style>