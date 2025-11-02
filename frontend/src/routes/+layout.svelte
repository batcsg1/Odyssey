<script>
	import "../app.css";
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<Nav/>
{@render children()}

<style>
	:global(body) {
		font-family: 'Google Sans Code', monospace;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
	}
	:global(button, a) {
		font-family: 'Google Sans Code', monospace;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;
	}
</style>