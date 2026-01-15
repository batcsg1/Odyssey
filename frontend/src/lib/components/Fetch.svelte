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

</article>

<style>
  #no-data {
    font-style: italic;
    color: gray;
  }
  #id-cell {
    background-color: #66aaff;
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
    background-color: white;
    transform: scale(1.1);
  }

  #id-cell:hover a {
    color: #66aaff;
    text-decoration: underline;
  }

  article {
    background: #000000;
    background: linear-gradient(180deg, rgb(10, 17, 21) 5%, rgb(13, 20, 26) 71%, rgb(31, 51, 66) 100%);
    border-radius: 0.3em;
    padding: 1em;
    box-shadow: 0.5em 0.5em 10em rgb(31, 51, 66);
    border: 0.1em solid rgb(31,51,66);
    overflow-x: auto;
  }
  h4 {
    font-weight: bolder;
  }

  h5 {
    font-size: medium;
    color: #66aaff;
  }

  table {
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
    background-color: rgb(17, 32, 38);
  }
</style>
