<script>
</script>

<main>
  <section id="intro">
    <section>
      <h1>GO TO INFINITY AND BEYOND</h1>
      <p>
        Welcome to your one-stop shop for all the information about our solar
        system and the wider cosmos.
      </p>
    </section>
  </section>
  <section id="sol-sys">
    <section>
      <h1>THE SOLAR SYSTEM</h1>
      <p>
        Discover and contribute to the latest information about our Solar System.
      </p>
      <button>
        <a href="/solar-system">EXPLORE ▶</a>
      </button>
    </section>  
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
  #intro, #sol-sys{
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
  #intro section {
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
  #intro section * {
    text-shadow: 5px 5px 1px black;
  }

  #sol-sys {
    background-image: url(../lib/GIFs/jupiter.gif);
    background-repeat: no-repeat;
    background-size: cover;
  }
  #sol-sys section {
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
