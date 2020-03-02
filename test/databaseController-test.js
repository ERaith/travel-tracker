import DatabaseController from "../src/databaseController";
import {
  BASE_URL,
  TRAVEL_ENDPOINT,
  TRIP_ENDPOINT,
  DESTINATIONS_ENDPOINT,
  UPDATE_TRIP_ENDPOINT
} from '../src/constants';
import chai, {
  expect
} from 'chai';
import spies from 'chai-spies';
import Traveler from "../src/traveler";
import Admin from "../src/admin";
chai.use(spies);





describe("Database local tests", function () {


  it("should return true", function () {
    expect(true).to.equal(true);
  });

  it('should authenticate a traveler', function () {
    let databaseController = new DatabaseController()
    let domUpdates = {}
    let traveler = new Traveler({
      message: "Login Successfull",
      role: 'client',
      id: 1,
      name: 'Ham Leadbeater'
    })
    chai.spy.on(domUpdates, 'updateUser', () => {});
    databaseController.login('Ham Leadbeater', 'travel2020', domUpdates);
    expect(domUpdates.updateUser).to.be.called(1);
    // expect(domUpdates.updateUser).to.be.called.with(traveler,databaseController)
  });
});

describe("Database fetch tests", function () {
  let databaseController;
  let traveler;
  beforeEach(function () {
    global.window = {};
    chai.spy.on(global, 'fetch', () => new Promise((resolve, reject) => {}));
    databaseController = new DatabaseController()
    traveler = new Traveler({
      message: "Login Successfull",
      role: 'client',
      id: 1,
      name: 'Ham Leadbeater'
    })
    databaseController.authUser = traveler;

  });

  afterEach(function () {
    chai.spy.restore();
  })

  it('should fetch all trip from the server', function () {
    databaseController.fetchAllTrips();

    expect(global.fetch).to.be.called(1);
    expect(global.fetch).to.be.called.with(BASE_URL + TRIP_ENDPOINT)
  });

  it('should fetch all destinations from the server', function () {
    databaseController.fetchDestinations();

    expect(global.fetch).to.be.called(1);
    expect(global.fetch).to.be.called.with(BASE_URL + DESTINATIONS_ENDPOINT)
  });

  it('should post a request to book a trip', function () {

    let data = JSON.stringify(
      {
        "id": 1,
        "userID": 44,
        "destinationID": 49,
        "travelers": 1,
        "date": "2020/03/03",
        "duration": 11,
        "status": "pending",
        "suggestedActivities": []
     }
    );
    
    databaseController.bookTrip(data);

    expect(global.fetch).to.be.called(1);
    expect(global.fetch).to.be.called.with(BASE_URL + TRIP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    })
  });

  


});
