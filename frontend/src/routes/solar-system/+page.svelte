<script>
</script>

<main>
    <header>
        <h1>THE SOLAR SYSTEM</h1>
    </header>
    <article id="contents" class="d-flex flex-wrap justify-content-center gap-3 p-3 overflow-auto">
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
                <p class="card-text">
                    Descriptions and details about stars.
                </p>
                <a href="#" class="card-link">Learn More</a>
            </div>
        </div>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Planets</h5>
                <p class="card-text">
                    Descriptions and details about planets.
                </p>
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
                <p class="card-text">
                    Descriptions and details about comets.
                </p>
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
        background-image: url(../../lib/Images/solsys.webp);
        background-repeat: no-repeat;
        background-size: cover;   
        background-position: center;
    }

    header::before {
        content: "";
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.3); /* semi-transparent overlay */
        z-index: 1;
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
        gap: 15px;
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
        transition: 0.3s ease;
        overflow-wrap: break-word;   /* break long words */
        
    }

    #contents section:hover{
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
            rgba(255, 255, 255, 0.9),     /* dark navy blue */
            rgba(160, 149, 149, 0.6)     /* softer blue tint */
        );
        cursor: pointer;
        transition: 0.3s ease;
        transform: scale(1.1);
    }
</style>
