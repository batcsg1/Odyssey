
<main>
    <header id="about-image">
        <h1>ABOUT</h1>
    </header>
    <article id="about">
        <section id="mission">
            <h2>MISSION</h2>
            <p><strong>Odyssey</strong> is all about making information about our solar system and outer space publically accessible and contributable. And quite simply, it is a website where you can go to <strong>infinity and beyond!</strong></p>
        </section>

        <section id="history">
            <h2>HISTORY</h2>

            <p>
                <strong>Odyssey</strong> was founded by <strong>Samuel Batchelor</strong>,
                as an accumulation of his child-hood passion for astronomy and love for all things tech-related. Whilst studying full-time at the Bachelor of Information Technology at Otago Polytechnic, he sought a golden opportunity to further fufil his interest in astronomy. The golden opportunity was to build a website devoted entirely to space, and a platform where users can easily find out about our solar system and outer space. 
            </p>
        </section>
    </article>
</main>

<style>
    h1{
        letter-spacing: 0.3em;
    }
    h2{
        text-shadow: 2px 2px 4px rgb(255, 255, 255);
        color: rgb(13, 1, 56);
    }
    main{
        background-image: url(../../lib/Images/earth_horizon.jpg);
        background-repeat: no-repeat;
        background-size: cover;   
    }
    #about-image{
        height: 15em;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #about {
      display: flex;
      flex-direction: column;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.3),  /* more transparent at top */
        rgba(255, 255, 255, 0.8)   /* normal opacity at bottom */
    );
    mask-image: linear-gradient(to top, black 95%, transparent 100%);
    }

    #about section{
        padding: 0.1em 1em 0.1em 1em;
    }
    p {
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
        padding: 0.9em;
        border: 2px white solid;
        box-shadow: 3px 3px 3px #333;
        text-shadow: 2px 2px 15px black;
    }

    #about{
        padding-top: 1.5em;
    }

</style>