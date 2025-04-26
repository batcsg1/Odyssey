import fs from 'node:fs';
import { csvToObj } from 'csv-to-js-parser'

import bcryptjs from "bcryptjs";

import prisma from "../../client.js";

const file = fs.readFileSync('prisma/seeding/seeding-files/normal.csv', 'utf8');

const seedNormalUsers = async () => {
    try {
        const userData = csvToObj(file, ';'); // Convert the array of objects into JSON format
    
        const data = await Promise.all(
            userData.map(async (user) => {
                const salt = await bcryptjs.genSalt();
                const hashedPassword = await bcryptjs.hash(user.password, salt);
        
                return { 
                    ...user,
                    password: hashedPassword,  // <-- replace plain password with hashed
                    loginAttempts: parseInt(user.loginAttempts), 
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