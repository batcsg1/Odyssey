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
  const toggleEditable = () =>editable = !editable;
</script>

<main>
  <header>
    <Header {location}></Header>
  </header>
  <h3>CONSTELLATION:</h3>
  <form>
    {#if constellation}
      <label for="name">Name:</label>
      <input 
      id="name" 
      type="text"
      value={constellation.name}  
      oninput={handleInput}
      onfocus={() => handleFocus('Name')}
      onblur={() => handleBlur('Name')}
      readonly={!editable}
      />

      <label for="shape">Shape:</label>
      <input 
      id="shape" 
      type="text" value={constellation.shape}
      onfocus={() => handleFocus('Shape')}
      onblur={() => handleBlur('Shape')}
      readonly={!editable}
       />

      <label for="area">Area (sq. deg.):</label>
      <input 
      id="area" 
      type="text" 
      value={constellation.area} 
      onfocus={() => handleFocus('Area')}
      onblur={() => handleBlur('Area')}
      readonly={!editable}
      />

      <label for="abbreviation">Abbreviation:</label>
      <input 
      id="abbreviation" 
      type="text" 
      value={constellation.abbreviation}
      onfocus={() => handleFocus('Abbreviation')}
      onblur={() => handleBlur('Abbreviation')}
      readonly={!editable}
      />

      <button type="button" onclick={toggleEditable}>
        {editable ? "Save" : "Update"}
      </button>
    {:else}
      <p>Constellation not found</p>
    {/if}
  </form>

  <p id="message">{message}</p>
</main>

<style>
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
  form {
    background-color: white;
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px #66aaff;
    padding: 2em;
    overflow-x: auto;
    max-width: 40em;
    align-self: center;
    display: flex;
    flex-direction: column;
  }
   input[readonly] {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
</style>
