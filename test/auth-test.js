import {
  expect
} from "chai";
import {
  authenticate
} from "../src/auth.js";

describe("See if the auth tests are running", function() {
  it("should return true", function() {
    expect(true).to.equal(true);
  });

  describe("Should be able to find a user", function() {
    it("should return true if user is found", function() {
      expect(authenticate('Morey Flanders', 'travel2020')).to.deep.equal({
        message: 'Login Successfull',
        role: 'client',
        name: 'Morey Flanders',
        id: 50
      });
    });
    it("should return failed state and a message if user is not found", function() {
      expect(authenticate('More', 'travel2020')).to.deep.equal({
        message: "User Not Found",
        failed: true
      });
    });
    it("should return failed state and a message if password is not found", function() {
      expect(authenticate('Morey Flanders', 'travdel2020')).to.deep.equal({
        message: 'Password Incorrect',
        failed: true
      });
    });
  });
});
