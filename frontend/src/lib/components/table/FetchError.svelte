<script>
    let { error = "" } = $props();
</script>

<p class="error">{error}</p>

<style>
    .error {
        background-color: rgba(255, 6, 6, 0.1);
        border: 1px dashed #ff6666;
        padding: 2em;
        border-radius: 0.3em;
        box-shadow: 6px 6px 2em rgb(181, 72, 72);
        color: #ff6666;
        text-shadow: 0.1em 0.1em 0.6em red;
        text-align: center;
        font-weight: bolder;
    }
</style>
