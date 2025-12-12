<script>
  export let data;
  const { solar_system } = data;
</script>

<main>
  <header>
    <p>Home &gt; Solar System &gt;</p>
    <h1>THE SOLAR SYSTEM</h1>
  </header>

  <section id="intro">
    {#each solar_system as info}
      <section>
        <h2>{info.header}</h2>
        <p>{info.description}</p>
      </section>
    {/each}
  </section>

  <article
    id="contents"
    class="d-flex flex-wrap justify-content-center gap-3 p-3 overflow-auto"
  >
    <h3>BODIES OF THE SOLAR SYSTEM</h3>
    <section id="cards" class="d-flex flex-wrap justify-content-center gap-3">
      <!-- Card template -->
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Constellations</h5>
          <p class="card-text">
            Descriptions and details about constellations.
          </p>
          <a href="#" class="card-link">Learn More</a>
        </div>
      </div>

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Galaxies</h5>
          <p class="card-text">Descriptions and details about galaxies.</p>
          <a href="#" class="card-link">Learn More</a>
        </div>
      </div>

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Stars</h5>
          <p class="card-text">Descriptions and details about stars.</p>
          <a href="#" class="card-link">Learn More</a>
        </div>
      </div>

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Planets</h5>
          <p class="card-text">Descriptions and details about planets.</p>
          <a href="#" class="card-link">Learn More</a>
        </div>
      </div>

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Satellites</h5>
          <p class="card-text">Descriptions and details about satellites.</p>
          <a href="#" class="card-link">Learn More</a>
        </div>
      </div>

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Comets</h5>
          <p class="card-text">Descriptions and details about comets.</p>
          <a href="#" class="card-link">Learn More</a>
        </div>
      </div>

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Asteroids</h5>
          <p class="card-text">Descriptions and details about asteroids.</p>
          <a href="#" class="card-link">Learn More</a>
        </div>
      </div>

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Meteorites</h5>
          <p class="card-text">Descriptions and details about meteorites.</p>
          <a href="#" class="card-link">Learn More</a>
        </div>
      </div>

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Meteor Showers</h5>
          <p class="card-text">
            Descriptions and details about meteor showers.
          </p>
          <a href="#" class="card-link">Learn More</a>
        </div>
      </div>
    </section>
  </article>
</main>

<style>
  header {
    position: relative;
    color: white;
    padding: 3em;
    background-image: url(../../lib/Images/solsys.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  h1{
    max-width: fit-content;
    letter-spacing: 0.1em;
    color: white;
    box-shadow: 5px 5px 0px 0px white;
    text-shadow: 3px 3px 3px #333;
    z-index: 2;
    font-weight: bolder;
    padding: 0.2em;
  }
  h2 {
    font-weight: bold;
    padding: 0em 0em 0.3em 0em;
    border-bottom: #66aaff 0.1em solid;
  }
  h3 {
    font-weight: bold;
    padding: 0em 0em 0.3em 0em;
    color: white;
    border-bottom: #66aaff 0.1em solid;
  }
  #intro {
    background-color: rgba(0, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    padding: 3em;
    gap: 2.2em;
  }

  #intro section {
    padding: 2em 2em 2em 2em;
    border: white 0.1em solid;
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px white;
  }

  #intro section p {
    max-width: 45em;
    line-height: 1.7em;
  }

  .card,
  #intro section {
    box-shadow: 0.5em 0.5em 0px white;
  }

  #cards {
    padding: 1em;
    background-color: #001427;
    border: 0.1em solid white;
    border-radius: 0.5em;
  }
  .card {
    color: white;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7),
      /* more transparent at top */ rgba(0, 0, 0, 0.8)
    );
    border: 3px solid white;
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
    background-color: black;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
    padding: 3em;
    height: 35vh;
    overflow-y: auto;
    scrollbar-width: thin; /* "auto" | "thin" | "none" */
    scrollbar-color: #000000 #66aaff; /* thumb color | track color */
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
    background: linear-gradient(135deg, rgb(18, 39, 117) 98, 161, #66aaff);
    /* hover effect */
  }
</style>
