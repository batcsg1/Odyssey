<script>
  let { children } = $props();
</script>

<div id="search-container">
  {@render children?.()}
</div>

<style>
  /* Search input styling */
  #search-container {
    text-align: center;
    background-color: yellow;
    margin-bottom: 2em;
  }

  /* Target the input globally within this container */
  #search-container :global(input) {
    padding: 0.5em 1em;
    width: 100%;
    max-width: 30em;
    border-radius: 0.3em;
    border: 0.1em solid white;
    background-color: #161616;
    color: white;
    font-size: 1em;
  }

  #search-container :global(input:focus) {
    outline: none;
    border-color: #ffffff;
    box-shadow: 0 0 15px #333;
    transition: all 0.3s ease;
  }

  #search-container :global(input::placeholder) {
    color: #ccc;
  }
</style>
