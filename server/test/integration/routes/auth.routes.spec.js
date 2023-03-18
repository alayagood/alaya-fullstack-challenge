const expect = require("chai").expect;
const request = require("request");
const UserModel = require("../../../models/user");
const db = require("../../../db");

// This is an example of how we could create intregation tests for our server's API.
describe("Authentication API", () => {
  describe("/signup", () => {
    const url = "http://localhost:3000/api/signup";

    beforeEach(async () => {
      await UserModel.deleteMany({});
    });

    after(async () => {
      await db.close();
    });

    it("should return status 200 and create user when payload is valid", async () => {
      const body = {
        email: "email",
        password: "password",
      };

      request.post({ url, body, json: true }, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
      });

      const user = UserModel.findOne({ email: body.email });
      expect(user).to.not.be.undefined;
    });
  });
});
