<script>
  import Content from "./Content.svelte";

  let { object = $bindable({}), error = "" } = $props();
</script>

<article>
  <Content>
    <h3>API Response</h3>
  </Content>
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
    background-color: rgba(255, 6, 6, 0.2);
    padding: 1em;
    border-radius: 0.3em;
    box-shadow: 6px 6px 2em #ff6666;
    border: 0.1em dashed #ff6666;
    
  }
  .api-err pre {
    color: red;
    text-shadow: none;
    font-weight: bolder;
  }

  article {
    background-color: #08080c;
    padding: 2em;
    display: flex;
    flex-direction: column;
    border: 0.1em dashed rgb(39, 38, 44);
    width: 100%;
  }

  article section {
    padding: 1em;
    background: #040205;
    border-radius: 0.3em;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
    overflow-x: auto;
  }

  pre {
    color: rgb(201, 188, 228);
    font-weight: bolder;
    font-family: "JetBrains Mono", monospace;
  }

  h4 {
    color: white;
    font-weight: bolder;
    margin-bottom: 1em;
  }

  @media (width <= 820px) {
    article {
      min-width: 300px;
    }
  }
</style>
