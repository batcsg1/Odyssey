import fetch from "node-fetch";

import prisma from "../../client.js";

import { validatePostStar } from "../../../middleware/validation/star.js";

// Simulate an Express-like request and response for validation
const validateStar = (star) => {
    const req = { body: star };
    const res = {
        status: (code) => ({
            json: (message) => {
                console.log(message.message);
                process.exit(1);
            },
        }),
    };

    validatePostStar(req, res, () => { }); // Pass an empty function since we're not using next()
};

const seedStarsFromGitHub = async () => {
    try {
        const gistUrl = "https://gist.githubusercontent.com/batcsg1/b78d016d242abc39dd39f96375929576/raw/0a0b29a7d5343713c82d5930137b1c3cf9066ad0/seed-stars.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const starData = await response.json();

        //Find a galaxy by name
        const getGalaxyIdByName = async (name) => {
            const result = await prisma.galaxy.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        // Patch logic
        for (const star of starData) {
            star.galaxyId = await getGalaxyIdByName("Milky Way");
        }

        //Find a constellation by name
        const getConstellationIdByName = async (name) => {
            const result = await prisma.constellation.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        starData[1].constellationId = await getConstellationIdByName("Orion"); //Betelgeuse

        starData[4].constellationId = await getConstellationIdByName("Orion"); //Rigel

        starData[7].constellationId = await getConstellationIdByName("Cygnus"); //Deneb

        starData[14].constellationId = await getConstellationIdByName("Scorpius"); //Antares

        starData[15].constellationId = await getConstellationIdByName("Taurus"); //Aldebaran

        starData[16].constellationId = await getConstellationIdByName("Leo"); //Wolf 359
 
        const data = await Promise.all(
            starData.map(async (star) => {
                validateStar(star);
                return { ...star };
            })
        );

        await prisma.star.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Stars successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedStarsFromGitHub();