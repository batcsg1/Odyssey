<script>
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";
  import Fetch from "$lib/components/Fetch.svelte";
  import { page } from "$app/stores";
  import FetchError from "$lib/components/FetchError.svelte";
  import Table from "$lib/components/Table.svelte";

  let { data } = $props();
  const { intro, blurb, constellations, error } = data;

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");

  let query = $state("");

  let filteredConstellations = $state(constellations ?? {});

  // Watch query changes
  $effect(() => {
    if (!query) {
      // Show all by default
      filteredConstellations = {
        data: constellations?.data || [],
        count: constellations?.count || 0,
      };
      return;
    }

    fetchSuggestions(query);
  });

  async function fetchSuggestions(searchTerm) {
    try {
      const res = await fetch(
        `/api/constellations?name=${encodeURIComponent(searchTerm)}`,
      );
      const json = await res.json();
      if (!res.ok) return;
      filteredConstellations = { data: json.data, count: json.count };
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
    <section id="intro-blurb">
      {#each [intro, blurb] as section}
        <Section header={section.header} text={section.text}></Section>
      {/each}
    </section>

    <Table>
      <h3>VIEW CONSTELLATIONS</h3>
      <div id="search-container">
        <input
          type="text"
          placeholder="Search constellations..."
          bind:value={query}
        />
      </div>
      {#if constellations?.data}
        <Fetch
          {location}
          items={filteredConstellations.data}
          count={filteredConstellations.count}
          columns={[
            { key: "name", label: "Name" },
            { key: "shape", label: "Shape" },
            { key: "area", label: "Area (sq. deg.)" },
            { key: "abbreviation", label: "Abbreviation" },
          ]}
        />
      {:else}
        <FetchError {error} />
      {/if}
    </Table>
  </article>
</main>

<style>
  /* Search input styling */
  #search-container {
    margin: 1em 0;
    text-align: center;
  }
  #search-container input {
    padding: 0.5em 1em;
    width: 60%;
    max-width: 30em;
    border-radius: 0.3em;
    border: 0.1em solid #66aaff;
    background-color: #0b1a2b;
    color: white;
    font-size: 1em;
  }
  #search-container input::placeholder {
    color: #ccc;
  }
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

  h3 {
    font-weight: bold;
    padding: 1em 0em 0.3em 0em;
    border-bottom: #66aaff 0.1em solid;
    text-align: center;
    margin-inline: 8em;
  }

  article {
    background-color: rgba(0, 0, 0);
    display: flex;
    flex-direction: column;
    color: white;
    padding: 3em;
    gap: 2.2em;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 2.2em;
    max-width: 50em;
  }

  #intro-blurb {
    align-self: center;
    max-width: 70em;
  }
</style>
