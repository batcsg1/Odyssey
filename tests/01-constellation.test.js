import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

const chai = chaiModule.use(chaiHttp);

let constellationId;
let anotherConstellationId; // Exported for use in other test files

describe("Constellations", () => {
  it("should reject non-string name", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/constellations")
      .send({
        name: 250,
        shape: "Astronaut",
        area: 800,
        abbreviation: "Agi"
      });

    chai.expect(res.body.message).to.be.equal("Name should be a string");
  });

  it("should create a valid constellation", async () => {
    const res = await chai.request(app).post("/api/v1/constellations").send({
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
    const res = await chai.request(app).post("/api/v1/constellations").send({
      name: "Prismaris",
      shape: "Triangle",
      area: 180,
      abbreviation: "Pma"
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

    chai.expect(res.body.data.name).to.be.equal("Canis Majora");
  });

  it("should filter constellations by name", async () => {
    const res = await chai.request(app).get("/api/v1/constellations?name=Canis Majora");

    chai.expect(res.body.data[0].name).to.be.equal("Canis Majora");
  });

  it("should sort constellations by name", async () => {
    const res = await chai.request(app).get("/api/v1/constellations?sortBy=name");

    chai.expect(res.body.data[0].name).to.be.equal("Canis Majora");
  });

  it("should reject non-numeric area during update", async () => {
    const res = await chai
      .request(app)
      .put(`/api/v1/constellations/${constellationId}`)
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
      .delete(`/api/v1/constellations/${constellationId}`);

    chai
      .expect(res.body.message)
      .to.be.equal(
        `Constellation with the id: ${constellationId} successfully deleted`
      );
  });
});
