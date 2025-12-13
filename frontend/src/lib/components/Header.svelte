<script>
    let { location = $bindable("") } = $props();
</script>

<section>
  <p>Home &gt; <strong>{location.charAt(0).toUpperCase() + location.slice(1)} &gt;</strong></p>
  <h1>{location.toUpperCase()}</h1>
</section>

<style>
  h1 {
    max-width: fit-content;
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
</style>
