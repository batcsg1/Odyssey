<script>
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";

  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");

  const constellationId = $page.params.id;

  // Retrieve data passed to the constellation page
  let { data } = $props();
  const { constellations } = data;

  // Retrieve the list of constellations
  const list = constellations.data;

  // Find the constellation with the matching ID
  const constellation = $derived(
    list.find((constellation) => constellation.id === constellationId)
  );

  let message = $state("");

  const handleInput = (e) => {
    message = "";
    setTimeout(() => (message = `You typed ${e.target.value}`), 0);
  };

  const handleFocus = (field) => (message = `${field} input field focused`);

  const handleBlur = (field) => (message = `${field} input field lost focus`);

  let editable = $state(false);
  const toggleEditable = () => (editable = !editable);

  const hideMessage = () => message = "";
</script>

<main>
  <header>
    <Header {location}></Header>
  </header>
  <h3>CONSTELLATION INFO:</h3>
  <section id="constellation">
    <form>
      {#if constellation}
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          value={constellation.name}
          oninput={handleInput}
          onfocus={() => handleFocus("Name")}
          onblur={() => handleBlur("Name")}
          readonly={!editable}
        />

        <label for="shape">Shape:</label>
        <input
          id="shape"
          type="text"
          value={constellation.shape}
          onfocus={() => handleFocus("Shape")}
          onblur={() => handleBlur("Shape")}
          readonly={!editable}
        />

        <label for="area">Area (sq. deg.):</label>
        <input
          id="area"
          type="text"
          value={constellation.area}
          onfocus={() => handleFocus("Area")}
          onblur={() => handleBlur("Area")}
          readonly={!editable}
        />

        <label for="abbreviation">Abbreviation:</label>
        <input
          id="abbreviation"
          type="text"
          value={constellation.abbreviation}
          onfocus={() => handleFocus("Abbreviation")}
          onblur={() => handleBlur("Abbreviation")}
          readonly={!editable}
        />

        <button type="button" onclick={toggleEditable}>
          {editable ? "Save" : "Update"}
        </button>
      {:else}
        <p>Constellation not found</p>
      {/if}
    </form>
    <article>
      <h4>Raw JSON</h4>

      <section>
        {#if constellation}
          <pre>{JSON.stringify(constellation, null, 2)}</pre>
        {:else}
          <p>No data available</p>
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
      {message}
    </button>
  {/if}
</main>

<style>
  #constellation {
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
    background-color: #1c1b1b;
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
    text-shadow: #66aaff 2px 2px 3px;
  }

  #message {
    font-style: italic;
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
    padding: 1em 1em 1em 1em;
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
    #constellation {
      flex-direction: column;
      align-items: center;
    }

    #constellation * {
      width: 100%;
    }
  }
</style>
