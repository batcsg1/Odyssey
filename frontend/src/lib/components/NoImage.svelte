<script>
</script>

<section id="no-image">
    <p>ERROR: NO IMAGE FOUND</p>
</section>

<style>
    #no-image {
        /* Layout */
        display: flex;
        justify-content: center;
        align-items: center;
        height: 500px;
        width: 100%;
        
        /* Error Aesthetics */
        background-color: rgba(255, 20, 20, 0.05);
        border: 0.15em dashed #ff4444;
        border-radius: 0.5em;
        
        /* Glow effect */
        box-shadow: inset 0 0 2em rgba(255, 0, 0, 0.2), 
                    0 0 1.5em rgba(255, 68, 68, 0.15);
        
        /* Optional: simple pulsing error animation */
        animation: pulse-bg 2s infinite ease-in-out;
    }

    #no-image p {
        font-size: 1.5rem;
        font-weight: 1000;
        text-transform: uppercase;
        letter-spacing: 0.1em;

        /* Red Gradient Text */
        background: linear-gradient(180deg, #ff8888 0%, #ff0000 50%, #880000 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        
        /* Drop shadow to make text pop against the dashed border */
        filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
    }

    @keyframes pulse-bg {
        0%, 100% { background-color: rgba(255, 20, 20, 0.05); }
        50% { background-color: rgba(255, 20, 20, 0.12); }
    }
</style>