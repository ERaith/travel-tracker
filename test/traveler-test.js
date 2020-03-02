import DatabaseController from "../src/databaseController";
import chai, {
  expect
} from 'chai';
import spies from 'chai-spies';
import Traveler from "../src/traveler";
chai.use(spies);

describe("Traveler Tests", function () {
  let traveler;
  let info;

  beforeEach(function () {
    info = {
      message: "Login Successfull",
      role: 'client',
      id: 1,
      name: 'Ham Leadbeater'
    }
    traveler = new Traveler(info)
    global.window = {};
    chai.spy.on(global, 'fetch', () => new Promise((resolve, reject) => {}));
  });
  afterEach(function () {
    chai.spy.restore();
  })

  it("should return true", function () {
    expect(true).to.equal(true);
  });
  it("should find trips cost", function () {
    let destinationData = [{
      id: 50,
      destination: "Hobart, Tasmania",
      estimatedLodgingCostPerDay: 1400,
      estimatedFlightCostPerPerson: 75,
      image: "https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      alt: "person sitting on brown rock in front of body of water"
    }];
    let travelers = "2";
    let startDate = "Mon, Mar 02 2020";
    let endDate = "Sat, Mar 14 2020";
    let destination = "50";

    expect(traveler.tripCost(destinationData, travelers, startDate, endDate, destination)).to.equal(18645)

  });
  it("should calc total trips cost", function () {
    let usertrips = [{
      id: 50,
      cost:100
    },{
      id: 20,
      cost:100
    },{
      id: 30,
      cost:100
    }];
    expect(traveler.calcTotalTripCost(usertrips)).to.equal('$300.00')
  });

  it("should create a new trip", function () {
    let travelers = "2";
    let startDate = "Mon, Mar 02 2020";
    let endDate = "Sat, Mar 14 2020";
    let destination = "50"; 

    let trip = JSON.parse(traveler.createTrip(travelers, startDate, endDate, destination));
    expect(trip.userID).to.equal(1);
    expect(trip.userID).to.be.a('number');
    expect(trip.destinationID).to.equal(50);
    expect(trip.travelers).to.equal(2);
    expect(trip.date).to.equal('2020/03/02');
    expect(trip.duration).to.equal(12);
    expect(trip.status).to.equal('pending');
    expect(trip.suggestedActivities).to.deep.equal([]);
  });


});
