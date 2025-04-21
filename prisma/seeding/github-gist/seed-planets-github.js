import fetch from "node-fetch";

import prisma from "../../client.js";

import { validatePostPlanet } from "../../../middleware/validation/planet.js";

// Simulate an Express-like request and response for validation
const validatePlanet = (planet) => {
    const req = { body: planet };
    const res = {
        status: (code) => ({
            json: (message) => {
                console.log(message.message);
                process.exit(1);
            },
        }),
    };

    validatePostPlanet(req, res, () => { }); // Pass an empty function since we're not using next()
};

const seedStarsFromGitHub = async () => {
    try {
        const gistUrl = "https://gist.githubusercontent.com/batcsg1/30beebce4af6d4adee336c9ab988373d/raw/2758574a8083de6cf3539ffac4cf0fa16f919060/seed-planets.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const planetData = await response.json();

        //Find a star by name
        const getStarIdByName = async (name) => {
            const result = await prisma.star.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        // Patch logic
        for (const planet of planetData) {
            planet.starId = await getStarIdByName("Sun");
        }

        const data = await Promise.all(
            planetData.map(async (planet) => {
                validatePlanet(planet);
                return { ...planet };
            })
        );

        await prisma.planet.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Planets successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedStarsFromGitHub();