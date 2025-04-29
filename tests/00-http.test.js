import bcryptjs from "bcryptjs";
import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it, before } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";

const chai = chaiModule.use(chaiHttp);

const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt();
    return bcryptjs.hash(password, salt);
};

describe("Auth", () => {
    before(async () => {
        // Ensure a fresh admin user exists in the database
        await prisma.user.create({
            data: {
                firstName: "John",
                lastName: "Doe",
                emailAddress: "john.doe@example.com",
                password: await hashPassword("password123"),
                role: "ADMIN",
            },
        });
    });

    it("should login an admin user, return a token, and not have X-Powered-By header", async () => {
        const res = await chai.request(app).post("/api/v1/auth/login").send({
            emailAddress: "john.doe@example.com",
            password: "password123",
        });

        chai.expect(res).to.have.status(200); // Expect a succesfull response

        chai.expect(res.body.token).to.exist;
        
        chai.expect(res).to.not.have.header('x-powered-by') // Expect non-default header
    });
});