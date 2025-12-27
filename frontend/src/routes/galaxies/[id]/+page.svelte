<script>
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";

  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Parent from "$lib/components/Parent.svelte";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");

  const galaxyId = $page.params.id;

  // Retrieve data passed to the galaxy page
  let { data, form } = $props();

  // Retrieve the list of galaxyies
  const { galaxy, error } = data;

  // The form object is a runtime-only object that only exists when the form is submitted
  const { success, error: formError } = form ?? {};

  let message = $state("");
  const hideMessage = () => (message = "");

  const handleInput = (e) => {
    message = "";
    setTimeout(() => (message = `You typed ${e.target.value}`), 0);
  };

  const handleFocus = (field) => (message = `${field} input field focused`);

  const handleBlur = (field) => (message = `${field} input field lost focus`);

  let editable = $state(false);
  const toggleEditable = () => (editable = !editable);
</script>

<main>
  <header>
    <Header {location}></Header>
  </header>
  <h3>GALAXY INFO:</h3>
  <section id="galaxy">

    {#if galaxy}
    <form method="POST" action="?/update">
        <label for="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={galaxy.name}
          oninput={handleInput}
          onfocus={() => handleFocus("Name")}
          onblur={() => handleBlur("Name")}
          readonly={!editable}
        />

        <label for="type">Type:</label>
        <input
          id="type"
          name="type"
          type="text"
          value={galaxy.type}
          onfocus={() => handleFocus("Type")}
          onblur={() => handleBlur("Type")}
          readonly={!editable}
        />

        <label for="distance">Distance (km):</label>
        <input
          id="distance"
          name="distance"
          type="text"
          value={galaxy.distance}
          onfocus={() => handleFocus("Distance")}
          onblur={() => handleBlur("Distance")}
          readonly={!editable}
        />

        <label for="size">Size:</label>
        <input
          id="size"
          name="size"
          type="text"
          value={galaxy.size}
          onfocus={() => handleFocus("Size")}
          onblur={() => handleBlur("Size")}
          readonly={!editable}
        />

        <label for="brightness">Brightness:</label>
        <input
          id="brightness"
          name="brightness"
          type="text"
          value={galaxy.brightness}
          onfocus={() => handleFocus("Brightness")}
          onblur={() => handleBlur("Brightness")}
          readonly={!editable}
        />

        <label for="constellationId">Constellation ID:</label>
        <input
          id="constellationId"
          name="constellationId"
          type="text"
          value={galaxy.constellationId}
          onfocus={() => handleFocus("constellationId")}
          onblur={() => handleBlur("constellationId")}
          readonly=true
        />

        {#if editable}
          <button type="submit">Save</button>
        {:else}
          <button type="button" onclick={toggleEditable}>Update</button>
        {/if}

        <Parent location="constellations" />

        {#if formError}
          <p id="error">{formError}</p>
        {/if}

        {#if success}
          <p id="success">Galaxy updated successfully!</p>
        {/if}

      </form>
    {/if}

    <article>
      <h4>Raw JSON</h4>

      <section class={error ? "api-err" : ""}>
        {#if galaxy}
          <pre>{JSON.stringify(galaxy, null, 2)}</pre>
        {:else}
          <pre>{JSON.stringify(error, null, 2)}</pre>
        {/if}
      </section>
    </article>
  </section>

  {#if message}
    <button
      id="message"
      transition:fly={{ x: 200, duration: 300, easing: cubicOut }}
      onclick={hideMessage}
    >
      ✖ | {message}
    </button>
  {/if}
</main>

<style>
  .api-err{
    background-color: #ffe6e6;
    padding: 1em;
    border-radius: 0.3em;
    box-shadow: 6px 6px 0px 0px #ff6666;
  }
  .api-err pre {
    color: red;
    text-shadow: none;
    font-weight: bolder;
  }
  #error {
    color: red;
    font-weight: bold;
    margin-top: 1em;
  }
  #success {
    color: green;
    font-weight: bold;
    margin-top: 1em;
  }
  #galaxy {
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
    max-width: 50em;
    align-self: center;
    padding: 1em;
    gap: 1em;
  }

  form,
  article {
    background-color: white;
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px #66aaff;
    padding: 2em;
    display: flex;
    flex-direction: column;
  }

  form {
    gap: 0.3em;
  }

  article section {
    background-color: rgb(13, 13, 30);
    padding: 1em;
    border-radius: 0.3em;
    box-shadow: 6px 6px 0px 0px #66aaff;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
    overflow-x: auto;
  }

  pre {
    color: white;
    font-weight: bolder;
  }

  #message {
    margin-top: 1em;
    text-align: center;
    color: white;
    position: absolute;
    z-index: 2000;
    left: 70%;
    top: 35%;
    background-color: white;
    color: #333;
    border-radius: 0.3em;
    padding: 2em 2em 2em 2em;
    box-shadow: 3px 3px 0px #66aaff;
  }

  #message:hover {
    background-color: red;
    color: white;
    cursor: pointer;
    box-shadow: 3px 3px 0px white;
  }

  h3 {
    font-weight: bold;
    padding: 0em 0em 0.3em 0em;
    border-bottom: #66aaff 0.1em solid;
    text-align: center;
    color: white;
    max-width: 30em;
    align-self: center;
  }

  h4 {
    color: #333;
    font-weight: bolder;
    margin-bottom: 0.5em;
  }

  label {
    font-weight: bold;
  }

  header {
    position: relative;
    color: white;
    background-image: url(../../../lib/Images/constellation.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 20em;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  input {
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 0.3em;
    font-size: 1em;
  }
  input[readonly] {
    background-color: #f0f0f0;
    cursor: not-allowed;
    color: grey;
  }

  button {
    margin-top: 1em;
    padding: 0.5em;
    background-color: #66aaff;
    color: white;
    border: none;
    border-radius: 0.3em;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;
  }

  button:hover {
    background-color: #eed755;
    transition: 0.3s ease;
    transform: scale(1.1);
  }

  @media (width <= 820px) {
    #galaxy {
      flex-direction: column;
    }

    form,
    article {
      min-width: 300px;
    }
  }

  @media (width <= 500px) {
    #galaxy {
      width: 90%;
    }
  }
</style>
