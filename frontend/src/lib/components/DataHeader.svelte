<script>
    let { item } = $props();
</script>

<header>
  <h1>{item ? item.name : "404 Not Found"}</h1>
</header>

<style>
    h1 {
        color: white;
        font-weight: bolder;
        text-align: center;
        padding: 0.5em;
    }

</style>