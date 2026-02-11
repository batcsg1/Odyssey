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
        
    }

    /* For Chrome, Edge, and Safari */
    .table-wrapper::-webkit-scrollbar {
        width: 0.5em; /* scrollbar width */
    }

    .table-wrapper::-webkit-scrollbar-track {
        background: #1e1c22; /* track (background) */
        border-radius: 10px;
    }

    .table-wrapper::-webkit-scrollbar-thumb {
        background: white;
        border-radius: 5px;
        border: 1px solid #858689; /* adds subtle outline */
    }

    .table-wrapper::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, rgb(158, 159, 160), #edeeee);
    }
</style>
