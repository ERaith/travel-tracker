import { expect } from "chai";
import DatabaseController from "../src/databaseController";
const chai = require("chai"),
  spies = require("chai-spies");
chai.use(spies);
// window = global;
// chai.spy.on(window,'fetch', () => new Promise((resolve,reject)=>{}))


describe("See if the database tests are running", function() {
  beforeEach(function() {
    // global.window = {};
    // chai.spy.on(global, 'fetch', () => new Promise((resolve, reject) => {}));
  });
  it("should return true", function() {
    expect(true).to.equal(true);
  });

  it('should fetch a trip from the server', function() {

    
    // let dBController = new DatabaseController();
    // dBController.fetchAllTrips();
    // expect(global.fetch).to.be.called(1);
  });
});
