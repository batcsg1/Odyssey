<script>
  import Header from "$lib/components/Header.svelte";
  import StarTable from "$lib/components/tables/StarTable.svelte";
  import IntroSection from "$lib/components/IntroSection.svelte";
  import Content from "$lib/components/Content.svelte";
  let { data } = $props();
  const { stars, error } = data;
  import Orion from "$lib/Images/orion.jpg"
</script>

<main>
  <Header/>

  <Content>
    <header>
      <h1>Stars</h1>
    </header>
    <main>
    <h2>What are Stars?</h2>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit officiis aliquid odio velit nostrum iste ipsum libero cumque doloribus autem, dicta distinctio. Culpa voluptas quisquam commodi repellat unde quibusdam a!
    </p>
    </main>
  </Content>
  <StarTable {stars} {error}/>
</main>

<style>
</style>
