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
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
  }
  #intro {
    background-color: gainsboro;
    height: 60em;
    background-image: url(../lib/GIFs/Voyager_Saturn_encounter_animation.gif);
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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
  }
  #intro section *{
    text-shadow: 5px 5px 1px black;
  }
</style>
