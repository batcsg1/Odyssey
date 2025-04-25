import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

import { GalaxyType } from "@prisma/client";

let constellationId;

let galaxyId;
let anotherGalaxyId; // Exported for use in other test files

describe("Galaxies", () => {
  before(async () => {
    const res = await chai.request(app).post("/api/v1/constellations").send({
      name: "Canis Majora",
      shape: "Bull",
      area: 237.4,
      abbreviation: "CMa"
    });

    constellationId = res.body.data[0].id;
  });

  it("should reject non-string name", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/galaxies")
      .send({
        name: 250,
        type: "SPIRAL",
        distance: 800,
        size: 450,
        brightness: 20,
        constellationId
      });

    chai.expect(res.body.message).to.be.equal("Name should be a string");
  });

  it("should create a valid galaxy", async () => {
    const res = await chai.request(app).post("/api/v1/galaxies").send({
        name: "Andromeda",
        type: "SPIRAL",
        distance: 800,
        size: 450,
        brightness: 20,
        constellationId
    });

    chai
      .expect(res.body.message)
      .to.be.equal("Galaxy successfully created");
    galaxyId = res.body.data[0].id;
  });

  it("should create another valid galaxy", async () => {
    const res = await chai.request(app).post("/api/v1/galaxies").send({
        name: "Pinwheel",
        type: "IRREGULAR",
        distance: 1e8,
        size: 20000,
        brightness: 5,
        constellationId
    });

    chai
      .expect(res.body.message)
      .to.be.equal("Galaxy successfully created");
      anotherGalaxyId = res.body.data[0].id;
  });

  it("should retrieve all galaxies", async () => {
    const res = await chai.request(app).get("/api/v1/galaxies");

    chai.expect(res.body.data).to.be.an("array");
  });

  it("should retrieve a galaxy by ID", async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/galaxies/${galaxyId}`);

    chai.expect(res.body.data.name).to.be.equal("Andromeda");
  });

  it("should filter galaxies by name", async () => {
    const res = await chai.request(app).get("/api/v1/galaxies?name=Andromeda");

    chai.expect(res.body.data[0].name).to.be.equal("Andromeda");
  });

  it("should sort constellations by name", async () => {
    const res = await chai.request(app).get("/api/v1/galaxies?sortBy=name");

    chai.expect(res.body.data[0].name).to.be.equal("Andromeda");
  });

  it("should reject non-numeric distance during update", async () => {
    const res = await chai
      .request(app)
      .put(`/api/v1/galaxies/${galaxyId}`)
      .send({
        name: "Andromeda",
        type: "SPIRAL",
        distance: "Distance",
        size: 450,
        brightness: 20,
        constellationId
      });

    chai.expect(res.body.message).to.be.equal("Distance should be a number");
  });

  it("should reject invalid type during update", async () => {
    const res = await chai
      .request(app)
      .put(`/api/v1/galaxies/${galaxyId}`)
      .send({
        name: "Andromeda",
        type: "INVALID",
        distance: 800,
        size: 450,
        brightness: 20,
        constellationId
      });

    chai.expect(res.body.message).to.be.equal(`Type must be one of the following: ${Object.values(GalaxyType)}`);
  });

  it("should update a valid constellation", async () => {
    const res = await chai
      .request(app)
      .put(`/api/v1/galaxies/${galaxyId}`)
      .send({
        name: "Updated Andromeda",
        type: "SPIRAL",
        distance: 800,
        size: 450,
        brightness: 20,
        constellationId
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
