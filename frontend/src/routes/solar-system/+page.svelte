
<main>
    <header>
        <h1>THE SOLAR SYSTEM</h1>
    </header>
    <article id="contents">
        <section>
            <h2>CONSTELLATIONS</h2>
        </section>
        <section>
            <h2>GALAXIES</h2>
        </section>
        <section>
            <h2>STARS</h2>
        </section>
        <section>
            <h2>PLANETS</h2>
        </section>
        <section>
            <h2>SATELLITES</h2>
        </section>
        <section>
            <h2>COMETS</h2>
        </section>
        <section>
            <h2>ASTEROIDS</h2>
        </section>
        <section>
            <h2>METEORITES</h2>
        </section>
        <section>
            <h2>METEOR SHOWERS</h2>
        </section>
    </article>
</main>

<style>
    h1 {
    letter-spacing: 0.2em;
    text-shadow: 5px 5px 4px black;
    background-color: rgba(0, 20, 60, 0.6);
    padding: 0.1em 0.5em 0.1em 0.5em;
    color: white;
    box-shadow: 5px 5px 0px 0px white;
}
    header {
        height: 15em;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: 
            url(../../lib/Images/solsys.webp);
        background-repeat: no-repeat;
        background-size: cover;   
        background-position: center;  
    }
    
    #contents{
        background-image: 
        linear-gradient(
            to bottom,
            rgba(0,0,0,1) 10%,    /* dark at bottom */
            rgba(0,0,0,0) 40%      /* fade to transparent upward */
        ),
        linear-gradient(
            rgba(255,255,255,0.3), 
            rgba(255,255,255,0.3)
        ),
        url(../../lib/Images/sts1.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 5px;
        padding: 1em;
        height: 30vh;
        overflow-y: auto;
        scrollbar-width: thin; /* "auto" | "thin" | "none" */
        scrollbar-color: #ffffff #1b2952; /* thumb color | track color */
    }

        /* For Chrome, Edge, and Safari */
    #contents::-webkit-scrollbar {
        width: 8px; /* scrollbar width */
    }

    #contents::-webkit-scrollbar-track {
        background: #0b0f1a; /* track (background) */
        border-radius: 10px;
    }

    #contents::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #223a77, #3a66ff); /* thumb color */
        border-radius: 10px;
        border: 1px solid #0b0f1a; /* adds subtle outline */
    }

    #contents::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, rgb(18, 39, 117) 98, 161), #66aaff); /* hover effect */
    }



    #contents section {
        padding: 1em;
        background:
        repeating-linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0px,
            rgba(53, 54, 118, 0.1) 2px,
            transparent 2px,
            transparent 6px
        ),
        linear-gradient(
            135deg,
            rgba(0, 20, 60, 0.9),     /* dark navy blue */
            rgba(0, 29, 47, 0.6)     /* softer blue tint */
        );
        color: white;
        border: 2px white solid;
        box-shadow: 3px 3px 3px #333;
        text-shadow: 2px 2px 15px black;
        width: 14em;
        text-align: center;
        
    }
</style>