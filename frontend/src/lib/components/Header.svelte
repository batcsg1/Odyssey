<script>
    let { location = $bindable("") } = $props();
</script>

<section>
  <p>Home &gt; <strong>{location.charAt(0).toUpperCase() + location.slice(1)} &gt;</strong></p>
  <h1>{location.toUpperCase()}</h1>
</section>

<style>
  section{
    background: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 75%,
    rgba(0, 0, 0, 0) 100%
  );
    padding: 4em 1em 2em 1em;
  }

  h1 {
    max-width: 100%;
    word-wrap: break-word;
    white-space: normal;         /* allow wrapping */
    letter-spacing: 0.1em;
    color: white;
    box-shadow: 5px 5px 0px 0px white;
    border-radius: 10px;
    z-index: 2;
    font-weight: bolder;
    padding: 0.2em 0.4em 0.2em 0.4em;
  }

  p {
    padding: 1em 0.5em 0em 0.5em;
  }

  @media (width <= 500){
    section{
      overflow-x: auto;
    }
  }
</style>
