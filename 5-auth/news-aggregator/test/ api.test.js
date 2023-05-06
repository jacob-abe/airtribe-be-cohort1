const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");

const { expect } = chai;
chai.use(chaiHttp);

describe("User Authentication", () => {
  const user = {
    name: "testuser",
    password: "testpassword",
  };

  it("Should register a new user", (done) => {
    chai
      .request(app)
      .post("/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        done();
      });
  });

  it("Should not register a user with an existing name", (done) => {
    chai
      .request(app)
      .post("/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });

  it("Should login a registered user", (done) => {
    chai
      .request(app)
      .post("/login")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("accessToken");
        user.token = res.body.accessToken;
        done();
      });
  });

  it("Should not login a non-existent user", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({ name: "nonexistent", password: "wrongpassword" })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("User Preferences", () => {
  const user = {
    name: "testuser",
    token: null,
  };

  before((done) => {
    chai
      .request(app)
      .post("/login")
      .send({ name: user.name, password: "testpassword" })
      .end((err, res) => {
        user.token = res.body.accessToken;
        done();
      });
  });

  it("Should get user preferences", (done) => {
    chai
      .request(app)
      .get("/preferences")
      .set("Authorization", `Bearer ${user.token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("preferences");
        done();
      });
  });

  it("Should update user preferences", (done) => {
    chai
      .request(app)
      .put("/preferences")
      .set("Authorization", `Bearer ${user.token}`)
      .send({ preferences: { categories: ["technology"] } })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        done();
      });
  });
});

describe("News", () => {
  const user = {
    name: "testuser",
    token: null,
  };

  before((done) => {
    chai
      .request(app)
      .post("/login")
      .send({ name: user.name, password: "testpassword" })
      .end((err, res) => {
        user.token = res.body.accessToken;
        done();
      });
  });

  it("Should get news for a user", (done) => {
    chai
      .request(app)
      .get("/news")
      .set("Authorization", `Bearer ${user.token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("Should not get news without a token", (done) => {
    chai
      .request(app)
      .get("/news")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        done();
      });
  });
});
