<script>
  import Header from "$lib/components/Header.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import DataHeader from "$lib/components/DataHeader.svelte";

  //const constellationId = $page.params.id;

  // Retrieve data passed to the constellation page
  let { data, form } = $props();

  // Retrieve the list of constellations
  const { constellation, error } = data;

  // The form object is a runtime-only object that only exists when the form is submitted
  const { success, error: formError } = form ?? {};

  const fields = [
    { id: "name", label: "Name:", type: "text" },
    { id: "shape", label: "Shape:", type: "text" },
    { id: "area", label: "Area (sq. deg.):", type: "text" },
    { id: "abbreviation", label: "Abbreviation:", type: "text" }
  ];
</script>

<Header />

<DataHeader item={constellation}/>

<Form data={constellation} {success} {error} {fields}/>

<style>
</style>
