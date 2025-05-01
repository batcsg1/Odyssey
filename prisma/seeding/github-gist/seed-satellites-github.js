import fetch from "node-fetch";

import prisma from "../../client.js";

import { validatePostSatellite } from "../../../middleware/validation/satellite.js";

// Simulate an Express-like request and response for validation
const validateSatellite = (satellite) => {
    const req = { body: satellite };
    const res = {
        status: (code) => ({
            json: (message) => {
                console.log(message.message);
                process.exit(1);
            },
        }),
    };

    validatePostSatellite(req, res, () => { }); // Pass an empty function since we're not using next()
};

const seedSatellitesFromGitHub = async () => {
    try {
        await prisma.satellite.deleteMany(); // Delete all constellations

        const gistUrl = "https://gist.githubusercontent.com/batcsg1/cf11503fc54c0c0b91ff315a4e185cb7/raw/86b4201a53924402f9a1efe59b0f3ee50abbe10b/seed-satellites.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const satelliteData = await response.json();

        //Find a star by name
        const getPlanetIdByName = async (name) => {
            const result = await prisma.planet.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };

        // Patch logic
        satelliteData[0].planetId = await getPlanetIdByName("Earth"); //The Moon

        // Mars moons
        for (let i = 1; i <=2; i++) {
            satelliteData[i].planetId = await getPlanetIdByName("Mars");
        } 
        // Jupiter moons
        for (let i = 3; i <=6; i++) {
            satelliteData[i].planetId = await getPlanetIdByName("Jupiter");
        }
        // Saturn moons
        for (let i = 7; i <=9; i++) {
            satelliteData[i].planetId = await getPlanetIdByName("Saturn");
        }
        // Uranus moons
        for (let i = 10; i <=13; i++) {
            satelliteData[i].planetId = await getPlanetIdByName("Uranus");
        }
        // Neptune moons
        satelliteData[14].planetId = await getPlanetIdByName("Neptune"); //Triton

        // Pluto moons
        satelliteData[15].planetId = await getPlanetIdByName("Pluto"); //Charon

        // Haumea moons
        satelliteData[16].planetId = await getPlanetIdByName("Haumea"); //Namaka

        // Haumea moons
        satelliteData[17].planetId = await getPlanetIdByName("Makemake"); //MK1

        // Haumea moons
        satelliteData[18].planetId = await getPlanetIdByName("Eris"); //Dysnomia

        const data = await Promise.all(
            satelliteData.map(async (satellite) => {
                validateSatellite(satellite);
                return { ...satellite };
            })
        );

        await prisma.satellite.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Satellites successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedSatellitesFromGitHub();