<script>
  let { data } = $props();
  const { solar_system, cards } = data;

  import { page } from "$app/stores";
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "").replace("-", " ");

  console.log(location);
</script>

<main>
  <header>
    <Header {location} />
  </header>

  <section id="intro">
    {#each solar_system as info}
      <Section header={info.header} text={info.description}></Section>
    {/each}
  </section>

  <article id="evolution">
    <h3>Evoloution of the Universe</h3>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6f/CMB_Timeline300_no_WMAP.jpg"
      alt="universe"
      width="800"
    />
  </article>

  <article
    id="contents"
    class="d-flex flex-wrap justify-content-center gap-3 p-3 overflow-auto"
  >
    <h3>Bodies of the Universe</h3>
    <section id="cards" class="d-flex flex-wrap justify-content-center gap-3">
      {#each cards as card}
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{card.title}</h5>
            <p class="card-text">{card.text}</p>
            <a href={card.url} class="card-link">Learn More</a>
          </div>
        </div>
      {/each}
    </section>
  </article>
</main>

<style>
  header {
    position: relative;
    color: white;
    background-image: url(../../lib/Images/solsys.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 20em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  h2 {
    color: white;
    font-weight: bold;
    text-align: center;
  }

  #evolution {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3em;
  }

  #evolution img {
    margin-bottom: 2em;
  }

  h3 {
    font-weight: 1000;
    text-align: center;
    /* Apply gradient to text */
    background: linear-gradient(180deg, #ffffff 0%, #3fbbff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
  }
  #intro {
    display: flex;
    flex-direction: column;
    color: white;
    padding: 3em;
    gap: 2.2em;
    max-width: 50em;
    align-self: center;
  }

  .card {
    box-shadow: 0.5em 0.5em 0px white;
  }

  #cards {
    padding: 1em;
    border-radius: 0.5em;
  }
  .card {
    color: white;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7),
      /* more transparent at top */ rgba(0, 0, 0, 0.8)
    );
    border: 0.1em solid white;
    box-shadow: 0.1em 0.1em 3em rgb(24, 90, 144);
  }
  .card-title {
    text-transform: uppercase;
    font-weight: bold;
  }
  .card-link {
    color: #66aaff;
    font-weight: bold;
    border: 0.1em solid #66aaff;
    border-radius: 0.3em;
    padding: 0.2em 0.5em 0.2em 0.5em;
    transition: ease 0.3s;
  }
  .card-link:hover {
    background-color: white;
    color: #66aaff;
    transition: ease 0.3s;
  }

  #contents {
    border-radius: 0.3em;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    padding: 3em;
    height: 35vh;
    overflow-y: auto;
    max-width: 70em;
    align-self: center;
  }

  /* For Chrome, Edge, and Safari */
  #contents::-webkit-scrollbar {
    width: 8px; /* scrollbar width */
  }

  #contents::-webkit-scrollbar-track {
    background: #0b0f1a; /* track (background) */
    border-radius: 10px;
  }

  #contents::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #223a77, #3a66ff); /* thumb color */
    border-radius: 10px;
    border: 1px solid #0b0f1a; /* adds subtle outline */
  }

  #contents::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgb(18, 39, 117), #66aaff);
  }
</style>
