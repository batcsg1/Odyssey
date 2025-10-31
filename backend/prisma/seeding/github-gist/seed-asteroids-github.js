import fetch from "node-fetch";

import prisma from "../../client.js";

import { validatePostAsteroid } from "../../../middleware/validation/asteroid.js";

// Simulate an Express-like request and response for validation
const validateAsteroid = (asteroid) => {
    const req = { body: asteroid };
    const res = {
        status: (code) => ({
            json: (message) => {
                console.log(message.message);
                process.exit(1);
            },
        }),
    };

    validatePostAsteroid(req, res, () => { }); // Pass an empty function since we're not using next()
};

const seedAsteroidsFromGitHub = async () => {
    try {
        await prisma.asteroid.deleteMany(); // Delete all asteroids

        const gistUrl = "https://gist.githubusercontent.com/batcsg1/7baba6ac9c1b9ddf0e62f7d8a80ff358/raw/0002a79578cdb41daec85df2f1031c62f1311dba/seed-asteroids.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const asteroidData = await response.json();

        //Find a star by name
        const getStarIdByName = async (name) => {
            const result = await prisma.star.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        // Patch logic
        for (const asteroid of asteroidData) {
            asteroid.starId = await getStarIdByName("Sun");
        }

        const data = await Promise.all(
            asteroidData.map(async (asteroid) => {
                validateAsteroid(asteroid);
                return { ...asteroid };
            })
        );

        await prisma.asteroid.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Asteroids successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedAsteroidsFromGitHub();