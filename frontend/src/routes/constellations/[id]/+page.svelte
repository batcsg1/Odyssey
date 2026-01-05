<script>
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";

  import { fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Parent from "$lib/components/Parent.svelte";
  import Json from "$lib/components/Json.svelte";
  import Message from "$lib/components/Message.svelte";
  import FormError from "$lib/components/FormError.svelte";
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import { preventDefault } from "svelte/legacy";

  let currentPath = $derived($page.url.pathname);
  let location = currentPath.replace("/", "");

  const constellationId = $page.params.id;

  // Retrieve data passed to the constellation page
  let { data, form } = $props();

  // Retrieve the list of constellations
  const { constellation, error } = data;

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
    <Header />
  </header>
  <h3>CONSTELLATION INFO:</h3>
  <section id="constellation">
    {#if constellation}
      <form method="POST" action="?/update">
        <label for="name">Name:</label>
        <input
          id="name"
          name="name"
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
          name="shape"
          type="text"
          value={constellation.shape}
          onfocus={() => handleFocus("Shape")}
          onblur={() => handleBlur("Shape")}
          readonly={!editable}
        />

        <label for="area">Area (sq. deg.):</label>
        <input
          id="area"
          name="area"
          type="text"
          value={constellation.area}
          onfocus={() => handleFocus("Area")}
          onblur={() => handleBlur("Area")}
          readonly={!editable}
        />

        <label for="abbreviation">Abbreviation:</label>
        <input
          id="abbreviation"
          name="abbreviation"
          type="text"
          value={constellation.abbreviation}
          onfocus={() => handleFocus("Abbreviation")}
          onblur={() => handleBlur("Abbreviation")}
          readonly={!editable}
        />

        {#if editable}
          <button type="submit">Save</button>
          <button type="button" onclick={toggleEditable}>Cancel</button>
        {:else}
          <button type="button" onclick={toggleEditable}>Update</button>
        {/if}

        <FormError error={formError} {success} />
      </form>
      <form
        method="POST"
        enctype="multipart/form-data"
        action="?/upload"
        onsubmit={preventDefault}
      >
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

        <button type="submit">Submit</button>

        {#if constellation.imagePath}
          <img
            src={constellation.imagePath}
            alt={constellation.imagePath}
            height="500"
          />
        {:else}
          <section id="no-image">
            <p>No Image found</p>
          </section>
        {/if}
      </form>
    {/if}

    <Json object={constellation} {error} />
  </section>

  {#if message}
    <Message {message} onClose={() => (message = "")} />
  {/if}
</main>

<style>
  #no-image {
    background-color: rgb(243, 239, 239);
    border: 0.1em dashed rgb(176, 174, 174);
    border-radius: 0.3em;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #constellation {
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
    max-width: 50em;
    align-self: center;
    padding: 1em;
    gap: 1em;
  }

  form {
    background-color: white;
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px #66aaff;
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
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
    }

    form {
      min-width: 300px;
    }
  }

  @media (width <= 500px) {
    #constellation {
      width: 90%;
    }
  }
</style>
