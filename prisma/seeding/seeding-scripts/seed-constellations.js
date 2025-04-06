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

const seedConstellations = async () => {
  try {
    // Delete all existing constellations
    await prisma.constellation.deleteMany();

    const constellationData = [
      {
        name: "Orion",
        right_ascension: 5.585,
        declination: -5.909,
        shape: "Hunter",
        area: 594.0
      },
      {
        name: "Ursa Major",
        right_ascension: 11.062,
        declination: 55.324,
        shape: "Bear",
        area: 1280.0
      },
    ];

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

    console.log("Constellations successfully seeded");
  } catch (err) {
    console.log("Seeding failed:", err.message);
  }
};

seedConstellations();
