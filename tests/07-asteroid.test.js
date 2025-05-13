import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
import { AsteroidType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let starId;
let asteroidId;

describe("Asteroids", () => {
    before(async () => {
        const star = await prisma.star.findFirst();
        starId = star.id;
    });

    it("should create a valid asteroid", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/asteroids")
            .send({
                name: "Vesta",
                age: 4500000000,
                mass: 2.59e20,
                diameter: 525,
                density: 3.42,
                type: "STONY",
                year: 3.63,
                perigee: 2.15,
                apogee: 2.57,
                location: "ASTEROID_BELT",
                brightness: 5.1,
                starId
            });
        chai
            .expect(res.body.message)
            .to.be.equal("Asteroid successfully created");
        asteroidId = res.body.data[0].id;
    });

    it("should create another valid asteroid", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/asteroids")
            .send({
                name: "Pallas",
                age: 4500000000,
                mass: 2.11e20,
                diameter: 512,
                density: 2.89,
                type: "CHONDRITE",
                year: 4.62,
                perigee: 2.13,
                apogee: 3.41,
                location: "ASTEROID_BELT",
                brightness: 6.4,
                starId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Asteroid successfully created");
    });

    it("should reject missing star ID", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/asteroids")
            .send({
                name: "Pallas",
                age: 4500000000,
                mass: 2.11e20,
                diameter: 512,
                density: 2.89,
                type: "CHONDRITE",
                year: 4.62,
                perigee: 2.13,
                apogee: 3.41,
                location: "ASTEROID_BELT",
                brightness: 6.4                
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Star ID is required");
    });

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/asteroids")
            .send({
                name: 289,
                age: 4500000000,
                mass: 2.11e20,
                diameter: 512,
                density: 2.89,
                type: "CHONDRITE",
                year: 4.62,
                perigee: 2.13,
                apogee: 3.41,
                location: "ASTEROID_BELT",
                brightness: 6.4,
                starId
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });

    it("should reject invalid type", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/asteroids")
            .send({
                name: "Pallas",
                age: 4500000000,
                mass: 2.11e20,
                diameter: 512,
                density: 2.89,
                type: "INVALID",
                year: 4.62,
                perigee: 2.13,
                apogee: 3.41,
                location: "ASTEROID_BELT",
                brightness: 6.4,
                starId
            });

        chai.expect(res.body.message).to.be.equal(`Type must be one of the following: ${Object.values(AsteroidType)}`);
    });

    it("should reject non-numeric mass", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/asteroids")
            .send({
                name: "Pallas",
                age: 4500000000,
                mass: "2.11e20",
                diameter: 512,
                density: 2.89,
                type: "CHONDRITE",
                year: 4.62,
                perigee: 2.13,
                apogee: 3.41,
                location: "ASTEROID_BELT",
                brightness: 6.4,
                starId
            });

        chai.expect(res.body.message).to.be.equal("Mass should be a number");
    });

    it("should retrieve all asteroids", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/asteroids");

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a asteroid by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/asteroids/${asteroidId}`);

        chai.expect(res.body.data.name).to.be.equal("Vesta");
    });

    it("should filter asteroids by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/asteroids?name=Pallas");

        chai.expect(res.body.data[0].name).to.be.equal("Pallas");
    });

    it("should filter asteroids by type", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/asteroids?type=STONY");

        chai.expect(res.body.data[0].type).to.be.equal("STONY");
    });

    it("should sort asteroids by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/asteroids?sortBy=name");

        chai.expect(res.body.data[0].name).to.be.equal("Pallas");
    });

    it("should reject non-numeric diameter during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/asteroids/${asteroidId}`)
            .send({
                name: "Pallas",
                age: 4500000000,
                mass: 2.11e20,
                diameter: "512",
                density: 2.89,
                type: "CHONDRITE",
                year: 4.62,
                perigee: 2.13,
                apogee: 3.41,
                location: "ASTEROID_BELT",
                brightness: 6.4,
                starId
            });

        chai.expect(res.body.message).to.be.equal("Diameter should be a number");
    });

    it("should update a valid asteroid", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/asteroids/${asteroidId}`)
            .send({
                name: "Updated Vesta",
                age: 4500000000,
                mass: 2.59e20,
                diameter: 525,
                density: 3.42,
                type: "STONY",
                year: 3.63,
                perigee: 2.15,
                apogee: 2.57,
                location: "ASTEROID_BELT",
                brightness: 5.1,
                starId
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Asteroid with the id: ${asteroidId} successfully updated`
            );
    });

    it("should delete an asteroid by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/asteroids/${asteroidId}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Asteroid with the id: ${asteroidId} successfully deleted`
            );
    });
});
