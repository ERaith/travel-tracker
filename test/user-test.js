import { expect } from "chai";
import User from "../src/user.js";

describe("See if the User tests are running", function() {
  it("should return true", function() {
    expect(true).to.equal(true);
  });

  describe("User Story:", function() {
    it("should be initialized", function() {
      let newUser = new User("Jeff");
      expect(newUser.name).to.equal("Jeff");
    });
    it("should be able to login", function() {
      let newUser = new User("Guthry Tute");
      
      expect(newUser.login('travel2020')).to.equal("Login Successfull");
    });
  });
});
