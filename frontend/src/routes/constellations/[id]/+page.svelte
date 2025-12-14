<script>
  import { page } from "$app/state";

  const constellationId = page.params.id;

  // Retrieve data passed to the constellation page
  let { data } = $props();
  const { constellations } = data;

  // Retrieve the list of constellations
  const list = constellations.data;
  console.log(list);

  // Find the constellation with the matching ID
  const constellation = $derived(list.find((constellation) => constellation.id === constellationId));
</script>

<article>
{#if constellation}
  <h1>{constellation.name}</h1>
  <p>Shape: {constellation.shape}</p>
  <p>Area: {constellation.area}</p>
  <p>Abbreviation: {constellation.abbreviation}</p>
{:else}
  <p>Constellation not found</p>
{/if}
</article>

<style>
    article {
    background-color: white;
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px #66aaff;
    padding: 1em;
    overflow-x: auto;
  }
</style>
