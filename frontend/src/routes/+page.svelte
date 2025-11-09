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
      <h2>THE SOLAR SYSTEM</h2>
      <p>
        Discover and/or contribute to the latest information about our Solar System.
      </p>
      <button>
        <a href="/solar-system">EXPLORE ▶</a>
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

  .page-sections section * {
    text-shadow: 2px 2px 1px black;
  }

  #sol-sys {
    background-image: url(../lib/GIFs/jupiter.gif);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .page-sections section {
    padding: 4em 3.5em 4em 3.5em;
    background: repeating-linear-gradient(
      45deg,
      /* Angle of the stripes */ rgba(0, 0, 0, 0.1),
      /* First stripe color with 10% opacity */ rgba(0, 0, 0, 0.1) 10px,
      /* End of the first stripe */ rgba(255, 255, 255, 0.1) 10px,
      /* Start of the second stripe with 10% opacity */ rgba(255, 255, 255, 0.1)
        20px /* End of the second stripe */
    );
    mask-image: linear-gradient(to top, black 80%, transparent 100%);
  }

  .page-sections p {
    background:
            repeating-linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1) 0px,
                rgba(53, 54, 118, 0.1) 2px,
                transparent 2px,
                transparent 6px
            ),
            linear-gradient(
                135deg,
                rgba(0, 20, 60, 0.9),     /* dark navy blue */
                rgba(0, 29, 47, 0.6)     /* softer blue tint */
            );
        color: white;
        padding: 0.9em;
        border: 2px solid gray;
        box-shadow: 3px 3px 3px black;
        text-shadow: 2px 2px 15px black;
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
