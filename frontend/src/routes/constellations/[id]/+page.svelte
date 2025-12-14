<script>
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");

  const constellationId = $page.params.id;

  // Retrieve data passed to the constellation page
  let { data } = $props();
  const { constellations } = data;

  // Retrieve the list of constellations
  const list = constellations.data;
  console.log(list);

  // Find the constellation with the matching ID
  const constellation = $derived(
    list.find((constellation) => constellation.id === constellationId)
  );

  let message = $state("");

  const handleInput = (e) => (message = `You typed ${e.target.value}`);

  const handleFocus = (field) => (message = `${field} input field focused`);

  const handleBlur = (field) => (message = `${field} input field lost focus`);

  let editable = $state(false);
  const toggleEditable = () => (editable = !editable);
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

  <p id="message">{message}</p>
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

  article section{
    background-color: #333;
    padding: 1em;
    border-radius: 0.3em;
  }

  pre {
    color: white;
  }

  #message {
    font-style: italic;
    margin-top: 1em;
    text-align: center;
    color: white;
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

  input[readonly] {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }

  @media (width <= 820px) {
    #constellation {
      flex-direction: column;
      align-items: center;
    }

    #constellation *{
        width: 100%;
    }
  }
</style>
