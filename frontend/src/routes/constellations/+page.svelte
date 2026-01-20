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

  let filteredConstellations = $state({});

  // Watch query changes
  $effect(() => {
    if (!query) {
      // Show all by default
      filteredConstellations = constellations;
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
      filteredConstellations = json;
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
      {#if constellations?.data}
        <div id="search-container">
          <input
            type="text"
            placeholder="Search constellations..."
            bind:value={query}
          />
        </div>
        <div class="table-wrapper">
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
        </div>
      {:else}
        <FetchError {error} />
      {/if}
    </Table>
  </article>
</main>

<style>
  .table-wrapper {
    max-height: 500px; /* fixed height */
    min-height: 500px; /* optional: ensures table area is always visible */
    overflow-y: auto; /* scroll if content exceeds height */
    border: 0.1em solid #66aaff; /* optional: nice border */
    border-radius: 0.3em;
    padding: 0.5em;
    background-color: #131212; /* match your table background */
  }
  /* For Chrome, Edge, and Safari */
  .table-wrapper::-webkit-scrollbar {
    width: 1em; /* scrollbar width */
  }

  .table-wrapper::-webkit-scrollbar-track {
    background: #0b0f1a; /* track (background) */
    border-radius: 10px;
  }

  .table-wrapper::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #223a77, #3a66ff); /* thumb color */
    border-radius: 10px;
    border: 1px solid #0b0f1a; /* adds subtle outline */
  }

  .table-wrapper::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgb(18, 39, 117), #66aaff);
  }

  /* Search input styling */
  #search-container {
    padding: 2em;
    text-align: center;
  }
  #search-container input {
    padding: 0.5em 1em;
    width: 100%;
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
