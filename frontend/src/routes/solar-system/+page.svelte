<script>
</script>

<main>
    <header>
        <h1>THE SOLAR SYSTEM</h1>
    </header>
    <article
        id="contents"
        class="d-flex flex-wrap justify-content-center gap-3 p-3 overflow-auto"
    >
        <!-- Card template -->
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Constellations</h5>
                <p class="card-text">
                    Descriptions and details about constellations.
                </p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Galaxies</h5>
                <p class="card-text">
                    Descriptions and details about galaxies.
                </p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Stars</h5>
                <p class="card-text">Descriptions and details about stars.</p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Planets</h5>
                <p class="card-text">Descriptions and details about planets.</p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Satellites</h5>
                <p class="card-text">
                    Descriptions and details about satellites.
                </p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Comets</h5>
                <p class="card-text">Descriptions and details about comets.</p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Asteroids</h5>
                <p class="card-text">
                    Descriptions and details about asteroids.
                </p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Meteorites</h5>
                <p class="card-text">
                    Descriptions and details about meteorites.
                </p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Meteor Showers</h5>
                <p class="card-text">
                    Descriptions and details about meteor showers.
                </p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>
    </article>
</main>

<style>
    main {
        background-image: url(../../lib/Images/solsys.webp);
        background-repeat: no-repeat;
        background-size: cover;   
        background-position: center;
    }
    .card{
        color: white;
        box-shadow: 3px 3px 2px white;
        background: linear-gradient(
        to bottom,
        rgba(0,0,0, 0.7),  /* more transparent at top */
        rgba(0,0,0, 0.8)
    );
        border: 3px solid white;
    }
    .card-body{
        text-shadow: 3px 3px 2px black;
    }
    h1 {
        letter-spacing: 0.2em;    
        color: white;
        box-shadow: 5px 5px 0px 0px white;
        text-shadow: 3px 3px 3px #333;
        z-index: 2;
    }
    header {
        position: relative;
        height: 15em;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    #contents{
        background: linear-gradient(
        to bottom,
        rgba(0,0,0, 0.7),  /* more transparent at top */
        rgba(0,0,0, 0.8)   /* normal opacity at bottom */
    );
    mask-image: linear-gradient(to top, black 96%, transparent 100%);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 15px;
        padding: 2em;
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

</style>
