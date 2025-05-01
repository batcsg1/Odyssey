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
        await prisma.meteorShower.deleteMany(); // Delete all meteor showers

        const gistUrl = "https://gist.githubusercontent.com/batcsg1/5471b9eaef8fffff796346f7e29bb7dc/raw/1825725fa74c6b4157195bae94fdc6fa2ed0ae83/seed-meteor-showers.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const showerData = await response.json();

        // Find a comet by name
        const getCometIdByName = async (name) => {
            const result = await prisma.comet.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        // Find a constellation by name
        const getConstellationIdByName = async (name) => {
            const result = await prisma.constellation.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        showerData[0].comets = [];
        showerData[0].comets.push("Halley's Comet");
        showerData[0].constellationId = await getConstellationIdByName("Orion");

        //showerData[1].comets = []; // Add if needed
        showerData[1].constellationId = await getConstellationIdByName("Leo");

        //showerData[2].comets = []; // Add if needed
        showerData[2].constellationId = await getConstellationIdByName("Draco");

        showerData[3].comets = [];
        showerData[3].comets.push("Encke's Comet");
        showerData[3].constellationId = await getConstellationIdByName("Taurus");

        showerData[4].comets = [];
        showerData[4].comets.push("Halley's Comet");
        showerData[4].constellationId = await getConstellationIdByName("Aquarius");


        const data = await Promise.all(
            showerData.map(async (shower) => {
                // Ensure comet names are provided
                const cometNames = shower.comets || [];

                // Resolve names to comet UUIDs
                const cometIds = await Promise.all(
                    cometNames.map(async (cometName) => {
                        const cometId = await getCometIdByName(cometName);
                        return cometId; // Return just the UUID (string), for validation
                    })
                );

                // Add UUIDs directly to shower for validation
                const showerForValidation = {
                    ...shower,
                    comets: cometIds,
                };

                // Validate with UUIDs
                validateMeteorShower(showerForValidation);

                // Prepare for Prisma
                const meteorShowerData = {
                    ...shower,
                    comets: cometIds.length > 0
                        ? { connect: cometIds.map(id => ({ id })) }
                        : undefined,
                };

                return meteorShowerData;
            })
        );

        console.log(data)

        for (const shower of data) {
            await prisma.meteorShower.create({
                data: shower
            });
        }

        console.log("Meteor showers successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedMeteorShowersFromGitHub();