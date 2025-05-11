import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";

const chai = chaiModule.use(chaiHttp);

let planetId;
let meteoriteId;

describe("Meteorites", () => {
    before(async () => {
        const planet = await prisma.planet.findFirst();
        planetId = planet.id;
    });

    it("should create a valid meteorite", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteorites")
            .send({
                name: "Hoba",
                age: 60000000,
                foundYear: 1920,
                mass: 60000,
                diameter: 0.0027,
                location: "Grootfontein, Namibia",
                planetId
            });
        chai
            .expect(res.body.message)
            .to.be.equal("Meteorite successfully created");
        meteoriteId = res.body.data[0].id;
    });

    it("should create another valid meteorite", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteorites")
            .send({
                name: "Willamette",
                age: 100000000,
                foundYear: 1902,
                mass: 15000,
                diameter: 0.0023,
                location: "Oregon, United States",
                planetId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Meteorite successfully created");
    });

    it("should reject missing planet ID", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteorites")
            .send({
                name: "Willamette",
                age: 100000000,
                foundYear: 1902,
                mass: 15000,
                diameter: 0.0023,
                location: "Oregon, United States"
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Planet ID is required");
    });

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteorites")
            .send({
                name: 256,
                age: 100000000,
                foundYear: 1902,
                mass: 15000,
                diameter: 0.0023,
                location: "Oregon, United States",
                planetId
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });

    it("should reject non-numeric mass", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteorites")
            .send({
                name: "Willamette",
                age: 100000000,
                foundYear: 1902,
                mass: "15000",
                diameter: 0.0023,
                location: "Oregon, United States",
                planetId
            });

        chai.expect(res.body.message).to.be.equal("Mass should be a number");
    });

    it("should retrieve all meteorites", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/meteorites");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a meteorite by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/meteorites/${meteoriteId}`);

        chai.expect(res.body.data.name).to.be.equal("Hoba");
    });

    it("should filter meteorites by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/meteorites?name=Hoba");

        chai.expect(res.body.data[0].name).to.be.equal("Hoba");
    });


    it("should sort meteorites by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/meteorites?sortBy=name");

        chai.expect(res.body.data[0].name).to.be.equal("Hoba");
    });

    it("should reject non-numeric diameter during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/meteorites/${meteoriteId}`)
            .send({
                name: "Willamette",
                age: 100000000,
                foundYear: 1902,
                mass: 15000,
                diameter: "0.0023",
                location: "Oregon, United States",
                planetId
            });

        chai.expect(res.body.message).to.be.equal("Diameter should be a number");
    });

    it("should update a valid meteorite", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/meteorites/${meteoriteId}`)
            .send({
                name: "Updated Hoba",
                age: 60000000,
                foundYear: 1920,
                mass: 60000,
                diameter: 0.0027,
                location: "Grootfontein, Namibia",
                planetId
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Meteorite with the id: ${meteoriteId} successfully updated`
            );
    });

    it("should delete a meteorite by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/meteorites/${meteoriteId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Meteorite with the id: ${meteoriteId} successfully deleted`
            );
    });
});
