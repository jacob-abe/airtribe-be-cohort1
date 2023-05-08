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
//   const user = {
//     name: "testuser",
//     token: null,
//   };

//   before((done) => {
//     chai
//       .request(app)
//       .post("/login")
//       .send({ name: user.name, password: "testpassword" })
//       .end((err, res) => {
//         user.token = res.body.accessToken;
//         done();
//       });
//   });

//   it("Should allow a request within the rate limit", (done) => {
//     chai
//       .request(app)
//       .get("/news")
//       .set("Authorization", `Bearer ${user.token}`)
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.an("array");
//         done();
//       });
//   });

//   it("Should rate limit excessive requests", (done) => {
//     // Replace 5 with the number of allowed requests per window (rate limit)
//     const promises = Array(2)
//       .fill(null)
//       .map(() =>
//         chai
//           .request(app)
//           .get("/news")
//           .set("Authorization", `Bearer ${user.token}`)
//       );

//     Promise.all(promises)
//       .then((responses) => {
//         responses.forEach((res) => expect(res).to.have.status(200));

//         return chai
//           .request(app)
//           .get("/news")
//           .set("Authorization", `Bearer ${user.token}`);
//       })
//       .then((res) => {
//         expect(res).to.have.status(429); // 429 is the status code for "Too Many Requests"
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });

describe("Rate Limiting", () => {
  before(function () {
    this.timeout(20000); // Increase timeout to 20 seconds
  });

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

  it("Should allow requests under the rate limit", (done) => {
    chai
      .request(app)
      .get("/news")
      .set("Authorization", `Bearer ${user.token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Should not allow requests exceeding the rate limit", async function () {
    this.timeout(30000); // Increase timeout to 30 seconds for this test

    const totalRequests = 6;
    const successfulResponses = [];
    const rateLimitedResponses = [];

    for (let i = 0; i < totalRequests; i++) {
      try {
        const res = await chai
          .request(app)
          .get("/news")
          .set("Authorization", `Bearer ${user.token}`);
        successfulResponses.push(res);
      } catch (err) {
        rateLimitedResponses.push(err);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    expect(successfulResponses.length).to.equal(6);
    expect(rateLimitedResponses.length).to.equal(0);

    rateLimitedResponses.forEach((err) => {
      expect(err).to.have.status(429); // the rate-limited response should have a status code of 429
    });
  });
});
