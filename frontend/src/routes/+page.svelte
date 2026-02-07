<script>
  import Voyager_Saturn from "$lib/GIFs/Voyager_Saturn_encounter_animation.gif"
</script>

<main>
  <section class="page-sections" id="intro">
    <section>
      <img src={Voyager_Saturn} alt="img" height=250>
      <h2>Go to Infinity and Beyond!</h2>
      <p>
        Welcome to your one-stop shop for all the information about our solar
        system and the wider cosmos. Discover and/or contribute to the latest
        information about all the fascinating entities that reside throughout
        the universe, such as red supergiant stars, spiral shaped galaxies,
        exoplanets, red dwarfs any many more.
      </p>
      <button>
        <a href="/the-universe">Explore ▶</a>
      </button>
    </section>
  </section>
</main>

<style>
  img{
    margin-bottom: 1em;
    border: 0.1em dashed #333;
  }
  h2 {
    font-weight: 600;
    font-size: 2.8em;
    color: rgb(2, 227, 2);
    padding: 0em 0.6em 0em 0.6em;
    border-bottom: 0.05em dashed #333;
  }
  .page-sections {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .page-sections section {
    padding: 4em 3.5em 4em 3.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .page-sections p {
    color: white;
    max-width: 50em;
    text-align: center;
    padding: 0.8em;
  }

  button {
    padding: 0.4em 1em 0.4em 1em;
    margin-top: 1.5em;
    font-size: medium;
    background-color: black;
    border: 3px solid rgb(2, 227, 2);
    transition: 0.3s ease;
  }

  a {
    color: rgb(2, 227, 2);
  }

  button:hover {
    transition: 0.3s ease;
    background-color: rgb(2, 227, 2);
    transform: scale(1.1);
    box-shadow: 5px 5px 0px black;
  }

  button:hover a {
    color: #333;
  }

 
</style>
