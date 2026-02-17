<script>
  import Content from "$lib/components/Content.svelte";
  import Voyager_Saturn from "$lib/GIFs/Voyager_Saturn_encounter_animation.gif";
  import Horizon from "$lib/Images/horizon.jpg"
</script>

<main style="--bg-url: url({Horizon})">
  <Content>
    <img src={Voyager_Saturn} alt="img" height="250" />

    <h2>Go to Infinity and Beyond!</h2>
    <p>
      Welcome to your one-stop shop for all the information about our solar
      system and the wider cosmos. Discover and/or contribute to the latest
      information about all the fascinating entities that reside throughout the
      universe, such as red supergiant stars, spiral shaped galaxies,
      exoplanets, red dwarfs any many more.
    </p>
    <button>
      <a href="/the-universe">Explore ▶</a>
    </button>
  </Content>
</main>

<style>
  main {
    background-image: var(--bg-url);
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

