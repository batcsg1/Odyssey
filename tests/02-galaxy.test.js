import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

import { GalaxyType } from "@prisma/client";

let constellationId;

let galaxyId;
let token;

describe("Galaxies", () => {
    before(async () => {
        it("should reject missing token", async () => {
            const res = await chai
                .request(app)
                .get("/api/v1/constellations");

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

        it("should create a valid constellation", async () => {
            const res = await chai
                .request(app)
                .post("/api/v1/constellations")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    name: "Gemini",
                    shape: "Gem",
                    area: 100,
                    abbreviation: "Gem"
                });

            chai
                .expect(res.body.message)
                .to.be.equal("Constellation successfully created");
            constellationId = res.body.data[0].id;
        });
    });

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/galaxies")
            .send({
                name: 250,
                type: "SPIRAL",
                distance: 800,
                size: 450,
                brightness: 20,
                constellationId
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });

    it("should create a valid galaxy", async () => {
        const res = await chai.request(app).post("/api/v1/galaxies").send({
            name: "Andromeda",
            type: "SPIRAL",
            distance: 800,
            size: 450,
            brightness: 20,
            constellationId
        });

        chai
            .expect(res.body.message)
            .to.be.equal("Galaxy successfully created");
        galaxyId = res.body.data[0].id;
    });

    it("should create another valid galaxy", async () => {
        const res = await chai.request(app).post("/api/v1/galaxies").send({
            name: "Pinwheel",
            type: "IRREGULAR",
            distance: 1e8,
            size: 20000,
            brightness: 5,
            constellationId
        });

        chai
            .expect(res.body.message)
            .to.be.equal("Galaxy successfully created");
    });

    it("should retrieve all galaxies", async () => {
        const res = await chai.request(app).get("/api/v1/galaxies");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a galaxy by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/galaxies/${galaxyId}`);

        chai.expect(res.body.data.name).to.be.equal("Andromeda");
    });

    it("should filter galaxies by name", async () => {
        const res = await chai.request(app).get("/api/v1/galaxies?name=Andromeda");

        chai.expect(res.body.data[0].name).to.be.equal("Andromeda");
    });

    it("should sort constellations by name", async () => {
        const res = await chai.request(app).get("/api/v1/galaxies?sortBy=name");

        chai.expect(res.body.data[0].name).to.be.equal("Andromeda");
    });

    it("should reject non-numeric distance during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/galaxies/${galaxyId}`)
            .send({
                name: "Andromeda",
                type: "SPIRAL",
                distance: "Distance",
                size: 450,
                brightness: 20,
                constellationId
            });

        chai.expect(res.body.message).to.be.equal("Distance should be a number");
    });

    it("should reject invalid type during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/galaxies/${galaxyId}`)
            .send({
                name: "Andromeda",
                type: "INVALID",
                distance: 800,
                size: 450,
                brightness: 20,
                constellationId
            });

        chai.expect(res.body.message).to.be.equal(`Type must be one of the following: ${Object.values(GalaxyType)}`);
    });

    it("should update a valid constellation", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/galaxies/${galaxyId}`)
            .send({
                name: "Updated Andromeda",
                type: "SPIRAL",
                distance: 800,
                size: 450,
                brightness: 20,
                constellationId
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Galaxy with the id: ${galaxyId} successfully updated`
            );
    });

    it("should delete a galaxy by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/galaxies/${galaxyId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Galaxy with the id: ${galaxyId} successfully deleted`
            );
    });
});
