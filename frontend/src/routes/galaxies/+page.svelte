<script>
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";
  import Fetch from "$lib/components/Fetch.svelte";
  import { page } from "$app/stores";

  let { data } = $props();
  const { intro, blurb, galaxies, constellationMap } = data;

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");
</script>

<main>
  <header>
    <Header {location} />
  </header>

  <article>
    <section id=intro-blurb>
      {#each [intro, blurb] as section}
        <Section header={section.header} text={section.text}></Section>
      {/each}
    </section>

    <section id="galaxies-table">
      <h3>VIEW GALAXIES</h3>
      <Fetch
        {location}
        items={galaxies.data}
        count={galaxies.count}
        columns={[
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "distance", label: "Distance (million light years)" },
          { key: "size", label: "Size (light years)" },
          { key: "brightness", label: "Brightness (apparent magnitude)" },
          { key: "constellationId", label: "Constellation" },
        ]}
        maps={{
          constellationId: constellationMap,
        }}
      />
    </section>
  </article>
</main>

<style>
  #galaxies-table {
    overflow-x: auto;
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px #66aaff;
    background-color: #131212;
    padding: 1em;
    align-self: center;
    max-width: 80em;
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
