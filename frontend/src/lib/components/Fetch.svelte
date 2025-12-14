<script>
  let { location = "", items = [], count = 0, columns = [] } = $props();
</script>

<article>
  <h4>Constellations: {count}</h4>
  {#if items.length === 0}
    <p>No data available.</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>ID</th>
          {#each columns as column}
            <th>{column.label}</th>
          {/each}
        </tr>
      </thead>

      <tbody>
        {#each items as item (item.id)}
          <tr>
            <td id="id-cell">
              <a href={`/${location}/${item.id}`}>{item.id}</a>
            </td>
            {#each columns as column}
              <td>{item[column.key]}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</article>

<style>
  #id-cell {
    background-color: #66aaff;
    overflow-x: auto;
  }

  #id-cell a {
    display: block;
    width: 100%;
    height: 100%;
    color: white;
    text-decoration: none;
    font-weight: bolder;
  }

  #id-cell:hover {
    background-color: white;
  }

  #id-cell:hover a {
    color: #66aaff;
    text-decoration: underline;
  }

  article {
    background-color: white;
    border-radius: 0.3em;
    padding: 1em;
    overflow-x: auto;
  }
  h4 {
    color: #333;
    font-weight: bolder;
  }
  table {
    color: #333;
    border: 1px solid rgb(197, 189, 189);
    border-radius: 0.3em;
    width: 100%;
    border: none;
    table-layout: fixed;
  }
  thead tr {
    color: #66aaff;
  }
  th {
    padding: 0em 0em 0.5em 0em;
  }
  tr {
    border-bottom: 1px solid rgb(197, 189, 189);
  }
  tr:nth-child(even) {
    background-color: rgb(242, 226, 226);
  }
</style>
