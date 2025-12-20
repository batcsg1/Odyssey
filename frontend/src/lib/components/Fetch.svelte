<script>
  let { location = "", items = [], count = 0, columns = [] } = $props();
  let trimmedLocation = location.charAt(0).toUpperCase() + location.slice(1).replace("-", " ")
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
              <td>{item[column.key]}</td>
            {/each}
            <td>
              <p>Delete</p>
            </td>
            <td>
               <a href={`/${location}/${item.id}`}>Update</a>
            </td>
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
