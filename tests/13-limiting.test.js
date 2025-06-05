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

let superAdminUser;
let superAdminUserID;

describe("Limiting", () => {
  before(async () => {
    superAdminUser = await prisma.user.findUnique({
      where: {
        emailAddress: "james.doe@example.com",
      },
    });
    superAdminUserID = superAdminUser.id;
  });

  it("should reject missing token", async () => {
    const res = await chai.request(app).get("/api/v1/users");

    chai.expect(res.body.message).to.be.equal("No token provided");
  });

  it("should login a super admin user, return a token, and not have X-Powered-By header", async () => {
    const res = await chai
      .request(app)
      .post("/api/v1/auth/login")
      .set("Authorization", `Bearer ${token}`)
      .send({
        emailAddress: "james.doe@example.com",
        password: "P@ssw0rd",
      });

    chai.expect(res).to.have.status(200); // Expect a succesfull response

    chai.expect(res.body.token).to.exist;

    token = res.body.token;

    chai.expect(res).to.not.have.header("x-powered-by"); // Expect non-default header
  });

  // GET test

  it("should accept no more than 20 get requests", async () => {
    let res;

    for (let i = 0; i <= 20; i++) {
      res = await chai
        .request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${token}`);
    }

    chai.expect(res).to.have.status(429);

    chai
      .expect(res.body.message)
      .to.be.equal(
        "You have exceeded the number of requests: 20. Please try again in 2 minutes."
      );
  });

  // GET by ID test
  it("should accept no more than 20 getByID requests ", async () => {
    let res;
    for (let i = 0; i <= 20; i++) {
      res = await chai
        .request(app)
        .get(`/api/v1/users/${superAdminUserID}`)
        .set("Authorization", `Bearer ${token}`);
    }
    chai.expect(res).to.have.status(429);

    chai
      .expect(res.body.message)
      .to.be.equal(
        "You have exceeded the number of requests: 20. Please try again in 2 minutes."
      );
  });

  // GET by ID test
  it("should accept no more than 10 update requests ", async () => {
    let res;
    for (let i = 0; i <= 10; i++) {
      res = await chai
        .request(app)
        .put(`/api/v1/users/${superAdminUserID}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
            firstName: "Eddie"
        });
    }
    chai.expect(res).to.have.status(429);

    chai
      .expect(res.body.message)
      .to.be.equal(
        "You have exceeded the number of requests: 10. Please try again in 1 minutes."
      );
  });
});
