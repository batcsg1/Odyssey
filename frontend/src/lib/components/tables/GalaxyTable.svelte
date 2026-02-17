<script>
  import Search from "../table/Search.svelte";
  import TableWrapper from "../table/TableWrapper.svelte";
  import Fetch from "../table/Fetch.svelte";
  import FetchError from "../table/FetchError.svelte";
  import Table from "../table/Table.svelte";
  import { page } from "$app/stores";

  let location = $derived($page.url.pathname.replace("/", ""));

  // Using Svelte 5 props
  let { galaxies, map, error } = $props();

  // Local state for the search query
  let query = $state("");

  // DERIVED STATE: Always filter first, then ALWAYS map to flatten
  let filteredData = $derived(
    (galaxies?.data || [])
      // 1. Filter the list (if query is empty, it returns everything)
      .filter((c) => 
        !query || c.name.toLowerCase().includes(query.toLowerCase())
      )
      // 2. Map the results to flatten the nested object for the table
      .map((galaxy) => ({
        ...galaxy,
        constellation: galaxy.constellation?.name, 
      }))
  );

  let count = $derived(filteredData.length);
</script>

<Table>
  {#if galaxies?.data}
    <Search>
      <input type="text" placeholder="Search galaxies..." bind:value={query} />
    </Search>
    <TableWrapper>
      <Fetch
        {location}
        items={filteredData}
        {count}
        columns={[
          { key: "name", label: "Name" },
          { key: "type", label: "Type" },
          { key: "distance", label: "Distance (million light years)" },
          { key: "size", label: "Size (light years)" },
          { key: "brightness", label: "Brightness (apparent magnitude)" },
          { key: "constellation", label: "Constellation" },
        ]}
        maps={{
          constellationId: map,
        }}
      />
    </TableWrapper>
  {:else}
    <FetchError {error} />
  {/if}
</Table>

<style>
</style>
