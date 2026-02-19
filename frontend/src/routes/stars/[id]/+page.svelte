<script>
  import Header from "$lib/components/Header.svelte";
  import Form from "$lib/components/form/Form.svelte";
  import DataHeader from "$lib/components/DataHeader.svelte";

  // Retrieve data passed to the stars page
  let { data, form } = $props();

  // Retrieve the list of stars
  const { stars, error } = data;

  // The form object is a runtime-only object that only exists when the form is submitted
  const { success, error: formError } = form ?? {};

  const fields = [
    { id: "name", label: "Name", type: "text" },
    { id: "age", label: "Age", type: "text" },
    { id: "mass", label: "Mass (M☉)", type: "text" },
    { id: "diameter", label: "Diameter (D☉)", type: "text" },
    { id: "type", label: "Type", type: "text" },
    { id: "distance", label: "Distance (l.y.)", type: "text" },    
  ];

  // Location, label and name of parent object
  const parent = {
    location: "constellations",
    label: "Constellation",
    initialName: galaxy.constellation?.name || "",
  };
</script>

<!--Website location, e.g. Home > Galaxies-->
<Header />

<!--Name of current galaxy as a header-->
<DataHeader item={galaxy} />

<!--
Items: 
1st and 2nd Items are forms: Attributes of the current galaxy, image upload  
3rd item is the current galaxy retrieved in it's raw JSON form from the backend API.
-->
<Form data={galaxy} {success} {error} {fields} lookup={parent} />

<style>
</style>
