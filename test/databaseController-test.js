import DatabaseController from "../src/databaseController";
import { BASE_URL, TRAVEL_ENDPOINT,TRIP_ENDPOINT,DESTINATIONS_ENDPOINT,UPDATE_TRIP_ENDPOINT } from '../src/constants';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import Traveler from "../src/traveler";
import Admin from "../src/admin";
chai.use(spies);





describe("See if the database tests are running", function() {

  let databaseController;
  beforeEach(function() {
    global.window = {};
    chai.spy.on(global, 'fetch', () => new Promise((resolve, reject) => {}));
    
  });

  afterEach(function() {
    chai.spy.restore();
  })
  it("should return true", function() {
    expect(true).to.equal(true);
  });

  it('should authenticate a traveler', function() {
    databaseController = new DatabaseController()
    let domUpdates = {}
    let traveler = new Traveler({
      message: "Login Successfull",
      role: 'client',
      id: 1,
      name: 'Ham Leadbeater'
    })
    chai.spy.on(domUpdates,'updateUser',()=>{});
    databaseController.login('Ham Leadbeater','travel2020',domUpdates);
    expect(domUpdates.updateUser).to.be.called(1);
    // expect(domUpdates.updateUser).to.be.called.with(traveler,databaseController)

  });

  it('should fetch a trip from the server', function() {
    databaseController = new DatabaseController()
      databaseController.fetchAllTrips();

      expect(global.fetch).to.be.called(1);
      expect(global.fetch).to.be.called.with(BASE_URL + TRIP_ENDPOINT)

  });



});
