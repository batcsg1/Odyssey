<script>
  let { error, success = "" } = $props();
</script>

{#if error}
  <p id="error">{error}</p>
{:else if success}
  <p>Update successfull!</p>
{/if}

<style>
  #error {
    background-color: red;
  }

  p {
    background-color: rgb(9, 108, 2);
    text-align: center;
    color: white;
    padding: 0.8em 0em 0.8em 0em;
    border-radius: 0.3em;
    font-weight: bold;
    margin-top: 1em;
  }
</style>
