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
        await prisma.user.createMany({
            data: [
                {
                    firstName: "David",
                    lastName: "Bowie",
                    emailAddress: "david.bowie@example.com",
                    password: await hashPassword("putonredshoes123"),
                    role: "NORMAL",
                },
                {
                    firstName: "John",
                    lastName: "Doe",
                    emailAddress: "john.doe@example.com",
                    password: await hashPassword("password123"),
                    role: "ADMIN",
                },
                {
                    firstName: "James",
                    lastName: "Doe",
                    emailAddress: "james.doe@example.com",
                    password: await hashPassword("P@ssw0rd"),
                    role: "SUPER_ADMIN",
                },
            ]
        })
    });
    it("should login a normal user and return a token", async () => {
        const res = await chai.request(app).post("/api/v1/auth/login").send({
            emailAddress: "david.bowie@example.com",
            password: "putonredshoes123",
        });

        chai.expect(res).to.have.status(200); // Expect a succesfull response

        chai.expect(res.body.token).to.exist;

    });

    it("should login an admin user, return a token", async () => {
        const res = await chai.request(app).post("/api/v1/auth/login").send({
            emailAddress: "john.doe@example.com",
            password: "password123",
        });

        chai.expect(res).to.have.status(200); // Expect a succesfull response
        chai.expect(res.body.token).to.exist;

    });

    it("should login a super admin user, return a token, and not have X-Powered-By header", async () => {
        const res = await chai.request(app).post("/api/v1/auth/login").send({
            emailAddress: "james.doe@example.com",
            password: "P@ssw0rd",
        });

        chai.expect(res).to.have.status(200); // Expect a succesfull response
        chai.expect(res.body.token).to.exist;
        chai.expect(res).to.not.have.header('x-powered-by') // Expect non-default header
    });

    it("should register a normal user", async () => {
        const res = await chai.request(app).post("/api/v1/auth/register").send({
            firstName: "Tom",
            lastName: "Doe",
            emailAddress: "tom.doe@example.com",
            password: await hashPassword("default_pass123"),
            role: "NORMAL"
        });

        chai.expect(res).to.have.status(201); // Expect a succesfull response
        chai.expect(res.body.message).to.be.equal("User successfully registered");
    });

    it("should reject non-normal user registration", async () => {
        const res = await chai.request(app).post("/api/v1/auth/register").send({
            firstName: "Gordon",
            lastName: "Doe",
            emailAddress: "gordon.doe@example.com",
            password: await hashPassword("default_pass123"),
            role: "ADMIN"
        });

        chai.expect(res).to.have.status(403); // Expect a succesfull response
        chai.expect(res.body.message).to.be.equal("User must register as a normal user");
    });
});