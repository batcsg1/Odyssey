
<main>
    <header id="about-image">
        <h1>ABOUT</h1>
    </header>
    <article id="about">
        <section id="mission">
            <h2>MISSION</h2>
            <p>Odyssey is all about making information about our solar system and outer space publically accesible and contributable. And quite simply, it is a website where you can go to infinity and beyond!</p>
        </section>

        <section id="history">
            <h2>HISTORY</h2>

            <p>
                The history of Odyssey was founded by Samuel Batchelor,
                as an accumulation of his child-hood passion for astronomy and love for all things tech-related. Whilst studying full-time at the Bachelor of Information Technology at Otago Polytechnic, he sought a golden opportunity to further fufil his interest in astronomy. The golden opportunity was to build a website devoted entirely to space, and a platform where users can easily find out about our solar system and outer space. 
            </p>
        </section>
    </article>
</main>

<style>
    #about-image{
        background-image: url(../../lib/Images/082722_kuiper_feat.webp);
        background-repeat: no-repeat;
        background-size: cover;   
        height: 10em;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #about {
      display: flex;
      flex-direction: column;
    }
    #about section{
        padding: 0.1em 1em 0.1em 1em;
        
    }
    p {
        background: repeating-linear-gradient(
        45deg,
      /* Angle of the stripes */ rgba(0, 0, 0, 0.1),
      /* First stripe color with 10% opacity */ rgba(0, 0, 0, 0.1) 10px,
      /* End of the first stripe */ rgba(255, 255, 255, 0.1) 10px,
      /* Start of the second stripe with 10% opacity */ rgba(255, 255, 255, 0.1)
        20px /* End of the second stripe */
    );
        padding: 0.6em;
        border: 2px dashed gray;
        box-shadow: 3px 3px 3px #333;
        text-shadow: 2px 2px 15px black;
    }

    

</style>