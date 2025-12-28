<script>
  let {
    location = "",
    items = [],
    count = 0,
    columns = [],
    maps = {},
  } = $props();
  let trimmedLocation =
    location.charAt(0).toUpperCase() + location.slice(1).replace("-", " ");

  const helper = (item, column) => {
    const map = maps?.[column.key];
    const value = item?.[column.key];

    return map && value ? map[value] : value;
  };
</script>

<article>
  <h4>{trimmedLocation}</h4>
  <h5>Number of {trimmedLocation}: {count}</h5>
  {#if items.length === 0 || !items}
    <p id="no-data">404 - No {trimmedLocation} available :(</p>
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
              <td>{helper(item, column) ?? "-"}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</article>

<style>
  #no-data {
    font-style: italic;
    color: gray;
  }
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

  h5 {
    color: gray;
    font-size: medium;
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
  th,
  td {
    padding: 0.5em;
    text-align: left;
    vertical-align: top;
    word-break: break-word;
  }

  tr {
    border-bottom: 1px solid rgb(197, 189, 189);
  }
  tr:nth-child(even) {
    background-color: rgb(242, 226, 226);
  }
</style>
