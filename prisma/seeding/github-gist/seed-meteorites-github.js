import fetch from "node-fetch";

import prisma from "../../client.js";

import { validatePostMeteorite } from "../../../middleware/validation/meteorite.js";

// Simulate an Express-like request and response for validation
const validateMeteorite = (meteorite) => {
    const req = { body: meteorite };
    const res = {
        status: (code) => ({
            json: (message) => {
                console.log(message.message);
                process.exit(1);
            },
        }),
    };

    validatePostMeteorite(req, res, () => { }); // Pass an empty function since we're not using next()
};

const seedMeteoritesFromGitHub = async () => {
    try {
        const gistUrl = "https://gist.githubusercontent.com/batcsg1/b9a5a9afe44d9f641020148950a8621f/raw/e7bfb0340d804deac38647b7adc8579936b4c682/seed-meteorites.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const meteoriteData = await response.json();

        //Find a planet by name
        const getPlanetIdByName = async (name) => {
            const result = await prisma.planet.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        // Patch logic
        for (const meteorite of meteoriteData) {
            meteorite.planetId = await getPlanetIdByName("Earth");
        }

        const data = await Promise.all(
            meteoriteData.map(async (meteorite) => {
                validateMeteorite(meteorite);
                return { ...meteorite };
            })
        );

        await prisma.meteorite.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Meteorites successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedMeteoritesFromGitHub();