<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:title" content="sxres.dev" />
  	<meta property="og:description" content="portfolio site with procedurally generated bonsai trees" />
  	<meta property="og:image" content="https://sxres.dev/port.jpg" />
  	<meta property="og:url" content="https://sxres.dev" />
</svelte:head>

{@render children()}
