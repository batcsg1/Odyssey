<script>
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";
  import ConstellationTable from "$lib/components/tables/ConstellationTable.svelte";
  import IntroSection from "$lib/components/IntroSection.svelte";
  import Content from "$lib/components/Content.svelte";

  let { data } = $props();
  const { constellations, error } = data;

  let currentPath = $derived($page.url.pathname);
  let location = $derived(currentPath.replace("/", ""));
</script>

<Header {location} />

<Content>
  <img
    src="https://i0.wp.com/astronomicca.com/wp-content/uploads/2023/10/alexander-andrews-fsH1KjbdjE8-unsplash-edited.jpg?resize=640%2C1002&ssl=1"
    alt="Orion-Nebula"
    width="30%"
  />
  <h2>What are Constellations?</h2>
  <p>
    Constellations are patterns of stars that have been identified and named by
    various cultures throughout history. They often represent mythological
    figures, animals, or objects and have been used for navigation,
    storytelling, and as a way to organize the night sky. There are 88
    officially recognized constellations, each with its own unique set of stars
    and stories.
  </p>
</Content>

<ConstellationTable {constellations} {error} {location} />

<style>
</style>
