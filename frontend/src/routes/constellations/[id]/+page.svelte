<script>
  import Header from "$lib/components/Header.svelte";
  import { page } from "$app/stores";

  import Parent from "$lib/components/Parent.svelte";
  import Json from "$lib/components/Json.svelte";
  import Message from "$lib/components/Message.svelte";
  import FormError from "$lib/components/FormError.svelte";
  import NoImage from "$lib/components/NoImage.svelte";
  import Content from "$lib/components/Content.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import DataHeader from "$lib/components/DataHeader.svelte";

  //Import current user data
  let user = $state($page.data.user);
  let authorized = $derived(user != null && user.role === "SUPER_ADMIN");

  let currentPath = $derived($page.url.pathname);
  let location = $derived(currentPath.replace("/", ""));

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

<Header />

<DataHeader item={constellation}></DataHeader>

<Form data={constellation} {error}>
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
</Form>

{#if message}
  <Message {message} onClose={() => (message = "")} />
{/if}

<style>

</style>
