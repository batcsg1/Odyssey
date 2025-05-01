import fetch from "node-fetch";

import prisma from "../../client.js";

import { validatePostConstellation } from "../../../middleware/validation/constellation.js";

// Simulate an Express-like request and response for validation
const validateConstellation = (constellation) => {
  const req = { body: constellation };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message.message);
        process.exit(1);
      },
    }),
  };

  validatePostConstellation(req, res, () => {}); // Pass an empty function since we're not using next()
};

const seedConstellationsFromGitHub = async () => {
  try {
    await prisma.constellation.deleteMany(); // Delete all constellations

    const gistUrl = "https://gist.githubusercontent.com/batcsg1/87bfa3747ec34860db6b36b8c2b3a3f1/raw/743c7b55d9956d215f3e3185fdbc03d7a5cfc44c/seed-constellations.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
    const response = await fetch(gistUrl);
    const constellationData = await response.json();

    const data = await Promise.all(
      constellationData.map(async (constellation) => {
        validateConstellation(constellation);
        return { ...constellation };
      })
    );

    await prisma.constellation.createMany({
      data: data,
      skipDuplicates: true,
    });

    console.log("Constellations successfully seeded from GitHub Gist");
  } catch (err) {
    console.log("Seeding failed:", err.message);
  }
};

seedConstellationsFromGitHub();