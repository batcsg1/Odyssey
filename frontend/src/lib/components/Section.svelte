<script>
  let { header = $bindable(""), text = "" } = $props();
</script>

<h2>{header}</h2>
<p>{text}</p>

<style>
  h2 {
    font-weight: 1000;
    text-align: center;
    /* Apply gradient to text */
    background: linear-gradient(180deg, #ffffff 0%, #3fbbff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
  }

  p {
    padding: 1.1em 1.5em 1.1em 1.5em;
    background: #000000;
    background: linear-gradient(
      180deg,
      rgb(10, 17, 21) 5%,
      rgb(13, 20, 26) 71%,
      rgb(31, 51, 66) 100%
    );
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 6em rgb(31, 51, 66);
    border: 0.1em solid rgb(31, 51, 66);
  }
</style>
