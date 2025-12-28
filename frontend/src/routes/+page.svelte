<script>
</script>

<main>
  <section class="page-sections" id="intro">
    <section>
      <h2>GO TO INFINITY AND BEYOND</h2>
      <p>
        Welcome to your one-stop shop for all the information about our solar
        system and the wider cosmos.
      </p>
    </section>
  </section>

  <section class="page-sections" id="sol-sys">
    <section>
      <h2>EXPLORE THE UNIVERSE</h2>
      <p>
        Discover and/or contribute to the latest information about all the fascinating entities that reside throughout the universe, such as red supergiant stars, spiral shaped galaxies, exoplanets, red dwarfs any many more.
      </p>
      <button>
        <a href="/the-universe">EXPLORE ▶</a>
      </button>
    </section>  
  </section>

  <section class="page-sections" id="interstellar">
    <section>
      <h2>THE INTERSTELLAR</h2>
      <p>Venture beyond our Solar System and explore the latest discoveries out in
         the vast realm of interstellar space.
      </p>
      <button>
        <a href="/interstellar">EXPLORE ▶</a>
      </button>
    </section>
  </section>

  
</main>

<style>
  h2 {
    font-weight: bold;
    font-size: 2.5em;
    padding: 0em 0em 0.2em 0em;
    border-bottom: #66aaff 0.1em solid;
  }
  .page-sections{
    height: 35em;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  #intro {     
    background-image: url(../lib/GIFs/Voyager_Saturn_encounter_animation.gif);
    background-repeat: no-repeat;
    background-size: cover;   
  }

  

  #sol-sys {
    background-image: url(../lib/GIFs/jupiter.gif);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .page-sections section {
    padding: 4em 3.5em 4em 3.5em;
    background-color: rgba(0,0,0,0.7);
    mask-image: linear-gradient(to top, black 95%, transparent 100%);
  }

  .page-sections p {
      color: white;
      padding: 0.9em 0em 0em 0em;
  }

  #interstellar{
    background-image: url(../lib/GIFs/exoplanet.gif);
    background-repeat: no-repeat;
    background-size: cover;
  }

  button {
    padding: 1em 3em 1em 3em;
    margin-top: 1.5em;
    font-size: large;
    background-color: black;
    color: white;
    border: 3px solid white;
    transition: 0.3s ease;
    box-shadow: 3px 3px 0px white;
  }

  a {
    color: white;
  }

  button:hover {
    transition: 0.3s ease;
    background-color: white;
    transform: scale(1.1);
    box-shadow: 5px 5px 0px black;
  }

  button:hover a {
    color: #333;
  }
</style>
