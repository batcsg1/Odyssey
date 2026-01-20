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
      <Fetch
        location={location}
        items={constellations.data}
        count={constellations.count}
        columns={[
          { key: "name", label: "Name" },
          { key: "shape", label: "Shape" },
          { key: "area", label: "Area (sq. deg.)" },
          { key: "abbreviation", label: "Abbreviation" },
        ]}
      />
      {:else}
          <FetchError {error}/>
      {/if}
    </Table>
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
