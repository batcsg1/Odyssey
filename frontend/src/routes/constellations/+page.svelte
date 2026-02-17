<script>
  import Header from "$lib/components/Header.svelte";
  import ConstellationTable from "$lib/components/tables/ConstellationTable.svelte";
  import IntroSection from "$lib/components/IntroSection.svelte";
  import Content from "$lib/components/Content.svelte";
  let { data } = $props();
  const { constellations, error } = data;
  import Orion from "$lib/Images/orion.jpg"
</script>

<main>
  <Header/>

  <Content bgUrl={Orion}>
    <header>
      <h1>Constellations</h1>
    </header>
    <main>
    <h2>What are Constellations?</h2>
    <p>
      Constellations are patterns of stars that have been identified and named
      by various cultures throughout history. They often represent mythological
      figures, animals, or objects and have been used for navigation,
      storytelling, and as a way to organize the night sky. There are 88
      officially recognized constellations, each with its own unique set of
      stars and stories.
    </p>
    </main>
  </Content>
  <ConstellationTable {constellations} {error}/>
</main>

<style>
</style>
