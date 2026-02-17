<script>
  let { data } = $props();
  const { cards } = data;

  import Content from "$lib/components/Content.svelte";
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";
  import MilkyWay from "$lib/Images/the-universe-what.jpg";
  import StarryNight from "$lib/Images/the-universe-bodies.jpg";
</script>

<Header />

<Content bgUrl={MilkyWay}>
  <header>
    <h1>The Universe</h1>
  </header>

  <main>
    <h2>What is the Universe?</h2>
    <p>
      <strong>The Universe</strong>, also known as the
      <strong>Observable Universe</strong>, is <strong>everything</strong> that exists,
      from the smallest particles to the largest galaxies. It encompasses all of
      space, time, matter, and energy. The Universe is vast and constantly expanding,
      with billions of galaxies, each containing billions of stars and planets. It
      is a complex and mysterious place that scientists continue to explore and study
      to understand its origins, structure, and ultimate fate.
    </p>

    <p>
      The Universe is believed to have originated from a singularity, a point of
      infinite density and temperature, around 13.8 billion years ago in an
      event known as the Big Bang. Since then, it has been expanding and
      evolving, giving rise to the formation of galaxies, stars, planets, and
      eventually life on Earth. The Universe is governed by fundamental forces
      such as gravity, electromagnetism, and nuclear forces, which shape its
      structure and behavior. It is a source of wonder and fascination for
      scientists and philosophers alike, as we continue to unravel its mysteries
      and explore our place within it.
    </p>
  </main>
</Content>

<Content bgUrl={StarryNight}>
  <main>
    <h2>Bodies of the Universe</h2>
    <p>
      The Universe is filled with a vast array of celestial bodies, each with
      its own unique characteristics and properties. These include stars,
      planets, moons, asteroids, comets, and galaxies. Stars are massive
      luminous spheres of plasma that generate energy through nuclear fusion,
      while planets are smaller celestial bodies that orbit stars and can be
      rocky or gaseous. Moons are natural satellites that orbit planets, and
      asteroids and comets are small rocky or icy bodies that can be found
      throughout the solar system. Galaxies are vast collections of stars, gas,
      dust, and dark matter that are held together by gravity. Each of these
      celestial bodies plays a crucial role in the structure and dynamics of the
      Universe, contributing to its beauty and complexity.
    </p>
  </main>
</Content>
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

<style>
  #cards {
    height: 50vh;
    overflow-y: auto;
    padding: 3em;
  }
  .card {
    color: white;
    background: #0c0711;
    border: 0.1em solid rgb(31, 51, 66);
    box-shadow: 0.5em 0.5em 6em rgb(33, 23, 72);
    border-radius: 0.6em;
    transition: all 0.4s ease;
  }
  .card-title {
    font-weight: bold;
  }
  .card-link {
    color: #676b66;
    font-weight: bold;
    border: 0.1em solid gray;
    border-radius: 0.3em;
    padding: 0.2em 0.5em 0.2em 0.5em;
    transition: ease 0.3s;
  }
  .card-link:hover {
    background-color: #7a767f;
    color: #333;
    transition: ease 0.3s;
  }

  /* 2. The Hover State (Targeting the card directly) */
  .card:hover {
    /* Change background to your blue gradient */
    background: white;

    /* Lift effect (optional but looks great with glow) */
    transform: translateY(-5px);
  }

  .card-text {
    color: gray;
    padding: 0;
  }

  .card:hover .card-text,
  .card:hover .card-title {
    color: #333;
  }

  /*Scrollbar for cards section*/
  /* For Chrome, Edge, and Safari */
  #cards::-webkit-scrollbar {
    width: 0.5em; /* scrollbar width */
  }

  #cards::-webkit-scrollbar-track {
    background: #1e1c22; /* track (background) */
    border-radius: 10px;
  }

  #cards::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 5px;
    border: 1px solid #858689; /* adds subtle outline */
  }

  #cards::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgb(158, 159, 160), #edeeee);
  }
</style>
