import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

let token;
let constellationId;

describe("Constellations", () => {
    it("should reject missing token", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/constellations");

        chai.expect(res.body.message).to.be.equal("No token provided");
    });

    it("should login an admin user, return a token, and not have X-Powered-By header", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/auth/login")
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

    it("should reject non-string name", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/constellations")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: 250,
                shape: "Astronaut",
                area: 800,
                abbreviation: "Agi"
            });

        chai.expect(res.body.message).to.be.equal("Name should be a string");
    });

    it("should create a valid constellation", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/constellations")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Canis Majora",
                shape: "Bull",
                area: 237.4,
                abbreviation: "CMa"
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Constellation successfully created");
        constellationId = res.body.data[0].id;
    });

    it("should create another valid constellation", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1/constellations")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Prismaris",
                shape: "Triangle",
                area: 180,
                abbreviation: "Pma"
            });

        chai
            .expect(res.body.message)
            .to.be.equal("Constellation successfully created");
    });

    it("should retrieve all constellations", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/constellations")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should retrieve a constellation by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1/constellations/${constellationId}`)
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data.name).to.be.equal("Canis Majora");
    });

    it("should filter constellations by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/constellations?name=Canis Majora")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Canis Majora");
    });

    it("should sort constellations by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1/constellations?sortBy=name")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Canis Majora");
    });

    it("should reject non-numeric area during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/constellations/${constellationId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Prismaris",
                shape: "Triangle",
                area: "999",
                abbreviation: "Pma"
            });

        chai.expect(res.body.message).to.be.equal("area should be a number");
    });

    it("should update a valid constellation", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1/constellations/${constellationId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Canis Majora",
                shape: "Cow",
                area: 237.4,
                abbreviation: "CMa"
            });

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Constellation with the id: ${constellationId} successfully updated`
            );
    });

    it("should delete a constellation by ID", async () => {
        const res = await chai
            .request(app)
            .delete(`/api/v1/constellations/${constellationId}`)
            .set("Authorization", `Bearer ${token}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Constellation with the id: ${constellationId} successfully deleted`
            );
    });
});
