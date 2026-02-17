<script>
  import Content from "$lib/components/Content.svelte";
  import Quotes from "$lib/components/Quotes.svelte";
  import Voyager_Saturn from "$lib/GIFs/Voyager_Saturn_encounter_animation.gif";
  import Horizon from "$lib/Images/horizon.jpg";
  import Logo from "$lib/Images/logo-dark.png"
</script>

<div id="image-container">
<img src={Voyager_Saturn} alt="img" height=190 />
<img src={Logo} alt="odyssey" height=100>

<Quotes/>

</div>

<Content bgUrl={Horizon}>
  <main>
    <h1>Welcome to Odyssey!
    </h1>
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
  </main>
</Content>

<style>
  #image-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 150vh;
  }
</style>
