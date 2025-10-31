import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";
import { GalaxyType } from "@prisma/client";

const chai = chaiModule.use(chaiHttp);

let galaxyId;
let constellationId;
let token;

describe("Galaxies", () => {
    before(async () => {
        const constellation = await prisma.constellation.findFirst();

        constellationId = constellation.id;
    });

    it("should reject missing token", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/constellations");

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

    it("should create a valid galaxy", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/galaxies")
            .set("Authorization", `Bearer ${token}`)
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
        galaxyId = res.body.data.id;
    });

    it("should create another valid galaxy", async () => {
        const res = await chai
            .request(app)
            .post("/api/v1.2/galaxies")
            .set("Authorization", `Bearer ${token}`)
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
            .post("/api/v1.2/galaxies")
            .set("Authorization", `Bearer ${token}`)
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
            .post("/api/v1.2/galaxies")
            .set("Authorization", `Bearer ${token}`)
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
            .post("/api/v1.2/galaxies")
            .set("Authorization", `Bearer ${token}`)
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
            .get("/api/v1.2/galaxies")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data).to.be.an("array");
    });

    it("should paginate for 2 galaxies", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/galaxies?page=1&amount=2")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.count).to.be.equal(2);
    });

    it("should retrieve a galaxy by ID", async () => {
        const res = await chai
            .request(app)
            .get(`/api/v1.2/galaxies/${galaxyId}`)
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data.name).to.be.equal("Andromeda Galaxy");
    });

    it("should filter galaxies by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/galaxies?name=Andromeda Galaxy")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Andromeda Galaxy");
    });

    it("should filter galaxies by type", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/galaxies?type=BARRED_SPIRAL")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].type).to.be.equal("BARRED_SPIRAL");
    });

    it("should sort galaxies by name", async () => {
        const res = await chai
            .request(app)
            .get("/api/v1.2/galaxies?sortBy=name")
            .set("Authorization", `Bearer ${token}`);

        chai.expect(res.body.data[0].name).to.be.equal("Andromeda Galaxy");
    });

    it("should reject non-numeric size during update", async () => {
        const res = await chai
            .request(app)
            .put(`/api/v1.2/galaxies/${galaxyId}`)
            .set("Authorization", `Bearer ${token}`)
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
            .put(`/api/v1.2/galaxies/${galaxyId}`)
            .set("Authorization", `Bearer ${token}`)
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

    it("should update a valid galaxy with one field", async () => {
        const res = await chai
            .request(app)
            .patch(`/api/v1.2/galaxies/${galaxyId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Andromeda Galaxy"
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
            .delete(`/api/v1.2/galaxies/${galaxyId}`)
            .set("Authorization", `Bearer ${token}`);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Galaxy with the id: ${galaxyId} successfully deleted`
            );
    });
});
