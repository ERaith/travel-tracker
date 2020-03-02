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
    let duration = endDate.diff(startDate, "days");
    let trip = destinationData.find(trip => {
      return trip.id == destination;
    });
    let cost =
      (trip.estimatedLodgingCostPerDay * duration +
        trip.estimatedFlightCostPerPerson * travelers) *
      1.1;
    cost = Math.round(cost);
    return cost;
  }

  calcTotalTripCost(clientTripsData) {
    let tripsSum = clientTripsData.reduce((sum, trip) => {
      sum += trip.cost;
      return sum;
    }, 0);
  
    return tripsSum.toLocaleString("us-US", {
      style: "currency",
      currency: "USD"
    });
  }
}

export default Traveler;
