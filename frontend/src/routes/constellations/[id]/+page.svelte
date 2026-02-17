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

<!--Website location, e.g. Home > Constellations-->
<Header />

<!--Name of current constellation as a header-->
<DataHeader item={constellation}/>

<!--
Items: 
1st and 2nd Items are forms: Attributes of the current constellation, image upload  
3rd item is the current constellation retrieved in it's raw JSON form from the backend API.
-->
<Form data={constellation} {success} {error} {fields}/>

<style>
</style>
