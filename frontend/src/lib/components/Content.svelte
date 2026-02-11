<script>
  let { children } = $props();
</script>

<div class="content-wrapper">
  {@render children?.()}
</div>

<style>
  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2.5em;
  }
  :global(h2) {
    font-weight: 400;
    font-size: 2.8em;
    color: white;
    padding: 0em 0.6em 0em 0.6em;
    border-bottom: 0.05em dashed #333;
    text-align: center;
    background: -webkit-linear-gradient(#ffffff, #c0bcbc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  :global(p) {
    color: #c0bcbc;
    max-width: 40em;
    padding: 0.5em;
  }

  :global(button) {
    padding: 0.4em 1em 0.4em 1em;
    margin-top: 1.5em;
    font-size: medium;
    background-color: black;
    border: 3px solid white;
    transition: 0.3s ease;
  }

  :global(a) {
    color: white;
  }

  :global(button:hover) {
    transition: 0.3s ease;
    background-color: white;
    transform: scale(1.1);
    box-shadow: 5px 5px 0px black;
  }

  :global(button:hover a) {
    color: #333;
  }
  :global(img) {
    margin-bottom: 1em;
    box-shadow: 2px 2px 2em rgb(30, 15, 53);
  }
</style>
