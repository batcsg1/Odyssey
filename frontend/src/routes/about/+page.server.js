export async function load() {
    const mission = {
        header: "MISSION",
        text: `Odyssey is all about making information about our solar
        system and outer space publically accessible and contributable. And
        quite simply, it is a website where you can go to
        infinity and beyond!`,
    };

    const history = {
        header: "HISTORY",
        text: `Odyssey was founded by
        Samuel Batchelor, as an accumulation of his child-hood
        passion for astronomy and love for all things tech-related. Whilst
        studying full-time at the Bachelor of Information Technology at Otago
        Polytechnic, he sought a golden opportunity to further fufil his
        interest in astronomy. The golden opportunity was to build a website
        devoted entirely to space, and a platform where users can easily find
        out about our solar system and outer space.`,
    };

    return { mission, history };
}