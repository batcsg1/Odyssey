import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

let constellationId;
export let anotherConstellationId; // Exported for use in other test files

describe("Constellations", () => {
  it("should reject non-string name", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/constellations")
      .send({ name: 123, right_ascension: 5.585, declination: -5.909 });

    chai.expect(res.body.message).to.be.equal("name should be a string");
  });

  it("should create a valid constellation", async () => {
    const res = await chai.request(app).post("/api/v1/constellations").send({
      name: "Orion",
      right_ascension: 5.585,
      declination: -5.909,
    });

    chai
      .expect(res.body.message)
      .to.be.equal("Constellation successfully created");
    constellationId = res.body.data[0].id;
  });

  it("should create another valid constellation", async () => {
    const res = await chai.request(app).post("/api/v1/constellations").send({
      name: "Ursa Major",
      right_ascension: 11.062,
      declination: 55.324,
    });

    chai
      .expect(res.body.message)
      .to.be.equal("Constellation successfully created");
    anotherConstellationId = res.body.data[0].id;
  });

  it("should retrieve all constellations", async () => {
    const res = await chai.request(app).get("/api/v1/constellations");

    chai.expect(res.body.data).to.be.an("array");
  });

  it("should retrieve a constellation by ID", async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/constellations/${constellationId}`);

    chai.expect(res.body.data.name).to.be.equal("Orion");
  });

  it("should filter constellations by name", async () => {
    const res = await chai.request(app).get("/api/v1/constellations?name=Orion");

    chai.expect(res.body.data[0].name).to.be.equal("Orion");
  });

  it("should sort constellations by name", async () => {
    const res = await chai.request(app).get("/api/v1/constellations?sortBy=name");

    chai.expect(res.body.data[0].name).to.be.equal("Orion");
  });

  it("should reject non-numeric right ascension during update", async () => {
    const res = await chai
      .request(app)
      .put(`/api/v1/constellations/${constellationId}`)
      .send({
        name: "Orion",
        right_ascension: "invalid",
        declination: -5.909,
      });

    chai.expect(res.body.message).to.be.equal("right_ascension should be a number");
  });

  it("should update a valid constellation", async () => {
    const res = await chai
      .request(app)
      .put(`/api/v1/constellations/${constellationId}`)
      .send({
        name: "Updated Orion",
        right_ascension: 6.000,
        declination: -5.900,
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
      .delete(`/api/v1/constellations/${constellationId}`);

    chai
      .expect(res.body.message)
      .to.be.equal(
        `Constellation with the id: ${constellationId} successfully deleted`
      );
  });
});
