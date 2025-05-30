import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
import { StarType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let starId;
let galaxyId;
let token;

describe("Stars", () => {
    before(async () => {
        const galaxy = await prisma.galaxy.findFirst();
        galaxyId = galaxy.id;
    });

    it("should reject missing token", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/stars");

        chai.expect(res.body.message).to.be.equal("No token provided");
    });

    it("should login an admin user, return a token, and not have X-Powered-By header", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/auth/login")
            .set("Authorization", `Bearer ${token}`)
            .send({
                emailAddress: "john.doe@example.com",
                password: "password123",
            });

        chai.expect(res).to.have.status(200); // Expect a succesfull response

        chai.expect(res.body.token).to.exist;

        token = res.body.token;

        chai.expect(res).to.not.have.header('x-powered-by') // Expect non-default header
    });

    it("should create a valid star", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/stars")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Sirius",
                age: 2.4e8,
                mass: 2.06,
                diameter: 1.71,
                type: "MAIN_SEQUENCE",
                distance: 8.6,
                temperature: 9940,
                luminosity: 25.4,
                hasPlanets: false,
                brightness: -1.46,
                galaxyId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Star successfully created");
        starId = res.body.data.id;
    });

    it("should create another valid star", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/stars")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Betelgeuse",
                age: 8.0e6,
                mass: 20.0,
                diameter: 887,
                type: "RED_GIANT",
                distance: 642.5,
                temperature: 3500,
                luminosity: 126000,
                hasPlanets: false,
                brightness: 0.42,
                galaxyId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Star successfully created");
    });

    it("should reject missing galaxy ID", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/stars")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Betelgeuse",
                age: 8.0e6,
                mass: 20.0,
                diameter: 887,
                type: "RED_GIANT",
                distance: 642.5,
                temperature: 3500,
                luminosity: 126000,
                hasPlanets: false,
                brightness: 0.42
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Galaxy ID is required");
    });

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/stars")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: 2324,
                age: 8.0e6,
                mass: 20.0,
                diameter: 887,
                type: "RED_GIANT",
                distance: 642.5,
                temperature: 3500,
                luminosity: 126000,
                hasPlanets: false,
                brightness: 0.42,
                galaxyId
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });

    it("should reject invalid type", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/stars")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Betelgeuse",
                age: 8.0e6,
                mass: 20.0,
                diameter: 887,
                type: "INVALID",
                distance: 642.5,
                temperature: 3500,
                luminosity: 126000,
                hasPlanets: false,
                brightness: 0.42,
                galaxyId
            });

        chai.expect(res.body.message).to.be.equal(`Type must be one of the following: ${Object.values(StarType)}`);
    });

    it("should reject non-numeric distance", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/stars")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Betelgeuse",
                age: 8.0e6,
                mass: 20.0,
                diameter: 887,
                type: "RED_GIANT",
                distance: "642.5",
                temperature: 3500,
                luminosity: 126000,
                hasPlanets: false,
                brightness: 0.42,
                galaxyId
            });

        chai.expect(res.body.message).to.be.equal("Distance should be a number");
    });

    it("should retrieve all stars", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/stars")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a star by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/stars/${starId}`)
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data.name).to.be.equal("Sirius");
    });

    it("should filter stars by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/stars?name=Betelgeuse")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Betelgeuse");
    });

    it("should filter stars by type", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/stars?type=MAIN_SEQUENCE")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].type).to.be.equal("MAIN_SEQUENCE");
    });

    it("should sort stars by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/stars?sortBy=name")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Betelgeuse");
    });

    it("should reject non-numeric diameter during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/stars/${starId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Betelgeuse",
                age: 8.0e6,
                mass: 20.0,
                diameter: "887",
                type: "RED_GIANT",
                distance: 642.5,
                temperature: 3500,
                luminosity: 126000,
                hasPlanets: false,
                brightness: 0.42,
                galaxyId
            });

        chai.expect(res.body.message).to.be.equal("Diameter should be a number");
    });

    it("should update a valid star", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/stars/${starId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Betelgeuse",
                age: 8.0e6,
                mass: 20.0,
                diameter: 887,
                type: "RED_GIANT",
                distance: 642.5,
                temperature: 3500,
                luminosity: 126000,
                hasPlanets: false,
                brightness: 0.42,
                galaxyId
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Star with the id: ${starId} successfully updated`
            );
    });

    it("should delete a star by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/stars/${starId}`)
            .set("Authorization", `Bearer ${token}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Star with the id: ${starId} successfully deleted`
            );
    });
});
