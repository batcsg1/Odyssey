<script>
  let { data } = $props();

  const { intro, blurb } = data;
  
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";

  import { page } from "$app/stores";
  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");

  console.log(location);
</script>

<main>
  <header>
    <Header {location} />
  </header>
  <article>
    {#each [intro, blurb] as section}
      <Section header={section.header} text={section.text}></Section>
    {/each}
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

   article {
    background-color: rgba(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    padding: 3em;
    gap: 2.2em;
  }
</style>
