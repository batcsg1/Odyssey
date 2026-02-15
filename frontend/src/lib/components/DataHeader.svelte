<script>
  let { item } = $props();
</script>

<header>
  <h1>{item ? item.name : "404 Not Found"}</h1>
</header>

<style>
  h1 {
    font-weight: 400;
    font-size: 2.8em;
    color: white;
    padding: 1em 0em 1em 0em;
    text-align: center;
  }
</style>
