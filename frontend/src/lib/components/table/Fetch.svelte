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

  <table>
    <thead>
      <tr>
        <th scope="col">ID</th>
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
</article>

<style>
  #id-cell {
    background-color: rgb(55, 49, 62);
    color: white;
    overflow-x: auto;
    transition: ease 0.4s;
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
    background-color: rgb(255, 255, 255);
  }

  #id-cell:hover a {
    color: black;
    text-decoration: underline;
  }

  article {
    background-color: rgb(15, 14, 20);
    border: 0.02em solid rgb(51, 50, 60);

    border-radius: 0.3em;
    padding: 1em;
    box-shadow: 0.5em 0.5em 10em rgb(78, 75, 90);
    overflow-x: auto;
  }
  h4 {
    font-weight: bolder;
    color: #ffffff;
  }

  h5 {
    font-size: medium;
    color: rgb(170, 163, 163);
  }

  table {
    width: 100%;
    border: none;
    table-layout: fixed;
  }
  thead tr {
    color: #ffffff;
    background-color: rgb(50, 44, 68);
  }
  th,
  td {
    padding: 0.5em;
    text-align: left;
    vertical-align: top;
    word-break: break-word;
    border-right: 0.1em dashed rgb(25, 59, 72);
    color: gray;
  }

  tr {
    border-bottom: 1px solid rgba(102, 170, 255, 0.1);
    transition: background 0.2s ease;
  }

  tbody tr:hover {
    background-color: rgba(149, 142, 171, 0.8); /* Highlight row on hover */
  }

  tbody tr:hover td {
    color: white; /* Change text color on hover */
  }

  tr:nth-child(even) {
    background-color: rgb(33, 31, 43);
  }
</style>
