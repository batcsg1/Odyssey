<script>
  import Search from "../Search.svelte";
  import TableWrapper from "../TableWrapper.svelte";
  import Fetch from "../Fetch.svelte";
  import FetchError from "../FetchError.svelte";
  import Table from "../Table.svelte";

  // Using Svelte 5 props
  let { constellations, error, location } = $props();

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
  <h3>VIEW CONSTELLATIONS</h3>
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
  h3 {
    font-weight: bold;
    padding: 1em 0 0.3em 0;
    border-bottom: #66aaff 0.1em solid;
    text-align: center;
    margin-inline: 8em;
  }

  @media (max-width: 900px) {
    h3 {
      margin-inline: 2em;
    }
  }
</style>
