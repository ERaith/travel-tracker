import { expect } from "chai";
import User from "../src/user.js";

describe("See if the User tests are running", function() {
  it("should return true", function() {
    expect(true).to.equal(true);
  });

  describe("User Story:", function() {
    it("should be initialized", function() {
      let info = {name:'Jeff',role:'client'}
      let newUser = new User(info);
      expect(newUser.name).to.equal("Jeff");
    });

   
  });
});
