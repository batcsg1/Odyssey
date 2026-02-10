<script>
    let { children } = $props();
</script>

<div class="table-wrapper">
    {@render children?.()}
</div>

<style>
    .table-wrapper {
        max-height: 500px; /* fixed height */
        min-height: 500px; /* optional: ensures table area is always visible */
        overflow-y: auto; /* scroll if content exceeds height */
        border: 0.1em solid white; /* optional: nice border */
        border-radius: 0.3em;
        padding: 0.5em;
        background-color: #131212; /* match your table background */
    }

    /* For Chrome, Edge, and Safari */
    .table-wrapper::-webkit-scrollbar {
        width: 1em; /* scrollbar width */
    }

    .table-wrapper::-webkit-scrollbar-track {
        background: #0b0f1a; /* track (background) */
        border-radius: 10px;
    }

    .table-wrapper::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, rgb(161, 159, 163), #ffffff); /* thumb color */
        border-radius: 10px;
        border: 1px solid #0b0f1a; /* adds subtle outline */
    }

    .table-wrapper::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, rgb(158, 159, 160), #edeeee);
    }
</style>
