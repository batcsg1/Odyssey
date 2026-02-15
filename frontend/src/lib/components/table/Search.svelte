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
    width: clamp(200px, 50%, 400px);
    border-radius: 1em;
    border: 0.02em solid rgb(210, 206, 206);
    background-color: rgb(14, 10, 19);
    color: #ffffff;
    font-size: 1em;
    transition: all 0.3s ease;
  }

  #search-container :global(input:focus) {
    outline: none;
    border-color: #ffffff;
    box-shadow: 0 0 0.8em #aaa2a2;
    background-color: rgb(85, 79, 92);
    transition: all 0.3s ease;
  }

  #search-container :global(input::placeholder) {
    color: white;
    opacity: 0.7;
  }
</style>
