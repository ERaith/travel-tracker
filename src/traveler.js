import User from "./user.js";
import DatabaseController from "./databaseController.js";
import moment from "moment";

class Traveler extends User {
  constructor(info) {
    super(info);
    this.id = info.id;
    this.databaseController = new DatabaseController();
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

  generateRandomNumber() {
      return Math.floor(1000 + Math.random() * 9000);
  }

  createTrip(travelers, startDate, endDate, destination){
    startDate = moment(startDate);
    endDate = moment(endDate);
    let duration = endDate.diff(startDate, 'days');

    let id = this.generateRandomNumber()

    let tripData = JSON.stringify({

      "userID": this.id,
      "id": id,
      "destinationID": parseInt(destination),
      "travelers": parseInt(travelers),
      "date": startDate.format('YYYY/MM/DD'),
      "duration": duration,
      "status": "pending",
      "suggestedActivities": []
    });
    //      "tripID":456789123,
    return tripData;
  }

}

export default Traveler;
