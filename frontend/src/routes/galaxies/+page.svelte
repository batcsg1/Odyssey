<script>
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";
  import Fetch from "$lib/components/Fetch.svelte";
  import { page } from "$app/stores";
  import FetchError from "$lib/components/FetchError.svelte";
  import Table from "$lib/components/Table.svelte";
  import TableWrapper from "$lib/components/TableWrapper.svelte";
  import Search from "$lib/components/Search.svelte";
  import IntroSection from "$lib/components/IntroSection.svelte";
  import GalaxyTable from "$lib/components/tables/GalaxyTable.svelte";

  let { data } = $props();
  const { intro, blurb, galaxies, constellationMap, error } = data;

  let currentPath = $derived($page.url.pathname);
  let location = $derived(currentPath.replace("/", ""));

  let query = $state("");

  let filteredGalaxies = $state({ ...galaxies });

  // Watch query changes
  $effect(() => {
    if (!query) {
      // Show all by default
      filteredGalaxies = galaxies;
      return;
    }

    fetchSuggestions(query);
  });

  async function fetchSuggestions(searchTerm) {
    try {
      const res = await fetch(
        `/api/galaxies?name=${encodeURIComponent(searchTerm)}`,
      );
      const json = await res.json();
      console.log(json);
      if (!res.ok) return;
      filteredGalaxies = {
        data: json.data ?? [],
        count: json.data.length,
      };
    } catch (err) {
      console.error(err);
    }
  }
</script>

<main>
  <header>
    <Header {location} />
  </header>

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
