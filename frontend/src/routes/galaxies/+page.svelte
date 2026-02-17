<script>
  import Header from "$lib/components/Header.svelte";
  import GalaxyTable from "$lib/components/tables/GalaxyTable.svelte";
  import IntroSection from "$lib/components/IntroSection.svelte";
  import Content from "$lib/components/Content.svelte";
  let { data } = $props();
  const { galaxies, error } = data;
  import Orion from "$lib/Images/orion.jpg"
</script>

<main>
  <Header/>

  <Content>
    <header>
      <h1>Galaxies</h1>
    </header>
    <main>
    <h2>What are Galaxies?</h2>
    <p>
      Galaxies are vast collections of stars, gas, dust, and dark matter bound together by gravity. They come in various shapes and sizes, from spiral galaxies like our own Milky Way to elliptical and irregular galaxies. Studying galaxies helps us understand the formation and evolution of the universe, as well as the processes that govern star formation and cosmic phenomena. Dive in to explore the wonders of galaxies!
    </p>
    </main>
  </Content>
  <GalaxyTable {galaxies} {error}/>
</main>

<style>
</style>
