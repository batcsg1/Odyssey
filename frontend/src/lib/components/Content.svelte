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
    font-weight: 600;
    font-size: 2.8em;
    color: rgb(2, 227, 2);
    padding: 0em 0.6em 0em 0.6em;
    border-bottom: 0.05em dashed #333;
    text-align: center;
  }

  :global(p) {
    color: white;
    text-align: center;
    max-width: 40em;
  }

  :global(button) {
    padding: 0.4em 1em 0.4em 1em;
    margin-top: 1.5em;
    font-size: medium;
    background-color: black;
    border: 3px solid rgb(2, 227, 2);
    transition: 0.3s ease;
  }

  :global(a) {
    color: rgb(2, 227, 2);
  }

  :global(button:hover) {
    transition: 0.3s ease;
    background-color: rgb(2, 227, 2);
    transform: scale(1.1);
    box-shadow: 5px 5px 0px black;
  }

  :global(button:hover a) {
    color: #333;
  }
  :global(img) {
    margin-bottom: 1em;
    border: 0.1em dashed #333;
  }
</style>
