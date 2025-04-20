import fetch from "node-fetch";

import prisma from "../../client.js";

import { validatePostGalaxy } from "../../../middleware/validation/galaxy.js";

// Simulate an Express-like request and response for validation
const validateGalaxy = (galaxy) => {
    const req = { body: galaxy };
    const res = {
        status: (code) => ({
            json: (message) => {
                console.log(message.message);
                process.exit(1);
            },
        }),
    };

    validatePostGalaxy(req, res, () => { }); // Pass an empty function since we're not using next()
};

const seedGalaxiesFromGitHub = async () => {
    try {
        const gistUrl = "https://gist.githubusercontent.com/batcsg1/37d70ebb9da5c7c7432e5b073af0870a/raw/3f7909540a54093ae63997d36ff7cc4c158833ba/seed-galaxies.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const galaxyData = await response.json();

        //Find a constellation by name
        const getConstellationIdByName = async (name) => {
            const result = await prisma.constellation.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        // Example patch logic
        // Patch logic
        galaxyData[1].constellationId = await getConstellationIdByName("Andromeda");
        galaxyData[2].constellationId = await getConstellationIdByName("Leo");
        galaxyData[3].constellationId = await getConstellationIdByName("Ursa Major");
        galaxyData[5].constellationId = await getConstellationIdByName("Orion");


        console.log(galaxyData);

        const data = await Promise.all(
            galaxyData.map(async (galaxy) => {
                validateGalaxy(galaxy);
                return { ...galaxy };
            })
        );

        await prisma.galaxy.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Galaxies successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedGalaxiesFromGitHub();