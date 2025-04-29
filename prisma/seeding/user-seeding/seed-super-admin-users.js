import fetch from "node-fetch";

import bcryptjs from "bcryptjs";

import prisma from "../../client.js";

const seedSuperAdminUsers = async () => {
    try {
        const gistUrl = "https://gist.githubusercontent.com/batcsg1/8ef8725ef9f45794c0fc76307378aa81/raw/2f2cbe19557d9c7dbbe9247c826df1ae2194f2bd/seed-super-admin.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
        const response = await fetch(gistUrl);
        const userData = await response.json();

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

        console.log("Super Admin Users successfully seeded from GitHub Gist");
    } catch (err) {
        console.log("Seeding failed:", err.message);
    }
};

seedSuperAdminUsers();