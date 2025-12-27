<script>
  let { object = $bindable({}), error = "" } = $props();
</script>

<article>
  <h4>Raw JSON</h4>

  <section class={error ? "api-err" : ""}>
    {#if object}
      <pre>{JSON.stringify(object, null, 2)}</pre>
    {:else}
      <pre>{JSON.stringify(error, null, 2)}</pre>
    {/if}
  </section>
</article>

<style>
  .api-err {
    background-color: #ffe6e6;
    padding: 1em;
    border-radius: 0.3em;
    box-shadow: 6px 6px 0px 0px #ff6666;
  }
  .api-err pre {
    color: red;
    text-shadow: none;
    font-weight: bolder;
  }

  article {
    background-color: white;
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px #66aaff;
    padding: 2em;
    display: flex;
    flex-direction: column;
  }

  article section {
    background-color: rgb(13, 13, 30);
    padding: 1em;
    border-radius: 0.3em;
    box-shadow: 6px 6px 0px 0px #66aaff;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
    overflow-x: auto;
  }

  pre {
    color: white;
    font-weight: bolder;
  }

    h4 {
    color: #333;
    font-weight: bolder;
    margin-bottom: 0.5em;
  }

  @media (width <= 820px) {
    article {
      min-width: 300px;
    }
  }
</style>
