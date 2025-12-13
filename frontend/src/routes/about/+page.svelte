<script>
  import { page } from "$app/stores";
  import Header from "$lib/components/Header.svelte";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");

  console.log(location);
</script>
<main>
  <header>
      <Header {location} />
  </header>
  <article id="about">
    <section id="mission">
      <h2>MISSION</h2>
      <p>
        <strong>Odyssey</strong> is all about making information about our solar
        system and outer space publically accessible and contributable. And
        quite simply, it is a website where you can go to
        <strong>infinity and beyond!</strong>
      </p>
    </section>

    <section id="history">
      <h2>HISTORY</h2>
      <p>
        <strong>Odyssey</strong> was founded by
        <strong>Samuel Batchelor</strong>, as an accumulation of his child-hood
        passion for astronomy and love for all things tech-related. Whilst
        studying full-time at the Bachelor of Information Technology at Otago
        Polytechnic, he sought a golden opportunity to further fufil his
        interest in astronomy. The golden opportunity was to build a website
        devoted entirely to space, and a platform where users can easily find
        out about our solar system and outer space.
      </p>
    </section>
  </article>
</main>

<style>
  h2 {
    font-weight: bold;
    padding: 0em 0em 0.3em 0em;
    border-bottom: #66aaff 0.1em solid;
  }

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
    padding: 2em 2em 2em 2em;
    border: white 0.1em solid;
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px white;
  }

  #about section p {
    max-width: 50em;
    line-height: 1.7em;
  }
</style>
