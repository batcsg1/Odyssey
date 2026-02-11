<script>
    let { error = "" } = $props();
</script>

<p class="error">{error}</p>

<style>
    .error {
        background-color: rgba(255, 6, 6, 0.2);
        border: 0.1em dashed #ff6666;
        padding: 2em;
        border-radius: 0.3em;
        box-shadow: 6px 6px 2em #ff6666;
        color: #ff6666;
        width: 25em;
        text-align: center;
        font-weight: bolder;
    }
</style>
