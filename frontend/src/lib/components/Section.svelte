<script>
  let { header = $bindable(""), text = "" } = $props();
</script>

<div>
<h2>{header}</h2>
<p>{text}</p>
</div>

<style>

   h2 {
    font-weight: 600;
    font-size: 2.8em;
    color: rgb(2, 227, 2);
    border-bottom: 0.05em dashed #333;
  }
</style>
