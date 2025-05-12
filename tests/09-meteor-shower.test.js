import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";

const chai = chaiModule.use(chaiHttp);

let meteorShowerId;
let cometId;
let asteroidId;
let constellationId;

describe("Meteor Showers", () => {
    before(async () => {
        const comet = await prisma.comet.findFirst();
        cometId = comet.id;

        const asteroid = await prisma.asteroid.findFirst();
        asteroidId = asteroid.id;

        const constellation = await prisma.constellation.findFirst();
        constellationId = constellation.id;
    });

    it("should create a valid shower", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteor_showers")
            .send({
                name: "Orionids",
                previousYear: 2024,
                nextYear: 2025,
                initialDate: "2024-11-06T00:00:00.000Z",
                finalDate: "2024-11-30T00:00:00.000Z",
                frequency: 30,
                duration: 6,
                velocity: 66,
                perHour: 20,
                peakDate: "2024-11-10T00:00:00.000Z",
                constellationId
            });
        chai
            .expect(res.body.message)
            .to.be.equal("Meteor shower successfully created");
        meteorShowerId = res.body.data[0].id;
    });

    it("should create another shower", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteor_showers")
            .send({
                name: "Leonids",
                previousYear: 2024,
                nextYear: 2025,
                initialDate: "2024-11-06T00:00:00.000Z",
                finalDate: "2024-11-30T00:00:00.000Z",
                frequency: 25,
                duration: 5,
                velocity: 71,
                perHour: 15,
                peakDate: "2024-11-17T00:00:00.000Z",
                comets: [cometId],
                constellationId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Meteor shower successfully created");
    });

    it("should reject invalid initial date", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteor_showers")
            .send({
                name: "Leonids",
                previousYear: 2024,
                nextYear: 2025,
                initialDate: "2024-11-30T00:00:00.000Z",
                finalDate: "2024-11-30T00:00:00.000Z",
                frequency: 25,
                duration: 5,
                velocity: 71,
                perHour: 15,
                peakDate: "2024-11-17T00:00:00.000Z",
                comets: [cometId],
                constellationId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Initial date should be a valid date");
    });

    it("should reject missing constellation ID", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteor_showers")
            .send({
                name: "Orionids",
                previousYear: 2024,
                nextYear: 2025,
                initialDate: "2024-10-02T00:00:00.000Z",
                finalDate: "2024-11-07T00:00:00.000Z",
                frequency: 30,
                duration: 6,
                velocity: 66,
                perHour: 20,
                peakDate: "2024-10-21T00:00:00.000Z"
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Constellation ID is required");
    });

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteor_showers")
            .send({
                name: 768,
                previousYear: 2024,
                nextYear: 2025,
                initialDate: "2024-10-02T00:00:00.000Z",
                finalDate: "2024-11-07T00:00:00.000Z",
                frequency: 30,
                duration: 6,
                velocity: 66,
                perHour: 20,
                peakDate: "2024-10-21T00:00:00.000Z",
                constellationId
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });

    it("should reject float next year", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/meteor_showers")
            .send({
                name: "Orionids",
                previousYear: 2024,
                nextYear: 2025.5,
                initialDate: "2024-10-02T00:00:00.000Z",
                finalDate: "2024-11-07T00:00:00.000Z",
                frequency: 30,
                duration: 6,
                velocity: 66,
                perHour: 20,
                peakDate: "2024-10-21T00:00:00.000Z",
                constellationId
            });

        chai.expect(res.body.message).to.be.equal("The next year should be an integer");
    });

    // it("should reject non-numeric next year", async () => {
    //     const res = await chai
    //         .request(app)
    //         .post("/api/v1/meteor_showers")
    //         .send({
    //             name: "Orionids",
    //             previousYear: 2024,
    //             nextYear: "2025",
    //             initialDate: "2024-10-02T00:00:00.000Z",
    //             finalDate: "2024-11-07T00:00:00.000Z",
    //             frequency: 30,
    //             duration: 6,
    //             velocity: 66,
    //             perHour: 20,
    //             peakDate: "2024-10-21T00:00:00.000Z",
    //             constellationId
    //         });

    //     chai.expect(res.body.message).to.be.equal("The next year should be a number");
    // });

    it("should retrieve all showers", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/meteor_showers");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a shower by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/meteor_showers/${meteorShowerId}`);

        chai.expect(res.body.data.name).to.be.equal("Orionids");
    });

    it("should filter showers by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/meteor_showers?name=Orionids");

        chai.expect(res.body.data[0].name).to.be.equal("Orionids");
    });

    it("should filter showers by the next year of occurance", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/meteor_showers?nextYear=2025");

        chai.expect(res.body.data[0].nextYear).to.be.equal(2025);
    });

    it("should sort showers by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/meteor_showers?sortBy=name");

        chai.expect(res.body.data[0].name).to.be.equal("Orionids");
    });

    it("should update a valid shower", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/meteor_showers/${meteorShowerId}`)
            .send({
                name: "Updated Orionids",
                previousYear: 2024,
                nextYear: 2025,
                initialDate: "2024-10-02T00:00:00.000Z",
                finalDate: "2024-11-07T00:00:00.000Z",
                frequency: 30,
                duration: 6,
                velocity: 66,
                perHour: 20,
                peakDate: "2024-10-21T00:00:00.000Z",
                constellationId
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Meteor shower with the id: ${meteorShowerId} successfully updated`
            );
    });

    it("should delete a shower by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/meteor_showers/${meteorShowerId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Meteor shower with the id: ${meteorShowerId} successfully deleted`
            );
    });
});
