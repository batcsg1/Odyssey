<script>
    let { children } = $props();
</script>

<section>
    {@render children?.()}
</section>

<style>
    section {
        padding: 1em;
        background: #0e0819;
        box-shadow: 0.5em 0.5em 6em rgb(33, 23, 72);
        transition: 0.3s ease;
    }
</style>
