<script>
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";
  import GalaxyTable from "$lib/components/tables/GalaxyTable.svelte";
  import IntroSection from "$lib/components/IntroSection.svelte";

  let { data } = $props();
  const { intro, blurb, galaxies, constellationMap, error } = data;

  let currentPath = $derived($page.url.pathname);
  let location = $derived(currentPath.replace("/", ""));

  let query = $state("");
</script>

<main>
  <Header/>

  <article>
    <IntroSection {intro} {blurb} />

    <GalaxyTable {galaxies} {constellationMap} {error} {location} />
  </article>
</main>

<style>
  header {
    position: relative;
    color: white;
    background-image: url(../../lib/Images/constellation.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 20em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  article {
    background-color: rgba(0, 0, 0);
    display: flex;
    flex-direction: column;
    color: white;
    padding: 3em;
    gap: 2.2em;
  }
</style>
