<script>
  let { header = $bindable(""), text = "" } = $props();
</script>

<section>
  <h2>{header}</h2>
  <p>{text}</p>
</section>

<style>
  section {
    padding: 2em 2em 2em 2em;
    border: white 0.1em solid;
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px white;
  }
  
  h2 {
    font-weight: bold;
    padding: 0em 0em 0.3em 0em;
    border-bottom: #66aaff 0.1em solid;
  }

  p {
    max-width: 50em;
    line-height: 1.7em;
  }
</style>
