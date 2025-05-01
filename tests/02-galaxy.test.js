import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
import { GalaxyType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let galaxyId;
let constellationId;

describe("Galaxies", () => {
    before(async () => {
        const constellation = await prisma.constellation.findFirst();

        constellationId = constellation.id;
    });

    it("should create a valid galaxy", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/galaxies")
            .send({
                name: "Andromeda Galaxy",
                type: "BARRED_SPIRAL",
                distance: 2500000.0,
                size: 125700.0,
                brightness: 3.44
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Galaxy successfully created");
        galaxyId = res.body.data[0].id;
    });

    it("should create another valid galaxy", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/galaxies")
            .send({
                name: "Milky way",
                type: "BARRED_SPIRAL",
                distance: 2500000.0,
                size: 125700.0,
                brightness: 3.44,
                constellationId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Galaxy successfully created");
    });

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/galaxies")
            .send({
                name: 12345,
                type: "BARRED_SPIRAL",
                distance: 2500000.0,
                size: 125700.0,
                brightness: 3.44
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });
    
    it("should reject invalid type", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/galaxies")
            .send({
                name: "Whitneia",
                type: "INVALID",
                distance: 2500000.0,
                size: 125700.0,
                brightness: 3.44
            });

        chai.expect(res.body.message).to.be.equal(`Type must be one of the following: ${Object.values(GalaxyType)}`);
    });

    it("should reject non-numeric distance", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/galaxies")
            .send({
                name: "Andromeda Galaxy",
                type: "BARRED_SPIRAL",
                distance: "2500000.0", // invalid type
                size: 125700.0,
                brightness: 3.44
            });

        chai.expect(res.body.message).to.be.equal("Distance should be a number");
    });

    it("should retrieve all galaxies", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/galaxies");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a galaxy by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/galaxies/${galaxyId}`);

        chai.expect(res.body.data.name).to.be.equal("Andromeda Galaxy");
    });

    it("should filter galaxies by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/galaxies?name=Andromeda Galaxy");

        chai.expect(res.body.data[0].name).to.be.equal("Andromeda Galaxy");
    });

    it("should filter galaxies by type", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/galaxies?type=BARRED_SPIRAL");

        chai.expect(res.body.data[0].type).to.be.equal("BARRED_SPIRAL");
    });

    it("should sort galaxies by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/galaxies?sortBy=name");

        chai.expect(res.body.data[0].name).to.be.equal("Andromeda Galaxy");
    });

    it("should reject non-numeric size during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/galaxies/${galaxyId}`)
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
            .put(`/api/v1/galaxies/${galaxyId}`)
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
            .delete(`/api/v1/galaxies/${galaxyId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Galaxy with the id: ${galaxyId} successfully deleted`
            );
    });
});
