import fetch from "node-fetch";

import prisma from "../../client.js";

import { validatePostComet } from "../../../middleware/validation/comet.js";

// Simulate an Express-like request and response for validation
const validateComet = (comet) => {
    const req = { body: comet };
    const res = {
        status: (code) => ({
            json: (message) => {
                console.log(message.message);
                process.exit(1);
            },
        }),
    };

    validatePostComet(req, res, () => { }); // Pass an empty function since we're not using next()
};

const seedCometsFromGitHub = async () => {
    try {
        const gistUrl = "https://gist.githubusercontent.com/batcsg1/f75c3d434252b3d222c73bea8c6d06fc/raw/7ed998966cd5b625fa6a3c255a4d5af779e93154/seed-comets.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const cometData = await response.json();

        //Find a star by name
        const getStarIdByName = async (name) => {
            const result = await prisma.star.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        // Patch logic
        for (const comet of cometData) {
            comet.starId = await getStarIdByName("Sun");
        }

        const data = await Promise.all(
            cometData.map(async (comet) => {
                validateComet(comet);
                return { ...comet };
            })
        );

        await prisma.comet.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Comets successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedCometsFromGitHub();