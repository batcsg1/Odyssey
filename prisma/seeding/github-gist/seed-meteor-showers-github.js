import fetch from "node-fetch";

import prisma from "../../client.js";

import { validatePostMeteorShower } from "../../../middleware/validation/meteor_shower.js";

// Simulate an Express-like request and response for validation
const validateMeteorShower = (shower) => {
    const req = { body: shower };
    const res = {
        status: (code) => ({
            json: (message) => {
                console.log(message.message);
                process.exit(1);
            },
        }),
    };

    validatePostMeteorShower(req, res, () => { }); // Pass an empty function since we're not using next()
};

const seedMeteorShowersFromGitHub = async () => {
    try {
        const gistUrl = "https://gist.githubusercontent.com/batcsg1/5471b9eaef8fffff796346f7e29bb7dc/raw/1825725fa74c6b4157195bae94fdc6fa2ed0ae83/seed-meteor-showers.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const showerData = await response.json();

        //Find a comet by name
        const getCometIdByName = async (name) => {
            const result = await prisma.comet.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };
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
        showerData[0].cometId = await getCometIdByName("Halley's Comet");
        showerData[0].constellationId = await getConstellationIdByName("Orion");

        showerData[1].constellationId = await getConstellationIdByName("Leo");

        showerData[2].constellationId = await getConstellationIdByName("Draco");

        showerData[3].cometId = await getCometIdByName("Encke's Comet");
        showerData[3].constellationId = await getConstellationIdByName("Taurus");

        showerData[4].cometId = await getCometIdByName("Halley's Comet");
        showerData[4].constellationId = await getConstellationIdByName("Aquarius");


   

        const data = await Promise.all(
            showerData.map(async (shower) => {
                validateMeteorShower(shower);
                return { ...shower };
            })
        );

        await prisma.meteorShower.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Meteor showers successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedMeteorShowersFromGitHub();