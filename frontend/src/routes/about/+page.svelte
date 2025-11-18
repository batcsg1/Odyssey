
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
    h1 {
        letter-spacing: 0.2em;    
        color: white;
        box-shadow: 5px 5px 0px 0px white;
        text-shadow: 3px 3px 3px #333;
        z-index: 1;
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
    
    #about-image::before {
        content: "";
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background-color: rgba(0,0,0,0.4); /* semi-transparent overlay */
        z-index: 0;
    }

    #about {
      display: flex;
      flex-direction: column;
      background: linear-gradient(
        to bottom,
        rgba(0,0,0, 0.7),  /* more transparent at top */
        rgba(0,0,0, 0.8)   /* normal opacity at bottom */
    );
    mask-image: linear-gradient(to top, black 98%, transparent 100%);
    color: white;
    }

    #about section{
        padding: 0.1em 1em 1.5em 1em;
        border-bottom: 0.1em dashed white;
    }

    #about{
        padding-top: 2em;
        gap: 2em;
    }

</style>