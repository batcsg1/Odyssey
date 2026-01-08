<script>
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Nav from "$lib/components/Nav.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import { page } from "$app/stores";

  const authPages = ["/login", "/register"];

  let currentPath = $derived($page.url.pathname);

  let isPublicPage = $derived(authPages.includes($page.url.pathname));

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{#if isPublicPage}
  {@render children()}
{:else}
  <Nav />
  {@render children()}
  <Footer />
{/if}

<style>
  :global(body) {
    font-family: "Inter", monospace;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  :global(button, a) {
    font-family: "Inter", monospace;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
  }
</style>
