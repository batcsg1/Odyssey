<script>
  import { page } from "$app/stores";
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");

  console.log(location);

  let mission = {
    header: "MISSION",
    text: `Odyssey is all about making information about our solar
        system and outer space publically accessible and contributable. And
        quite simply, it is a website where you can go to
        infinity and beyond!`,
  };

  let history = {
    header: "HISTORY",
    text: `Odyssey was founded by
        Samuel Batchelor, as an accumulation of his child-hood
        passion for astronomy and love for all things tech-related. Whilst
        studying full-time at the Bachelor of Information Technology at Otago
        Polytechnic, he sought a golden opportunity to further fufil his
        interest in astronomy. The golden opportunity was to build a website
        devoted entirely to space, and a platform where users can easily find
        out about our solar system and outer space.`,
  };
</script>
<main>
  <header>
      <Header {location} />
  </header>
  <article id="about">
    <Section header={mission.header} text={mission.text}></Section>
    <Section header={history.header} text={history.text}></Section>
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
</style>
