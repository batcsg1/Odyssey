import fs from 'node:fs';

import bcryptjs from "bcryptjs";

import prisma from "../../client.js";

const file = fs.readFileSync('prisma/seeding/seeding-files/admin.json', 'utf8');

const seedAdminUsers = async () => {
    try {
        const userData = JSON.parse(file); // Parse the file into JSON
    
        const data = await Promise.all(
            userData.map(async (user) => {
                const salt = await bcryptjs.genSalt();
                const hashedPassword = await bcryptjs.hash(user.password, salt);
        
                return { 
                    ...user,
                    password: hashedPassword  // <-- replace plain password with hashed
                };
            })
        );

        //console.log(data);

        await prisma.user.createMany({
            data: data,
            skipDuplicates: true,
        });

        console.log("Admin Users successfully seeded from JSON file");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedAdminUsers();