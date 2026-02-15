<script>
  import { page } from "$app/stores";
  //Import current user data
  let user = $state($page.data.user);
  let authorized = $derived(user != null && user.role === "SUPER_ADMIN");

  import NoImage from "$lib/components/NoImage.svelte";
  import Json from "$lib/components/Json.svelte";
  import Content from "../Content.svelte";
  let { children, data, error } = $props();
</script>

<div id="form-container">
  {#if data}
    <Content>
    </Content>
    <form id="update-form" method="POST" action="?/update">
      <Content>
        <h3>Attributes</h3>
      </Content>
      {@render children?.()}
    </form>

    <form
      id="upload-form"
      method="POST"
      enctype="multipart/form-data"
      action="?/upload"
    >
    <Content>
        <h3>Upload an Image</h3>
      </Content>
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
    <Json object={data} {error} />
  {:else}
    <Json object={data} {error} />
  {/if}
</div>

<style>
  #form-container {
    box-shadow: 0.5em 0.5em 6em rgb(33, 23, 72);
    display: flex;
    margin-bottom: 2em;
    align-self: center;
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
    background: white;
    border-radius: 10px;
    border: 1px solid #0b0f1a; /* adds subtle outline */
  }

  #form-container::-webkit-scrollbar-thumb:hover {
    background: #796e7f;
  }

  :global(form){
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    border: 0.1em dashed rgb(39, 38, 44);
  }

  #update-form {
    background: #0e0819;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
  }

  #upload-form {
    background-color: #0a0411;
  }

  :global(label) {
    font-weight: bold;
    font-size: 1em;
    color: #cbc3c3;
  }
  :global(input) {
    background-color: rgb(21, 15, 30);
    padding: 0.5em;
    border: 1px solid rgb(197, 191, 191);
    border-radius: 0.3em;
    font-size: 1em;
    color: #ffffff;
  }
  :global(input[readonly]) {
    background-color: rgb(14, 10, 21);
    cursor: not-allowed;
    color: rgb(170, 163, 163);
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
  .group {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    margin-top: 1em;
    padding-block: 1em;
  }
</style>
