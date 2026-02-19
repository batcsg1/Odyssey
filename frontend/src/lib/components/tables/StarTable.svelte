<script>
  import Search from "../table/Search.svelte";
  import TableWrapper from "../table/TableWrapper.svelte";
  import Fetch from "../table/Fetch.svelte";
  import FetchError from "../table/FetchError.svelte";
  import Table from "../table/Table.svelte";
  import { page } from "$app/stores";

  let location = $derived($page.url.pathname.replace("/", ""));

  // Using Svelte 5 props
  let { stars, map, error } = $props();

  // Local state for the search query
  let query = $state("");

  // DERIVED STATE: Always filter first, then ALWAYS map to flatten
  let filteredData = $derived(
    (stars?.data || [])
      // 1. Filter the list (if query is empty, it returns everything)
      .filter((c) => 
        !query || c.name.toLowerCase().includes(query.toLowerCase())
      )
      // 2. Map the results to flatten the nested object for the table
      .map((star) => ({
        ...star,
        galaxy: star.galaxy?.name, 
      }))
  );

  let count = $derived(filteredData.length);
</script>

<Table>
  {#if stars?.data}
    <Search>
      <input type="text" placeholder="Search stars..." bind:value={query} />
    </Search>
    <TableWrapper>
      <Fetch
        {location}
        items={filteredData}
        {count}
        columns={[
          { key: "name", label: "Name" },
          { key: "age", label: "Age" },
          { key: "mass", label: "Mass (M☉)" },
          { key: "diameter", label: "Diameter (D☉)" },
          { key: "type", label: "Type" },
          { key: "distance", label: "Distance (l.y.)" },
          { key: "temperature", label: "Temperature (K °)" },
          { key: "luminosity", label: "Luminosity (L☉)" },          
          { key: "hasPlanets", label: "Has Planets?" },          
          { key: "brightness", label: "Brightness (apparent magnitude)" },          
          { key: "galaxy", label: "Galaxy" },
        ]}
        maps={{
          galaxyId: map,
        }}
      />
    </TableWrapper>
  {:else}
    <FetchError {error} />
  {/if}
</Table>

<style>
</style>
