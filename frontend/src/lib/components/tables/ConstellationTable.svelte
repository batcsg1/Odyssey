<script>
  import Search from "../table/Search.svelte";
  import TableWrapper from "../table/TableWrapper.svelte";
  import Fetch from "../table/Fetch.svelte";
  import FetchError from "../table/FetchError.svelte";
  import Table from "../table/Table.svelte";
  import { page } from "$app/stores";
  
  let location = $derived($page.url.pathname.replace("/", ""));

  // Using Svelte 5 props
  let { constellations, error } = $props();

  // Local state for the search query
  let query = $state("");

  // DERIVED STATE: This is the Svelte 5 way.
  // It automatically recalculates whenever 'query' or 'constellations' changes.
  let filteredData = $derived(
    !query
      ? constellations?.data || []
      : (constellations?.data || []).filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase()),
        ),
  );

  let count = $derived(filteredData.length);
</script>

<Table>
  {#if constellations?.data}
    <Search>
      <input
        type="text"
        placeholder="Search constellations..."
        bind:value={query}
      />
    </Search>
    <TableWrapper>
      <Fetch
        {location}
        items={filteredData}
        count={count}
        columns={[
          { key: "name", label: "Name" },
          { key: "shape", label: "Shape" },
          { key: "area", label: "Area (sq. deg.)" },
          { key: "abbreviation", label: "Abbreviation" },
        ]}
      />
    </TableWrapper>
  {:else}
    <FetchError {error} />
  {/if}
</Table>

<style>
</style>
