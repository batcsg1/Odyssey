<script>
  let { header = $bindable(""), text = "" } = $props();
</script>

<section>
  <h2>{header.toUpperCase()}</h2>
  <p>{text}</p>
</section>

<style>
  section {
    padding: 2em 2em 0.9em 2em;
   
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 0px white;
    background-color: rgb(30, 35, 39);
  }
  
  h2 {
    font-weight: bold;
    padding: 0em 0em 0.3em 0em;
    border-bottom: #66aaff 0.1em solid;
  }

  p {
    background-color: rgb(19, 22, 24);
    line-height: 1.7em;
    padding: 1em 0.9em 1em 0.9em;
    border-radius: 0.6em;
  }
</style>
