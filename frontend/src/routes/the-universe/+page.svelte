<script>
  let { data } = $props();
  const { solar_system, cards } = data;

  import { page } from "$app/stores";
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "").replace("-", " ");

  console.log(location);

  import SolSys from "$lib/Images/solsys.webp"
</script>

<main>
  <header>
    <Header {location} />
  </header>

  <section id="intro">
     <img src={SolSys} alt="img" >
    {#each solar_system as info}
      <Section header={info.header} text={info.description}></Section>
    {/each}
  </section>

  <article id="evolution">
    <h3>Evoloution of the Universe</h3>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6f/CMB_Timeline300_no_WMAP.jpg"
      alt="universe"
      width="600"
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
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  img{
    margin-bottom: 1em;
    border: 0.1em dashed #333;
  }

  #evolution {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
  }

  #evolution img {
    margin-bottom: 2em;
  }

  h3 {
   font-weight: 600;
    font-size: 2.8em;
    color: rgb(2, 227, 2);
    padding: 0em 0.6em 0em 0.6em;
    border-bottom: 0.05em dashed #333;
  }
  #intro {
    display: flex;
    flex-direction: column;
    color: white;
    padding: 3em;
    gap: 1em;
    max-width: 50em;
    align-self: center;
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
    border: 0.1em solid rgb(31, 66, 38);
    box-shadow: 0.5em 0.5em 6em rgb(34, 66, 31);
    transition: all 0.4s ease;
  }
  .card-title {
    font-weight: bold;
  }
  .card-link {
    color: #0d7c06;
    font-weight: bold;
    border: 0.1em solid #067110;
    border-radius: 0.3em;
    padding: 0.2em 0.5em 0.2em 0.5em;
    transition: ease 0.3s;
  }
  .card-link:hover {
    background-color: white;
    color: #3ad435;
    transition: ease 0.3s;
  }

  /* 2. The Hover State (Targeting the card directly) */
  .card:hover {
    /* Change background to your blue gradient */
    background: linear-gradient(180deg, #1e8a32 0%, #3bf63b 100%);

    /* Make the "box" (border and shadow) white */
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0.5em 0.5em 4em rgba(255, 255, 255, 0.3);

    /* Lift effect (optional but looks great with glow) */
    transform: translateY(-5px);
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
    background: linear-gradient(135deg, #083801, #04a90f); /* thumb color */
    border-radius: 10px;
    border: 1px solid #0b0f1a; /* adds subtle outline */
  }

  #contents::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgb(17, 155, 7), #66aaff);
  }
</style>
