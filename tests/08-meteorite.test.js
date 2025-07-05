import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";

const chai = chaiModule.use(chaiHttp);

let planetId;
let meteoriteId;
let token;

describe("Meteorites", () => {
    before(async () => {
        const planet = await prisma.planet.findFirst();
        planetId = planet.id;
    });

    it("should reject missing token", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/meteorites");

        chai.expect(res.body.message).to.be.equal("No token provided");
    });

    it("should login an admin user, return a token, and not have X-Powered-By header", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/auth/login")
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

    it("should create a valid meteorite", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/meteorites")
            .set("Authorization", `Bearer ${token}`)
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
        meteoriteId = res.body.data.id;
    });

    it("should create another valid meteorite", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/meteorites")
            .set("Authorization", `Bearer ${token}`)
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

    it("should paginate for 2 meteorites", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/meteorites?page=1&amount=2")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.count).to.be.equal(2);
    });

    it("should reject missing planet ID", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/meteorites")
            .set("Authorization", `Bearer ${token}`)
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
            .post("/api/v1.2/meteorites")
            .set("Authorization", `Bearer ${token}`)
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
            .post("/api/v1.2/meteorites")
            .set("Authorization", `Bearer ${token}`)
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
            .get("/api/v1.2/meteorites")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a meteorite by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1.2/meteorites/${meteoriteId}`)
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data.name).to.be.equal("Hoba");
    });

    it("should filter meteorites by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/meteorites?name=Hoba")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Hoba");
    });


    it("should sort meteorites by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/meteorites?sortBy=name")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Hoba");
    });

    it("should reject non-numeric diameter during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1.2/meteorites/${meteoriteId}`)
            .set("Authorization", `Bearer ${token}`)
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
            .put(`/api/v1.2/meteorites/${meteoriteId}`)
            .set("Authorization", `Bearer ${token}`)
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

    it("should update one field", async () => {
        const res = await chai
            .request(app)
            .patch(`/api/v1.2/meteorites/${meteoriteId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Hoba"
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
            .delete(`/api/v1.2/meteorites/${meteoriteId}`)
            .set("Authorization", `Bearer ${token}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Meteorite with the id: ${meteoriteId} successfully deleted`
            );
    });
});
