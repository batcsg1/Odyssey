<script>
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";

  import Parent from "$lib/components/Parent.svelte";
  import Json from "$lib/components/Json.svelte";
  import Message from "$lib/components/Message.svelte";
  import FormError from "$lib/components/FormError.svelte";
  import NoImage from "$lib/components/NoImage.svelte";

  //Import current user data
  let user = $state($page.data.user);
  let authorized = $derived(user != null && user.role === "SUPER_ADMIN");


  let currentPath = $derived($page.url.pathname);
  let location = $derived(currentPath.replace("/", ""));

  const galaxyId = $page.params.id;

  // Retrieve data passed to the galaxy page
  let { data, form } = $props();

  // Retrieve the list of galaxyies
  const { galaxy, error } = data;

  // The form object is a runtime-only object that only exists when the form is submitted
  const { success, error: formError } = form ?? {};

  let message = $state("");

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
  <h3>{galaxy.name}</h3>
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
          value={galaxy.constellationId ?? "None"}
          onfocus={() => handleFocus("constellationId")}
          onblur={() => handleBlur("constellationId")}
          readonly="true"
        />

        {#if authorized}
          {#if editable}
            <Parent location="constellations" label="New Constellation ID" />
            <button type="submit">Save</button>
            <button type="button" onclick={toggleEditable}>Cancel</button>
          {:else}
            <button type="button" onclick={toggleEditable}>Update</button>
          {/if}
        {/if}

        <FormError error={formError} {success} />
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

        {#if galaxy.imagePath}
          <img
            src={galaxy.imagePath}
            alt={galaxy.imagePath}
            height="500"
          />
        {:else}
          <NoImage/>
        {/if}
      </form>



    {/if}

    <Json object={galaxy} {error} />
  </section>

  {#if message}
    <Message {message} onClose={() => (message = "")} />
  {/if}
</main>

<style>
  #galaxy {
    display: flex;
    margin-bottom: 2em;
    max-width: 50em;
    align-self: center;
    padding: 1em;
    gap: 1em;
    overflow-x: auto; /* ENABLE horizontal scrolling */
  }

  /* For Chrome, Edge, and Safari */
  #galaxy::-webkit-scrollbar {
    height: 1em;
  }

  #galaxy::-webkit-scrollbar-track {
    background: #0b0f1a; /* track (background) */
    border-radius: 10px;
  }

  #galaxy::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #223a77, #3a66ff); /* thumb color */
    border-radius: 10px;
    border: 1px solid #0b0f1a; /* adds subtle outline */
  }

  #galaxy::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgb(18, 39, 117), #66aaff);
  }

  form {
    background: #000000;
    background: linear-gradient(
      180deg,
      rgb(10, 17, 21) 5%,
      rgb(13, 20, 26) 71%,
      rgb(31, 51, 66) 100%
    );
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 3em rgb(31, 51, 66);
    padding: 2em;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    border: 0.1em solid rgb(31, 51, 66);
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
    margin-bottom: 1em;
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
    background-color: #09171f;
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 0.3em;
    font-size: 1em;
    color: white;
  }
  input[readonly] {
    background-color: #09171f;
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

    form {
      min-width: 300px;
    }
  }

  @media (width <= 500px) {
    #galaxy {
      width: 90%;
    }
  }
</style>
