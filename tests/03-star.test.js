import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
import { StarType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let starId;
let galaxyId;

describe("Stars", () => {
    before(async () => {
        const galaxy = await prisma.galaxy.findFirst();

        galaxyId = galaxy.id;
    });

    it("should create a valid star", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/stars")
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
        galaxyId = res.body.data[0].id;
    });

    it("should create another valid star", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/stars")
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

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/stars")
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

    it("should retrieve all galaxies", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/stars");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a galaxy by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/stars/${st}`);

        chai.expect(res.body.data.name).to.be.equal("Andromeda Galaxy");
    });

    it("should filter galaxies by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/stars?name=Andromeda Galaxy");

        chai.expect(res.body.data[0].name).to.be.equal("Andromeda Galaxy");
    });

    it("should filter galaxies by type", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/stars?type=BARRED_SPIRAL");

        chai.expect(res.body.data[0].type).to.be.equal("BARRED_SPIRAL");
    });

    it("should sort galaxies by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/stars?sortBy=name");

        chai.expect(res.body.data[0].name).to.be.equal("Andromeda Galaxy");
    });

    it("should reject non-numeric size during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/stars/${galaxyId}`)
            .send({
                name: "Andromeda Galaxy",
                type: "BARRED_SPIRAL",
                distance: 2500000.0,
                size: "125700.0", // invalid type
                brightness: 3.44
            });

        chai.expect(res.body.message).to.be.equal("Size should be a number");
    });

    it("should update a valid galaxy", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/stars/${galaxyId}`)
            .send({
                name: "Updated Andromeda Galaxy",
                type: "BARRED_SPIRAL",
                distance: 2700000.0,
                size: 125700.0,
                brightness: 3.44
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
            .delete(`/api/v1/stars/${galaxyId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Galaxy with the id: ${galaxyId} successfully deleted`
            );
    });
});
