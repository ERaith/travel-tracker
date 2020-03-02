import User from "./user.js";
import DatabaseController from "./databaseController.js";
import moment from "moment";

class Traveler extends User {
  constructor(info) {
    super(info);
    this.id = info.id;
    this.databaseController = new DatabaseController();
  }
  async findTrips() {
    let trips = await this.databaseController.fetchTrips(this.id);
    return trips;
  }

  tripCost(destinationData, travelers, startDate, endDate, destination) {
    startDate = moment(startDate);
    endDate = moment(endDate);
    console.log("here");
    let duration = endDate.diff(startDate, "days");
    console.log(destination);
    let trip = destinationData.find(trip => {
      console.log(trip.id);
      return trip.id == destination;
    });
    console.log(trip);
    let cost =
      (trip.estimatedLodgingCostPerDay * duration +
        trip.estimatedFlightCostPerPerson * travelers) *
      1.1;
    cost = Math.round(cost);
    return cost;
  }
}

export default Traveler;
