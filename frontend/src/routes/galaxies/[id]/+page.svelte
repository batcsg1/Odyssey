<script>
  import Header from "$lib/components/Header.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import DataHeader from "$lib/components/DataHeader.svelte";

  // Retrieve data passed to the constellation page
  let { data, form } = $props();

  // Retrieve the list of galaxys
  const { galaxy, error } = data;

  // The form object is a runtime-only object that only exists when the form is submitted
  const { success, error: formError } = form ?? {};

  const fields = [
    { id: "name", label: "Name:", type: "text" },
    { id: "type", label: "Type:", type: "text" },
    { id: "distance", label: "Distance (k.m.):", type: "text" },
    { id: "size", label: "Size (k.m.)", type: "text" },
    { id: "brightness", label: "Brightness (V):", type: "text" }
  ];

  const parent = {
    location: "constellations",
    label: "Constellation",
    initialName: galaxy.constellation?.name || ""
  }
</script>

<Header />

<DataHeader item={galaxy}/>

<Form data={galaxy} {success} {error} {fields} lookup={parent}/>

<style>
</style>
