import { expect } from "chai";
import User from "../src/user.js";

describe("See if the tests are running", function() {
  it("should return true", function() {
    expect(true).to.equal(true);
  });
});

describe("User Story:", function() {
  it("should be initialized", function() {
    let newUser = new User("Jeff");
    let expectedOutcome = {
      name: "Jeff",
      role: "anonymous"
    };
    expect(newUser.name).to.equal('Jeff');
    expect(newUser.role).to.equal('anonymous')
  });
  it("should be able to access iteself", function() {
    let newUser = new User("Jeff");
    let expectedOutcome = {
      name: "Jeff",
      role: "anonymous"
    };
    expect(newUser.login()).to.deep.equal('test');
  });
});
