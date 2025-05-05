import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
//import { PlanetType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let starId;
let planetId;

describe("Planets", () => {
    before(async () => {
        const star = await prisma.star.findFirst();
        starId = star.id; 
        console.log(`Star ID: ${starId}`)
    });

    it("should create a valid planet", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/planets")
            .send({
                name: "Mercury",
                age: 4.5e9,
                mass: 3.3011e23,
                diameter: 4879,
                density: 5.43,
                type: "TERRESTIAL",
                atmosphere: false,
                year: 88,
                perigee: 0.3078,
                apogee: 0.4681,
                tilt: 0.034,
                hasSatellites: false,
                minTemp: 100,
                maxTemp: 700,
                gravity: 3.7,
                day: 58.6,
                brightness: -1.9,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                starId
            });
            console.log(res.body)
        chai
            .expect(res.body.message)
            .to.be.equal("Planet successfully created");
        planetId = res.body.data[0].id;
    });

    // it("should create another valid star", async () => {
    //     const res = await chai
    //         .request(app)
    //         .post("/api/v1/stars")
    //         .send({
    //             name: "Betelgeuse",
    //             age: 8.0e6,
    //             mass: 20.0,
    //             diameter: 887,
    //             type: "RED_GIANT",
    //             distance: 642.5,
    //             temperature: 3500,
    //             luminosity: 126000,
    //             hasPlanets: false,
    //             brightness: 0.42,
    //             galaxyId
    //         });

    //     chai
    //         .expect(res.body.message)
    //         .to.be.equal("Star successfully created");
    // });

    // it("should reject non-string name", async () => {
    //     const res = await chai
    //         .request(app)
    //         .post("/api/v1/stars")
    //         .send({
    //             name: 2324,
    //             age: 8.0e6,
    //             mass: 20.0,
    //             diameter: 887,
    //             type: "RED_GIANT",
    //             distance: 642.5,
    //             temperature: 3500,
    //             luminosity: 126000,
    //             hasPlanets: false,
    //             brightness: 0.42,
    //             galaxyId
    //         });

    //     chai.expect(res.body.message).to.be.equal("Name should be a string");
    // });

    // it("should reject invalid type", async () => {
    //     const res = await chai
    //         .request(app)
    //         .post("/api/v1/stars")
    //         .send({
    //             name: "Betelgeuse",
    //             age: 8.0e6,
    //             mass: 20.0,
    //             diameter: 887,
    //             type: "INVALID",
    //             distance: 642.5,
    //             temperature: 3500,
    //             luminosity: 126000,
    //             hasPlanets: false,
    //             brightness: 0.42,
    //             galaxyId
    //         });

    //     chai.expect(res.body.message).to.be.equal(`Type must be one of the following: ${Object.values(PlanetType)}`);
    // });

    // it("should reject non-numeric distance", async () => {
    //     const res = await chai
    //         .request(app)
    //         .post("/api/v1/stars")
    //         .send({
    //             name: "Betelgeuse",
    //             age: 8.0e6,
    //             mass: 20.0,
    //             diameter: 887,
    //             type: "RED_GIANT",
    //             distance: "642.5",
    //             temperature: 3500,
    //             luminosity: 126000,
    //             hasPlanets: false,
    //             brightness: 0.42,
    //             galaxyId
    //         });

    //     chai.expect(res.body.message).to.be.equal("Distance should be a number");
    // });

    // it("should retrieve all stars", async () => {
    //     const res = await chai
    //         .request(app)
    //         .get("/api/v1/stars");

    //     chai.expect(res.body.data).to.be.an("array");
    // });

    // it("should retrieve a star by ID", async () => {
    //     const res = await chai
    //         .request(app)
    //         .get(`/api/v1/stars/${starId}`);

    //     chai.expect(res.body.data.name).to.be.equal("Sirius");
    // });

    // it("should filter stars by name", async () => {
    //     const res = await chai
    //         .request(app)
    //         .get("/api/v1/stars?name=Sirius");

    //     chai.expect(res.body.data[0].name).to.be.equal("Sirius");
    // });

    // it("should filter stars by type", async () => {
    //     const res = await chai
    //         .request(app)
    //         .get("/api/v1/stars?type=MAIN_SEQUENCE");

    //     chai.expect(res.body.data[0].type).to.be.equal("MAIN_SEQUENCE");
    // });

    // it("should sort stars by name", async () => {
    //     const res = await chai
    //         .request(app)
    //         .get("/api/v1/stars?sortBy=name");

    //     chai.expect(res.body.data[0].name).to.be.equal("Sirius");
    // });

    // it("should reject non-numeric diameter during update", async () => {
    //     const res = await chai
    //         .request(app)
    //         .put(`/api/v1/stars/${starId}`)
    //         .send({
    //             name: "Betelgeuse",
    //             age: 8.0e6,
    //             mass: 20.0,
    //             diameter: "887",
    //             type: "RED_GIANT",
    //             distance: 642.5,
    //             temperature: 3500,
    //             luminosity: 126000,
    //             hasPlanets: false,
    //             brightness: 0.42,
    //             galaxyId
    //         });

    //     chai.expect(res.body.message).to.be.equal("Diameter should be a number");
    // });

    // it("should update a valid star", async () => {
    //     const res = await chai
    //         .request(app)
    //         .put(`/api/v1/stars/${starId}`)
    //         .send({
    //             name: "Updated Betelgeuse",
    //             age: 8.0e6,
    //             mass: 20.0,
    //             diameter: 887,
    //             type: "RED_GIANT",
    //             distance: 642.5,
    //             temperature: 3500,
    //             luminosity: 126000,
    //             hasPlanets: false,
    //             brightness: 0.42,
    //             galaxyId
    //         });

    //     chai
    //         .expect(res.body.message)
    //         .to.be.equal(
    //             `Star with the id: ${starId} successfully updated`
    //         );
    // });

    // it("should delete a star by ID", async () => {
    //     const res = await chai
    //         .request(app)
    //         .delete(`/api/v1/stars/${starId}`);

    //     chai
    //         .expect(res.body.message)
    //         .to.be.equal(
    //             `Star with the id: ${starId} successfully deleted`
    //         );
    // });
});
