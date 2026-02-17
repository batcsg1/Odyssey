<script>
  let { children, bgUrl = "" } = $props();
</script>

<div class="content-wrapper" style="--bg-url: url({bgUrl})">
  {@render children?.()}
</div>

<style>
  .content-wrapper {
    display: flex;
    flex-direction: column;
    background-image: var(--bg-url);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .content-wrapper :global(main) {
    background-color: rgba(0, 0, 0, 0.6);

    padding: 2em;
  }
  .content-wrapper :global(h1),
  .content-wrapper :global(h2),
  .content-wrapper :global(h3) {
    align-self: flex-start; /* Ensure the box itself stays left */
  }
  .content-wrapper :global(h1) {
    font-weight: 600;
    font-size: 3em;
    color: white;
    background: -webkit-linear-gradient(#ffffff, #c0bcbc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .content-wrapper :global(h2) {
    font-weight: 400;
    font-size: 2.8em;
    color: white;
    border-bottom: 0.05em dashed white;
    background: -webkit-linear-gradient(#ffffff, #c0bcbc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .content-wrapper :global(h3) {
    font-weight: 400;
    font-size: 2em;
    color: white;
    border-bottom: 0.05em dashed white;
    text-align: center;
    background: -webkit-linear-gradient(#ffffff, #c0bcbc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .content-wrapper :global(header) {
    background-color: black;
    color: white;
    display: flex;
    margin-left: 2em;
  }

  .content-wrapper :global(p) {
    color: #c0bcbc;
    max-width: 40em;
  }

  .content-wrapper :global(button) {
    padding: 0.4em 1em 0.4em 1em;
    margin-top: 1.5em;
    font-size: medium;
    background-color: black;
    border: 3px solid white;
    transition: 0.3s ease;
    max-width: 10em;
    align-self: center;
  }

  .content-wrapper :global(a) {
    color: white;
  }

  .content-wrapper :global(button:hover) {
    transition: 0.3s ease;
    background-color: white;
    transform: scale(1.1);
    box-shadow: 5px 5px 0px black;
  }

  .content-wrapper :global(button:hover a) {
    color: #333;
  }
  .content-wrapper :global(img) {
    box-shadow: 2px 2px 2em rgb(30, 15, 53);
    align-self: center;
  }
</style>
