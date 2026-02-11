<script>
  import { page } from "$app/stores";

  const segments = $derived($page.url.pathname.split("/").filter(Boolean));
  console.log(segments);
  const location = segments[0];

  const base = location // the base parameter
  .split("-")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  const id = segments[1]; // the id parameter
    console.log(id);
</script>

<header>
  <p>
    <a href="/" id="home-link">
    Home >
    </a>
    <a href="/{location}">
      {base}
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
