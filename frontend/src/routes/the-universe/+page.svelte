<script>
  let { data } = $props();
  const { solar_system, cards } = data;

  import { page } from "$app/stores";
  import Content from "$lib/components/Content.svelte";
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "").replace("-", " ");

  console.log(location);

</script>

<Header {location} />

<Content>
  <img src="https://img.artpal.com/234071/10-20-5-9-13-22-24m.jpg" alt="img"width="30%" />
  <h2>What is the Universe?</h2>
  <p>
    <strong>The Universe</strong>, also known as the <strong>Observable Universe</strong>, is <strong>everything</strong> that exists, from the smallest particles to the largest galaxies. It encompasses all of space, time, matter, and energy. The Universe is vast and constantly expanding, with billions of galaxies, each containing billions of stars and planets. It is a complex and mysterious place that scientists continue to explore and study to understand its origins, structure, and ultimate fate.
  </p>

  <p>
    The Universe is believed to have originated from a singularity, a point of infinite density and temperature, around 13.8 billion years ago in an event known as the Big Bang. Since then, it has been expanding and evolving, giving rise to the formation of galaxies, stars, planets, and eventually life on Earth. The Universe is governed by fundamental forces such as gravity, electromagnetism, and nuclear forces, which shape its structure and behavior. It is a source of wonder and fascination for scientists and philosophers alike, as we continue to unravel its mysteries and explore our place within it.
  </p>
  
  <img src="https://assets.science.nasa.gov/dynamicimage/assets/science/astro/exo-explore/internal_resources/1763/image_of_nebula_W51.jpeg?w=1600&h=900&fit=clip&crop=faces%2Cfocalpoint" alt="W51 Nebula" width="80%" />
</Content>

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

<style>
  h3 {
    font-weight: 600;
    font-size: 2.8em;
    color: rgb(2, 227, 2);
    padding: 0em 0.6em 0em 0.6em;
    border-bottom: 0.05em dashed #333;
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
