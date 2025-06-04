import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

let token;
let userId;

describe("Users", () => {
    it("should reject missing token", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/users");

        chai.expect(res.body.message).to.be.equal("No token provided");
    });

    it("should login a normal user, return a token, and not have X-Powered-By header", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/auth/login")
            .set("Authorization", `Bearer ${token}`)
            .send({
                emailAddress: "david.bowie@example.com",
                password: "putonredshoes123",
            });

        chai.expect(res).to.have.status(200); // Expect a succesfull response

        chai.expect(res.body.token).to.exist;

        token = res.body.token;

        chai.expect(res).to.not.have.header('x-powered-by') // Expect non-default header
    });

    // NORMAL tests
   
    it("should retrieve a normal user's own data when retrieving all users", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/users")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.count).to.be.equal(1);
    });

    it("should retrieve the current normal user by ID when retrieving users by ID ", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/users/${userId}`)
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.not.be.an("array");
    });

    // it("should create a valid constellation", async () => {
    //     const res = await chai
    //         .request(app)
    //         .post("/api/v1/users")
    //         .set("Authorization", `Bearer ${token}`)
    //         .send({
    //             name: "Canis Majora",
    //             shape: "Bull",
    //             area: 237.4,
    //             abbreviation: "CMa"
    //         });

    //     chai
    //         .expect(res.body.message)
    //         .to.be.equal("Constellation successfully created");
    //     userId = res.body.data.id;
    // });

    // it("should filter constellations by name", async () => {
    //     const res = await chai
    //         .request(app)
    //         .get("/api/v1/users?name=Canis Majora")
    //         .set("Authorization", `Bearer ${token}`);

    //     chai.expect(res.body.data[0].name).to.be.equal("Canis Majora");
    // });

    // it("should sort constellations by name", async () => {
    //     const res = await chai
    //         .request(app)
    //         .get("/api/v1/users?sortBy=name")
    //         .set("Authorization", `Bearer ${token}`);

    //     chai.expect(res.body.data[0].name).to.be.equal("Canis Majora");
    // });

    // it("should reject non-numeric area during update", async () => {
    //     const res = await chai
    //         .request(app)
    //         .put(`/api/v1/users/${userId}`)
    //         .set("Authorization", `Bearer ${token}`)
    //         .send({
    //             name: "Canis Majora",
    //             shape: "Bull",
    //             area: "237.4",
    //             abbreviation: "CMa"
    //         });

    //     chai.expect(res.body.message).to.be.equal("Area should be a number");
    // });

    // it("should update a valid constellation", async () => {
    //     const res = await chai
    //         .request(app)
    //         .put(`/api/v1/users/${userId}`)
    //         .set("Authorization", `Bearer ${token}`)
    //         .send({
    //             name: "Updated Canis Majora",
    //             shape: "Cow",
    //             area: 237.4,
    //             abbreviation: "CMa"
    //         });

    //     chai
    //         .expect(res.body.message)
    //         .to.be.equal(
    //             `Constellation with the id: ${userId} successfully updated`
    //         );
    // });

    // it("should update one field of a valid constellation", async () => {
    //     const res = await chai
    //         .request(app)
    //         .put(`/api/v1/users/${userId}`)
    //         .set("Authorization", `Bearer ${token}`)
    //         .send({
    //             name: "Yet another updated Canis Majora",
    //         });

    //     chai
    //         .expect(res.body.message)
    //         .to.be.equal(
    //             `Constellation with the id: ${userId} successfully updated`
    //         );
    // });

    // it("should delete a constellation by ID", async () => {
    //     const res = await chai
    //         .request(app)
    //         .delete(`/api/v1/users/${userId}`)
    //         .set("Authorization", `Bearer ${token}`);

    //     chai
    //         .expect(res.body.message)
    //         .to.be.equal(
    //             `Constellation with the id: ${userId} successfully deleted`
    //         );
    // });
});
