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
    background: #000000;
    background: linear-gradient(180deg, rgb(10, 17, 21) 5%, rgb(13, 20, 26) 71%, rgb(31, 51, 66) 100%);
    border-radius: 0.3em;
    box-shadow: 0.5em 0.5em 6em rgb(31, 51, 66);
    border: 0.1em solid rgb(31,51,66);
  }
  
  h2 {
    font-weight: bold;
    padding: 0em 0em 0.3em 0em;
    border-bottom: #66aaff 0.1em solid;
  }

  p {
    background-color: rgb(12, 15, 16);
    line-height: 1.7em;
    padding: 1em 0.9em 1em 0.9em;
    border-radius: 0.3em;
  }
</style>
