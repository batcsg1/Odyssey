<script>
  let { data } = $props();
  const { mission, history } = data;

  import { page } from "$app/stores";
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");

  console.log(location);  
</script>
<main>
  <header>
      <Header {location} />
  </header>
  <article id="about">
    <section>
    <Section header={mission.header} text={mission.text}></Section>
    <Section header={history.header} text={history.text}></Section>
    </section>
  </article>
</main>

<style>
  header {
    position: relative;
    color: white;
    background-image: url(../../lib/Images/earth_horizon.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 20em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  #about {
    background-color: rgba(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    padding: 3em;
    gap: 2.2em;
  }

  #about section {
    display: flex;
    flex-direction: column;
    gap: 2.2em;
    max-width: 50em;
  }
</style>
