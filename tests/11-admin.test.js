import bcryptjs from "bcryptjs";
import * as chaiModule from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";
import prisma from "../prisma/client.js";

const chai = chaiModule.use(chaiHttp);

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt();
  return bcryptjs.hash(password, salt);
};

let token;

let normalUser;
let adminUser;
let superAdminUser;
let constellationId;

describe("Admin", () => {
  before(async () => {
    normalUser = await prisma.user.findUnique({
      where: {
        emailAddress: "david.bowie@example.com",
      },
    });
    adminUser = await prisma.user.findUnique({
      where: {
        emailAddress: "john.doe@example.com",
      },
    });
    superAdminUser = await prisma.user.findUnique({
      where: {
        emailAddress: "james.doe@example.com",
      },
    });
    const constellation = await prisma.constellation.findFirst();

    constellationId = constellation.id;
  });

  it("should reject missing token", async () => {
    const res = await chai.request(app).get("/api/v1.2/users");

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

    chai.expect(res).to.not.have.header("x-powered-by"); // Expect non-default header
  });

  // -- ADMIN tests --

  it("should retrieve normal and admins data when retrieving all users", async () => {
    const res = await chai
      .request(app)
      .get("/api/v1.2/users")
      .set("Authorization", `Bearer ${token}`);

    chai.expect(res.body.data).to.be.an("array");
  });

  it("should retrieve a normal user by id ", async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1.2/users/${normalUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    chai.expect(res.body.data).to.not.be.an("array");
  });

  // Update

  it("should update a normal user's data", async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1.2/users/${normalUser.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "SpongeBob",
      });

    chai
      .expect(res.body.message)
      .to.be.equal(`User with the id: ${normalUser.id} successfully updated`);
  });

  it("should reject an admin user updating a non-normal user", async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1.2/users/${superAdminUser.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Gen",
      });

    chai
      .expect(res.body.message)
      .to.be.equal("Updating a non-normal user not allowed");
  });

  // Create
  it("should create a normal user", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1.2/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Chef",
        lastName: "Boyardee",
        emailAddress: "chef.boyardee@example.com",
        password: await hashPassword("beefaroni123"),
        role: "NORMAL",
      });

    chai.expect(res.body.message).to.be.equal("User successfully created");
  });

  it("should reject creating a non-normal user", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1.2/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Joshua",
        lastName: "Sanders",
        emailAddress: "joshua.sanders@example.com",
        password: await hashPassword("josh123"),
        role: "ADMIN",
      });

    chai
      .expect(res.body.message)
      .to.be.equal("ADMINs can only create NORMAL users");
  });

  //Delete
  it("should reject deleting a super-admin user", async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1.2/users/${superAdminUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    chai
      .expect(res.body.message)
      .to.be.equal("Deleting a super admin user not allowed");
  });

  it("should delete a normal user", async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1.2/users/${normalUser.id}`)
      .set("Authorization", `Bearer ${token}`);

    chai
      .expect(res.body.message)
      .to.be.equal(`User with the id: ${normalUser.id} successfully deleted`);
  });

  // GET from constellations

  it("should allow admin user to get all constellations", async () => {
    const res = await chai
      .request(app)
      .get("/api/v1.2/constellations")
      .set("Authorization", `Bearer ${token}`);

    chai.expect(res.body.data).to.be.an("array");
  });

  // UPDATE a constellation

  it("should allow admin user to update a constellation", async () => {
        const res = await chai
            .request(app)
            .patch(`/api/v1.2/constellations/${constellationId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Constellation",
            });
        chai.expect(res).to.have.status(200);

        chai
            .expect(res.body.message)
            .to.be.equal(
                `Constellation with the id: ${constellationId} successfully updated`
            );
    });
});
