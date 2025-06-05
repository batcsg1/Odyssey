import bcryptjs from "bcryptjs";
import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";

const chai = chaiModule.use(chaiHttp);

const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt();
    return bcryptjs.hash(password, salt);
};

let token;

let adminUser;
let superAdminUser;
let anotherSuperAdminUserID;
let yetAnotherSuperAdminUser;

describe("Super Admin", () => {
    before(async () => {
        adminUser = await prisma.user.findUnique({
            where: {
                emailAddress: "john.doe@example.com",
            },
        });
        superAdminUser = await prisma.user.findUnique({
            where: {
                emailAddress: "james.doe@example.com",
            },
        });
        yetAnotherSuperAdminUser = await prisma.user.findUnique({
            where: {
                emailAddress: "ian.peters@example.com",
            },
        });
        anotherSuperAdminUserID = yetAnotherSuperAdminUser.id;
    });

    it("should reject missing token", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/users");

        chai.expect(res.body.message).to.be.equal("No token provided");
    });

    it("should login a super admin user, return a token, and not have X-Powered-By header", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/auth/login")
            .set("Authorization", `Bearer ${token}`)
            .send({
                emailAddress: "james.doe@example.com",
                password: "P@ssw0rd",
            });

        chai.expect(res).to.have.status(200); // Expect a succesfull response

        chai.expect(res.body.token).to.exist;

        token = res.body.token;

        chai.expect(res).to.not.have.header('x-powered-by') // Expect non-default header
    });

    // -- SUPER_ADMIN tests --

    it("should retrieve all users", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/users")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should create a super admin user", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/users")
            .set("Authorization", `Bearer ${token}`)
            .send({
                firstName: "Vaughn",
                lastName: "Malkin",
                emailAddress: "vaughn.malkin@example.com",
                password: await hashPassword("aurora145"),
                role: "SUPER_ADMIN",
            },);

        chai
            .expect(res.body.message)
            .to.be.equal("User successfully created");
    });

    it("should retrieve a super admin by id ", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/users/${anotherSuperAdminUserID}`)
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.not.be.an("array");
    });

    // Update 

    it("should update an admin user's data", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/users/${adminUser.id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                firstName: "Patrick"
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `User with the id: ${adminUser.id} successfully updated`
            );
    });

    it("should reject a super admin user updating another super admin user", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/users/${anotherSuperAdminUserID}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                firstName: "Gen"
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                "You cannot update another super admin user"
            );
    });

    //Delete
    it("should reject deleting a super-admin user", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/users/${anotherSuperAdminUserID}`)
            .set("Authorization", `Bearer ${token}`);

        chai
            .expect(res.body.message)
            .to.be.equal("You cannot delete another super admin user");
    });

    it("should delete an admin user", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/users/${adminUser.id}`)
            .set("Authorization", `Bearer ${token}`);

        chai
            .expect(res.body.message)
            .to.be.equal(`User with the id: ${adminUser.id} successfully deleted`);
    });
});
