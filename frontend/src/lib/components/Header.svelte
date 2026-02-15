<script>
  import { page } from "$app/stores";

  let currentPath = $derived($page.url.pathname);

  let location = $derived(currentPath.replace("/", ""));

  let segments = $derived(currentPath.split("/").filter(Boolean));

  console.log(segments)

  // Page name: eg. "Constellations" or "Galaxies"
  let pageName = $derived(segments[0]);

  console.log(pageName)

  let id = $derived(segments[1] ? segments[1].charAt(0).toUpperCase() + segments[1].slice(1) : null);

  console.log(id)
</script>

<header>
  <p>
    <a href="/" id="home-link">
    Home >
    </a>
    <a href="/{pageName}" id="page-link">
      {pageName.charAt(0).toUpperCase() + pageName.slice(1)}
    </a>
    &gt;
    <strong>{id}</strong>
  </p>
</header>

<style>
  header {
    background: #000000;
background: linear-gradient(180deg, rgb(11, 2, 22) 0%, rgb(7, 7, 14) 50%, #000000 100%);
    margin-bottom: 1em;
    color: white;
    padding: 0.5em;
  }
  
  p {
    padding: 1em 0.5em 0em 0.5em;
  }
  #home-link {
    color: gray;
    font-weight: 200;
  }

  a {
    color: white;
    font-weight: bolder;
    font-size: large;
  }

  @media (width <= 500) {
    header {
      overflow-x: auto;
    }
  }
</style>
