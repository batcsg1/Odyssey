<script>
  import { page } from "$app/stores";
    //Import current user data
  let user = $state($page.data.user);
  let authorized = $derived(user != null && user.role === "SUPER_ADMIN");
  
  import NoImage from "$lib/components/NoImage.svelte";
  import Json from "$lib/components/Json.svelte";
  let { children, data, error } = $props();
</script>

<div id="form-container">
  {#if data}
    <form method="POST" action="?/update">
      {@render children?.()}
    </form>

    <form method="POST" enctype="multipart/form-data" action="?/upload">
      <div class="group">
        <label for="file">Upload your file</label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png, .webp"
          required
        />
      </div>

      {#if authorized}
        <button type="submit">Submit</button>
      {/if}

      {#if data.imagePath}
        <img src={data.imagePath} alt={data.imagePath} height="500" />
      {:else}
        <NoImage />
      {/if}
    </form>
  {/if}

  <Json object={data} {error} />
</div>

<style>
  #form-container {
    display: flex;
    margin-bottom: 2em;
    max-width: 90em;
    width: 100%; /* IMPORTANT */
    align-self: center;
    padding: 1em;
    gap: 1em;
    overflow-x: auto; /* ENABLE horizontal scrolling */
  }
  /* For Chrome, Edge, and Safari */
  #form-container::-webkit-scrollbar {
    height: 1em;
  }

  #form-container::-webkit-scrollbar-track {
    background: #0b0f1a; /* track (background) */
    border-radius: 10px;
  }

  #form-container::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #f4f2f5, #777779); /* thumb color */
    border-radius: 10px;
    border: 1px solid #0b0f1a; /* adds subtle outline */
  }

  #form-container::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #796e7f, #2c2c44); /* thumb color */
  }

  :global(form) {
    background: #000000;
    background: linear-gradient(
      180deg,
      rgb(10, 17, 21) 5%,
      rgb(35, 37, 39) 71%,
      rgb(89, 89, 89) 100%
    );
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 3em rgb(31, 51, 66);
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    color: white;
  }

  :global(h3) {
    font-weight: bold;
    padding: 0em 0em 0.3em 0em;
    border-bottom: #66aaff 0.1em solid;
    text-align: center;
    color: white;
    max-width: 30em;
    margin-bottom: 1em;
  }

  :global(label) {
    font-weight: bold;
    color: white;
  }
  :global(input) {
    background-color: #181a1c;
    padding: 0.5em;
    border: 1px dashed gray;
    border-radius: 0.3em;
    font-size: 1em;
    color: white;
  }
  :global(input[readonly]) {
    background-color: #313739;
    cursor: not-allowed;
    color: gray;
  }

  :global(button) {
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 0.5em;
    background-color: #66aaff;
    color: white;
    border: none;
    border-radius: 0.3em;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
  }

  :global(button:hover) {
    background-color: #eed755;
    transition: 0.3s ease;
    transform: scale(1.1);
  }

  @media (width <= 820px) {
    #form-container {
      flex-direction: column;
    }

    :global(form) {
      min-width: 300px;
    }
  }

  @media (width <= 500px) {
    #form-container {
      width: 90%;
    }
  }
</style>
