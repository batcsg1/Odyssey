<script>
    let { children } = $props();
</script>

<section>
    {@render children?.()}
</section>

<style>
    section {
        overflow-x: auto;
        padding: 1em;
        align-self: center;
        max-width: 80em;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #0c0711;
        border: 0.1em solid rgb(31, 51, 66);
        box-shadow: 0.5em 0.5em 6em rgb(33, 23, 72);
        transition: 0.3s ease;
    }
</style>
