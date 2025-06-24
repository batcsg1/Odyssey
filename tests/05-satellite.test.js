import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
import { SatelliteType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let planetId;
let satelliteId;
let token;

describe("Satellites", () => {
    before(async () => {
        const planet = await prisma.planet.findFirst();
        planetId = planet.id;
    });

    it("should reject missing token", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/satellites");

        chai.expect(res.body.message).to.be.equal("No token provided");
    });

    it("should login an admin user, return a token, and not have X-Powered-By header", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/auth/login")
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

    it("should create a valid satellite", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/satellites")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Moon",
                age: 4.5e9,
                mass: 7.35e22,
                diameter: 3474.8,
                density: 3.34,
                type: "MOON",
                atmosphere: false,
                year: 27.3,
                perigee: 356400,
                apogee: 406700,
                tilt: 1.54,
                minTemp: 100,
                maxTemp: 400,
                gravity: 1.62,
                day: 27.3,
                brightness: 12.7,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                planetId
            });
        chai
            .expect(res.body.message)
            .to.be.equal("Satellite successfully created");
        satelliteId = res.body.data.id;
    });

    it("should create another valid satellite", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/satellites")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Phobos",
                age: 4.5e9,
                mass: 1.0659e16,
                diameter: 22.4,
                density: 1.876,
                type: "MOON",
                atmosphere: false,
                year: 0.3,
                perigee: 9234,
                apogee: 9376,
                tilt: 0.0,
                minTemp: 90,
                maxTemp: 200,
                gravity: 0.0057,
                day: 0.3,
                brightness: 12.4,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                planetId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Satellite successfully created");
    });

    it("should paginate for 2 satellites", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/satellites?page=1&amount=2")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.count).to.be.equal(2);
    });

    it("should reject missing planet ID", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/satellites")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Phobos",
                age: 4.5e9,
                mass: 1.0659e16,
                diameter: 22.4,
                density: 1.876,
                type: "MOON",
                atmosphere: false,
                year: 0.3,
                perigee: 9234,
                apogee: 9376,
                tilt: 0.0,
                minTemp: 90,
                maxTemp: 200,
                gravity: 0.0057,
                day: 0.3,
                brightness: 12.4,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Planet ID is required");
    });

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/satellites")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: 234,
                age: 4.5e9,
                mass: 1.0659e16,
                diameter: 22.4,
                density: 1.876,
                type: "MOON",
                atmosphere: false,
                year: 0.3,
                perigee: 9234,
                apogee: 9376,
                tilt: 0.0,
                minTemp: 90,
                maxTemp: 200,
                gravity: 0.0057,
                day: 0.3,
                brightness: 12.4,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                planetId
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });

    it("should reject invalid type", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/satellites")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Phobos",
                age: 4.5e9,
                mass: 1.0659e16,
                diameter: 22.4,
                density: 1.876,
                type: "INVALID",
                atmosphere: false,
                year: 0.3,
                perigee: 9234,
                apogee: 9376,
                tilt: 0.0,
                minTemp: 90,
                maxTemp: 200,
                gravity: 0.0057,
                day: 0.3,
                brightness: 12.4,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                planetId
            });

        chai.expect(res.body.message).to.be.equal(`Type must be one of the following: ${Object.values(SatelliteType)}`);
    });

    it("should reject non-numeric mass", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/satellites")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Phobos",
                age: 4.5e9,
                mass: "1.0659e16",
                diameter: 22.4,
                density: 1.876,
                type: "MOON",
                atmosphere: false,
                year: 0.3,
                perigee: 9234,
                apogee: 9376,
                tilt: 0.0,
                minTemp: 90,
                maxTemp: 200,
                gravity: 0.0057,
                day: 0.3,
                brightness: 12.4,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                planetId
            });

        chai.expect(res.body.message).to.be.equal("Mass should be a number");
    });

    it("should retrieve all satellites", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/satellites")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a satellite by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1.1/satellites/${satelliteId}`)
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data.name).to.be.equal("Moon");
    });

    it("should filter satellites by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/satellites?name=Moon")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Moon");
    });

    it("should filter satellites by type", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/satellites?type=MOON")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].type).to.be.equal("MOON");
    });

    it("should sort satellites by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/satellites?sortBy=name")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Moon");
    });

    it("should reject non-numeric diameter during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1.1/satellites/${satelliteId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Phobos",
                age: 4.5e9,
                mass: 1.0659e16,
                diameter: "22.4",
                density: 1.876,
                type: "MOON",
                atmosphere: false,
                year: 0.3,
                perigee: 9234,
                apogee: 9376,
                tilt: 0.0,
                minTemp: 90,
                maxTemp: 200,
                gravity: 0.0057,
                day: 0.3,
                brightness: 12.4,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                planetId
            });

        chai.expect(res.body.message).to.be.equal("Diameter should be a number");
    });

    it("should update a valid satellite", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1.1/satellites/${satelliteId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Moon",
                age: 4.5e9,
                mass: 7.35e22,
                diameter: 3474.8,
                density: 3.34,
                type: "MOON",
                atmosphere: false,
                year: 27.3,
                perigee: 356400,
                apogee: 406700,
                tilt: 1.54,
                minTemp: 100,
                maxTemp: 400,
                gravity: 1.62,
                day: 27.3,
                brightness: 12.7,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                planetId
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Satellite with the id: ${satelliteId} successfully updated`
            );
    });

    it("should update one satellite field", async () => {
        const res = await chai
            .request(app)
            .patch(`/api/v1.1/satellites/${satelliteId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Moon"
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Satellite with the id: ${satelliteId} successfully updated`
            );
    });

    it("should delete a satellite by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1.1/satellites/${satelliteId}`)
            .set("Authorization", `Bearer ${token}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Satellite with the id: ${satelliteId} successfully deleted`
            );
    });
});
