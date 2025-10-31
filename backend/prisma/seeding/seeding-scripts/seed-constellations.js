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
        name: "Leo",
        shape: "Hunter",
        area: 947.0,
        abbreviation: "Leo"
      },
      {
        name: "Sagittarius",
        shape: "Archer",
        area: 867.0,
        abbreviation: "Sgr"
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
