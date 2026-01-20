<script>
    let { children } = $props();
</script>

<section>
    {@render children?.()}
</section>

<style>
    section {
        overflow-x: auto;
        border-radius: 0.3em;
        padding: 1em;
        align-self: center;
        max-width: 80em;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #000000;
        background: linear-gradient(
            180deg,
            rgb(10, 17, 21) 5%,
            rgb(13, 20, 26) 71%,
            rgb(31, 51, 66) 100%
        );
        box-shadow: 0.5em 0.5em 6em rgb(31, 51, 66);
        border: 0.1em solid rgb(31, 51, 66);
    }
</style>
