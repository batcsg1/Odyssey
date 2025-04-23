import fs from 'node:fs';
import { csvToObj } from 'csv-to-js-parser'

import fetch from "node-fetch";

import prisma from "../../client.js";

const file = fs.readFileSync('prisma/seeding/seeding-files/normal.csv', 'utf8');

const seedNormalUsers = async () => {
    try {
        const userData = csvToObj(file, ';'); // Convert the array of objects into JSON format
        
        //Find a star by name
        const getPlanetIdByName = async (name) => {
            const result = await prisma.planet.findFirst({
                where: { name },
                select: { id: true }
            });
            return result?.id || null;
        };
        
        const earthId = await getPlanetIdByName("Earth");

        const data = await Promise.all(
            userData.map(async (user) => {
                return { 
                    ...user,
                    homePlanet: earthId,
                    loginAttempts: parseInt(user.loginAttempts), // Ensure this is a number
                 };
            })
        );

        console.log(data)

        await prisma.user.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Normal Users successfully seeded from CSV file");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedNormalUsers();