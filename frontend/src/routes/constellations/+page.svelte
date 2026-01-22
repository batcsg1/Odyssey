<script>
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";
  import Fetch from "$lib/components/Fetch.svelte";
  import { page } from "$app/stores";
  import FetchError from "$lib/components/FetchError.svelte";
  import Table from "$lib/components/Table.svelte";
  import TableWrapper from "$lib/components/TableWrapper.svelte";

  let { data } = $props();
  const { intro, blurb, constellations, error } = data;

  let currentPath = $derived($page.url.pathname);
  let location = $derived(currentPath.replace("/", ""));
  
  let query = $state("");

  let filteredConstellations = $state({ ...constellations });

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
      console.log(json);
      if (!res.ok) return;
      filteredConstellations = {
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
    <section id="intro-blurb">
      {#each [intro, blurb] as section}
        <Section header={section.header} text={section.text}></Section>
      {/each}
    </section>

    <figure id="image-section">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/36/Orion_tjt.jpg"
        alt="The constellation Orion with Betelgeuse and the Orion Nebula"
        width="400"
      />

      <figcaption>
        <section>
          <h3>Orion</h3>
          <p>
            The constellation Orion, with Betelgeuse the reddish star at the top
            left. Also visible are Barnard’s Loop and the Orion Nebula (M42).
          </p>

          <small class="credit">
            Image credit:
            <a
              href="https://commons.wikimedia.org/wiki/File:Orion_tjt.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikimedia Commons
            </a>
            · © T. TheStarmon &mdash; licensed under
            <a
              href="https://creativecommons.org/licenses/by-sa/3.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY-SA 3.0
            </a>
          </small>
        </section>
      </figcaption>
    </figure>

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
        <TableWrapper>
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
        </TableWrapper>
      {:else}
        <FetchError {error} />
      {/if}
    </Table>
  </article>
</main>

<style>
  /* ---------- IMAGE FEATURE SECTION ---------- */

  #image-section {
    display: grid;
    grid-template-columns: 420px 1fr;
    gap: 2.5em;
    padding: 2.5em;
    background: linear-gradient(145deg, rgb(10, 17, 21), rgb(17, 32, 38));
    border-radius: 0.6em;
    border: 0.1em solid rgb(31, 51, 66);
    box-shadow: 0 0 3em rgba(102, 170, 255, 0.12);
    align-items: center;
  }

  #image-section img {
    width: 100%;
    height: auto;
    border-radius: 0.4em;
    border: 0.1em solid rgb(31, 51, 66);
    box-shadow: 0 0 1.5em rgba(0, 0, 0, 0.6);
  }

  #image-section figcaption section {
    max-width: none;
    gap: 1.4em;
  }

  #image-section h3 {
    margin: 0;
    padding: 0;
    border: none;
    text-align: left;
    font-size: 1.8em;
    font-weight: bold;
    color: #ffffff;
  }

  #image-section p {
    line-height: 1.6;
    color: #ddd;
  }

  /* ---------- IMAGE CREDIT ---------- */

  .credit {
    margin-top: 1.2em;
    font-size: 0.75em;
    color: #9aa7b2;
  }

  .credit a {
    color: #66aaff;
    text-decoration: none;
  }

  .credit a:hover {
    text-decoration: underline;
  }

  /* ---------- RESPONSIVE ---------- */

  @media (max-width: 900px) {
    #image-section {
      grid-template-columns: 1fr;
      padding: 2em;
    }

    #image-section img {
      max-width: 28em;
      margin-inline: auto;
    }

    #image-section figcaption {
      text-align: center;
    }

    #image-section h3 {
      text-align: center;
    }
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

  /* Enhance the search bar focus */
  #search-container input:focus {
    outline: none;
    border-color: #ffffff;
    box-shadow: 0 0 15px rgba(102, 170, 255, 0.4);
    transition: all 0.3s ease;
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
