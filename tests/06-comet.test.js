import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
import { CometType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let starId;
let cometId;

describe("Comets", () => {
    before(async () => {
        const star = await prisma.star.findFirst();
        starId = star.id;
    });

    it("should create a valid comet", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/comets")
            .send({
                name: "Halley's Comet",
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
        cometId = res.body.data[0].id;
    });

    it("should create another valid comet", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/comets")
            .send({
                name: "Hale-Bopp",
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

    it("should reject missing star ID", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/comets")
            .send({
                name: "Hale-Bopp",
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
            .post("/api/v1/comets")
            .send({
                name: 2747,
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
            .post("/api/v1/comets")
            .send({
                name: "Hale-Bopp",
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
            .post("/api/v1/comets")
            .send({
                name: "Hale-Bopp",
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
            .get("/api/v1/comets");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a comet by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/comets/${cometId}`);

        chai.expect(res.body.data.name).to.be.equal("Halley's Comet");
    });

    it("should filter comets by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/comets?name=Halley's Comet");

        chai.expect(res.body.data[0].name).to.be.equal("Halley's Comet");
    });

    it("should filter comets by type", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/comets?type=SHORT_PERIOD");

        chai.expect(res.body.data[0].type).to.be.equal("SHORT_PERIOD");
    });

    it("should sort comets by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/comets?sortBy=name");

        chai.expect(res.body.data[0].name).to.be.equal("Halley's Comet");
    });

    it("should reject non-numeric diameter during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/comets/${cometId}`)
            .send({
                name: "Halley's Comet",
                mass: 2.2e14,
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
            .put(`/api/v1/comets/${cometId}`)
            .send({
                name: "Updated Halley's Comet",
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
            .to.be.equal(
                `Comet with the id: ${cometId} successfully updated`
            );
    });

    it("should delete a comet by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/comets/${cometId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Comet with the id: ${cometId} successfully deleted`
            );
    });
});
