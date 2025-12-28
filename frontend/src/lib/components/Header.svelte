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

<section>
  <p>
    <a href="/{location}">
      {base}
    </a>
    &gt;
    <strong>{id}</strong>
  </p>

  
</section>

<style>
  section {
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1) 75%,
      rgba(0, 0, 0, 0) 100%
    );
    padding: 4em 1em 2em 1em;
  }

  p {
    padding: 1em 0.5em 0em 0.5em;
  }

  p,strong{
    font-size: x-large;
  }

  a {
    color: white;
    font-weight: bolder;
  }

  @media (width <= 500) {
    section {
      overflow-x: auto;
    }
  }
</style>
