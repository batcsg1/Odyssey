<script>
  let { location = $bindable("") } = $props();

  let query = $state("");

  let suggestions = $state([]);
  let selection = $state({});
  let message = $state("");

  const fetchSuggestions = async () => {
    if (query.length === 0) {
      suggestions = [];
      return;
    }

    const res = await fetch(
      `/api/${location}?name=${encodeURIComponent(query)}`
    );

    const json = await res.json();

    if (!res.ok) {
      suggestions = [];
      message = json.message
      return;
    }

    suggestions = json.data;

    console.log(suggestions);
  };

  const select = (item) => {
    selection = {
      id: item.id,
      name: item.name,
    };

    query = item.name; // Set the input field to the selected item's name
  };
</script>

<div class="autocomplete">
  <input
    type="text"
    bind:value={query}
    oninput={fetchSuggestions}
    placeholder="Enter"
    autocomplete="off"
    data-cy="address-disaster"
  />

  <!-- Hidden fields -->
  <input type="hidden" name="id" value={selection.id} />

  <!--List of suggested inputs-->
  {#if suggestions.length > 0}
    <ul class="suggestions">
      {#each suggestions as suggestion}
        <li onclick={() => select(suggestion)}>
          {suggestion.name}
        </li>
      {/each}
    </ul>
  {:else if message}
    <ul class="suggestions">
      {message}
    </ul>
  {/if}
</div>

<style>
  .autocomplete {
    position: relative;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .suggestions {
    position: absolute;
    z-index: 10;
    background: white;
    width: 100%;
    border: 1px solid #ccc;
    border-top: none;
    max-height: 200px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .suggestions li {
    padding: 0.75rem;
    cursor: pointer;
  }

  .suggestions li:hover {
    background-color: #f0f0f0;
  }
</style>
