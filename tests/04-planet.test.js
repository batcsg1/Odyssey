import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
import { PlanetType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let starId;
let planetId;
let token;

describe("Planets", () => {
    before(async () => {
        const star = await prisma.star.findFirst();
        starId = star.id;
    });

    it("should reject missing token", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/planets");

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

    it("should create a valid planet", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/planets")
            .set("Authorization", `Bearer ${token}`)
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
        chai
            .expect(res.body.message)
            .to.be.equal("Planet successfully created");
        planetId = res.body.data.id;
    });

    it("should create another valid planet", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/planets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Venus",
                age: 4.5e9,
                mass: 4.8675e24,
                diameter: 12104,
                density: 5.24,
                type: "TERRESTIAL",
                atmosphere: true,
                year: 225,
                perigee: 0.7154,
                apogee: 0.7289,
                tilt: 177.4,
                hasSatellites: false,
                minTemp: 737,
                maxTemp: 737,
                gravity: 8.87,
                day: 243,
                brightness: -4.9,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                starId
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Planet successfully created");
    });

    it("should paginate for 2 planets", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/planets?page=1&amount=2")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.count).to.be.equal(2);
    });

    it("should reject missing star ID", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/planets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Venus",
                age: 4.5e9,
                mass: 4.8675e24,
                diameter: 12104,
                density: 5.24,
                type: "TERRESTIAL",
                atmosphere: true,
                year: 225,
                perigee: 0.7154,
                apogee: 0.7289,
                tilt: 177.4,
                hasSatellites: false,
                minTemp: 737,
                maxTemp: 737,
                gravity: 8.87,
                day: 243,
                brightness: -4.9,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Star ID is required");
    });

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/planets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: 2324,
                age: 4.5e9,
                mass: 4.8675e24,
                diameter: 12104,
                density: 5.24,
                type: "TERRESTIAL",
                atmosphere: true,
                year: 225,
                perigee: 0.7154,
                apogee: 0.7289,
                tilt: 177.4,
                hasSatellites: false,
                minTemp: 737,
                maxTemp: 737,
                gravity: 8.87,
                day: 243,
                brightness: -4.9,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                starId
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });

    it("should reject invalid type", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/planets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Venus",
                age: 4.5e9,
                mass: 4.8675e24,
                diameter: 12104,
                density: 5.24,
                type: "INVALID",
                atmosphere: true,
                year: 225,
                perigee: 0.7154,
                apogee: 0.7289,
                tilt: 177.4,
                hasSatellites: false,
                minTemp: 737,
                maxTemp: 737,
                gravity: 8.87,
                day: 243,
                brightness: -4.9,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                starId
            });

        chai.expect(res.body.message).to.be.equal(`Type must be one of the following: ${Object.values(PlanetType)}`);
    });

    it("should reject non-numeric mass", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.1/planets")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Venus",
                age: 4.5e9,
                mass: "4.8675e24",
                diameter: 12104,
                density: 5.24,
                type: "TERRESTIAL",
                atmosphere: true,
                year: 225,
                perigee: 0.7154,
                apogee: 0.7289,
                tilt: 177.4,
                hasSatellites: false,
                minTemp: 737,
                maxTemp: 737,
                gravity: 8.87,
                day: 243,
                brightness: -4.9,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                starId
            });

        chai.expect(res.body.message).to.be.equal("Mass should be a number");
    });

    it("should retrieve all planets", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/planets")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a planet by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1.1/planets/${planetId}`)
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data.name).to.be.equal("Mercury");
    });

    it("should filter planets by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/planets?name=Mercury")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Mercury");
    });

    it("should filter planets by type", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/planets?type=TERRESTIAL")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].type).to.be.equal("TERRESTIAL");
    });

    it("should sort planets by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.1/planets?sortBy=name")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Mercury");
    });

    it("should reject non-numeric diameter during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1.1/planets/${planetId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Venus",
                age: 4.5e9,
                mass: 4.8675e24,
                diameter: "12104",
                density: 5.24,
                type: "TERRESTIAL",
                atmosphere: true,
                year: 225,
                perigee: 0.7154,
                apogee: 0.7289,
                tilt: 177.4,
                hasSatellites: false,
                minTemp: 737,
                maxTemp: 737,
                gravity: 8.87,
                day: 243,
                brightness: -4.9,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                starId
            });

        chai.expect(res.body.message).to.be.equal("Diameter should be a number");
    });

    it("should update a valid planet", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1.1/planets/${planetId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Venus",
                age: 4.5e9,
                mass: 4.8675e24,
                diameter: 12104,
                density: 5.24,
                type: "TERRESTIAL",
                atmosphere: true,
                year: 225,
                perigee: 0.7154,
                apogee: 0.7289,
                tilt: 177.4,
                hasSatellites: false,
                minTemp: 737,
                maxTemp: 737,
                gravity: 8.87,
                day: 243,
                brightness: -4.9,
                location: "INNER_SOLAR_SYSTEM",
                habitable: false,
                starId
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Planet with the id: ${planetId} successfully updated`
            );
    });

    it("should update one planet field", async () => {
        const res = await chai
            .request(app)
            .patch(`/api/v1.1/planets/${planetId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Venus"
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Planet with the id: ${planetId} successfully updated`
            );
    });

    it("should delete a planet by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1.1/planets/${planetId}`)
            .set("Authorization", `Bearer ${token}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Planet with the id: ${planetId} successfully deleted`
            );
    });
});
