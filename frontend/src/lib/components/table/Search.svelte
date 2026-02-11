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
    margin-bottom: 2em;
  }

  /* Target the input globally within this container */
  #search-container :global(input) {
    padding: 0.5em 1em;
    width: 100%;
    max-width: 30em;
    border-radius: 1em;
    border: 0.02em solid rgb(210, 206, 206);
    background-color: white;
    color: #333;
    font-size: 1em;
    
  }

  #search-container :global(input:focus) {
    outline: none;
    border-color: #ffffff;
    box-shadow: 0 0 0.8em #333;
    transition: all 0.3s ease;
  }

  #search-container :global(input::placeholder) {
    color: #333;
    opacity: 0.7;
  }
</style>
