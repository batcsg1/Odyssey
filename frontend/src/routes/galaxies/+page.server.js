export async function load() {
    const intro = {
        header: "Galaxies",
        text: `Welcome to the Constellations section of Odyssey! Here, you can explore a curated collection of celestial constellations, each with its own unique story and significance. Whether you're an astronomy enthusiast or just curious about the night sky, our constellation guides provide fascinating insights into the myths, history, and science behind these star patterns. Dive in to discover the wonders of the cosmos and learn how to identify constellations in the night sky. Happy stargazing!`
    };

    const blurb = {
        header: "What are Galaxies?",
        text: `Constellations are patterns of stars that have been identified and named by various cultures throughout history. They often represent mythological figures, animals, or objects and have been used for navigation, storytelling, and as a way to organize the night sky. There are 88 officially recognized constellations, each with its own unique set of stars and stories.`
    }

    return { intro, blurb };
}