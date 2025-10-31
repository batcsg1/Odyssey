import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
import { CometType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let starId;
let cometId;
let token;

describe("Comets", () => {
    before(async () => {
        const star = await prisma.star.findFirst();
        starId = star.id;
    });

    it("should reject missing token", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/comets");

        chai.expect(res.body.message).to.be.equal("No token provided");
    });

    it("should login an admin user, return a token, and not have X-Powered-By header", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/auth/login")
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

    it("should create a valid comet", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/comets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Halley's Comet",
                age: 4.5e9,
                mass: 2.2e14,
                diameter: 11,
                density: 0.6,
                type: "SHORT_PERIOD",
                year: 75,
                perigee: 0.586,
                apogee: 35.1,
                brightness: -1,
                location: "KUIPER_BELT",
                starId
            });
        chai
            .expect(res.body.message)
            .to.be.equal("Comet successfully created");
        cometId = res.body.data.id;
    });

    it("should create another valid comet", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/comets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Hale-Bopp",
                age: 4.5e9,
                mass: 1e14,
                diameter: 60,
                density: 0.5,
                type: "LONG_PERIOD",
                year: 2533,
                perigee: 0.914,
                apogee: 370,
                brightness: -1.5,
                location: "OORT_CLOUD",
                starId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Comet successfully created");
    });

    it("should paginate for 2 comets", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/comets?page=1&amount=2")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.count).to.be.equal(2);
    });

    it("should reject missing star ID", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/comets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Hale-Bopp",
                age: 4.5e9,
                mass: 1e14,
                diameter: 60,
                density: 0.5,
                type: "LONG_PERIOD",
                year: 2533,
                perigee: 0.914,
                apogee: 370,
                brightness: -1.5,
                location: "OORT_CLOUD"
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Star ID is required");
    });

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/comets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: 2747,
                age: 4.5e9,
                mass: 1e14,
                diameter: 60,
                density: 0.5,
                type: "LONG_PERIOD",
                year: 2533,
                perigee: 0.914,
                apogee: 370,
                brightness: -1.5,
                location: "OORT_CLOUD",
                starId
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });

    it("should reject invalid type", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/comets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Hale-Bopp",
                age: 4.5e9,
                mass: 1e14,
                diameter: 60,
                density: 0.5,
                type: "INVALID",
                year: 2533,
                perigee: 0.914,
                apogee: 370,
                brightness: -1.5,
                location: "OORT_CLOUD",
                starId
            });

        chai.expect(res.body.message).to.be.equal(`Type must be one of the following: ${Object.values(CometType)}`);
    });

    it("should reject non-numeric mass", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/comets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Hale-Bopp",
                age: 4.5e9,
                mass: "1e14",
                diameter: 60,
                density: 0.5,
                type: "LONG_PERIOD",
                year: 2533,
                perigee: 0.914,
                apogee: 370,
                brightness: -1.5,
                location: "OORT_CLOUD",
                starId
            });

        chai.expect(res.body.message).to.be.equal("Mass should be a number");
    });

    it("should retrieve all comets", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/comets")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a comet by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1.2/comets/${cometId}`)
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data.name).to.be.equal("Halley's Comet");
    });

    it("should filter comets by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/comets?name=Hale-Bopp")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Hale-Bopp");
    });

    it("should filter comets by type", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/comets?type=SHORT_PERIOD")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].type).to.be.equal("SHORT_PERIOD");
    });

    it("should sort comets by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/comets?sortBy=name")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Hale-Bopp");
    });

    it("should reject non-numeric diameter during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1.2/comets/${cometId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Halley's Comet",
                mass: 2.2e14,
                age: 4e9,
                diameter: "11",
                density: 0.6,
                type: "SHORT_PERIOD",
                year: 75,
                perigee: 0.586,
                apogee: 35.1,
                brightness: -1,
                location: "KUIPER_BELT",
                starId
            });

        chai.expect(res.body.message).to.be.equal("Diameter should be a number");
    });

    it("should update a valid comet", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1.2/comets/${cometId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Halley's Comet",
                mass: 2.2e14,
                age: 4.5e9,
                diameter: 11,
                density: 0.6,
                type: "SHORT_PERIOD",
                year: 75,
                perigee: 0.586,
                apogee: 35.1,
                brightness: -1,
                location: "KUIPER_BELT",
                starId
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Comet with the id: ${cometId} successfully updated`
            );
    });

    it("should update one comet field", async () => {
        const res = await chai
            .request(app)
            .patch(`/api/v1.2/comets/${cometId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Halley's Comet"
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Comet with the id: ${cometId} successfully updated`
            );
    });

    it("should delete a comet by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1.2/comets/${cometId}`)
            .set("Authorization", `Bearer ${token}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Comet with the id: ${cometId} successfully deleted`
            );
    });
});
