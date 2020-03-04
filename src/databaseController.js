import {
  authenticate
} from "./auth.js";
import Admin from "./admin.js";
import Traveler from "./traveler.js";
const usersInfo = require("../private/userDB");
import moment from "moment";
import {
  BASE_URL,
  TRAVEL_ENDPOINT,
  TRIP_ENDPOINT,
  DESTINATIONS_ENDPOINT,
  UPDATE_TRIP_ENDPOINT
} from './constants';

class DatabaseController {
  constructor() {
    let hash = () => {};
    this.token = "token placeholder";
    this.authUser = '';
  }

  login(userName, passwordEntered, domUpdates) {
    let response = authenticate(userName, passwordEntered);
    if (response.message === "Login Successfull") {
      if (response.role === "client") {
        this.authUser = new Traveler(response);
        domUpdates.updateUser(this.authUser, this);
      } else {
        this.authUser = new Admin(response);
        domUpdates.updateUser(this.authUser, this);
      }
    } else {
      return response.message;
    }
  }

  async fetchSingleUserInfo(authUser) {
    let response = await fetch(
      BASE_URL + TRAVEL_ENDPOINT + `${authUser.id}`
    );
    let userInfo = await response.json();

    return userInfo;
  }

  async fetchAllTrips() {
    let response = await fetch(
      BASE_URL + TRIP_ENDPOINT
    );
    let allTrips = await response.json();
    let destinations = await this.fetchDestinations();
    allTrips = allTrips.trips;
    allTrips = allTrips.map(trip => {
      let name = usersInfo.travelers.find(user => {
        return user.id === trip.userID
      }).name

      let destination = destinations.find(destination => {
        return destination.id === trip.destinationID;
      });

      let cost =
        (destination.estimatedLodgingCostPerDay * trip.duration +
          destination.estimatedFlightCostPerPerson * trip.travelers) * 1.1;
      cost = Math.round(cost);

      let adminFee =
        (destination.estimatedLodgingCostPerDay * trip.duration +
          destination.estimatedFlightCostPerPerson * trip.travelers) * .1;
      cost = Math.round(cost);

      return {
        ...trip,
        clientName: name,
        destination: destination.destination,
        cost:cost,
        adminFee:adminFee
      }
    })
    allTrips.sort((a, b) => {
      return moment(b.date) - moment(a.date)
    })
    return allTrips;
  }

  async fetchUserTrips(authUser) {
    let allTrips = await this.fetchAllTrips();

    let userTrips = allTrips.filter(trip => {
      return trip.userID === authUser.id;
    });

    // let destinations = await this.fetchDestinations();
    // // id: 55
    // // userID: 39
    // // destinationID: 49
    // // travelers: 3
    // // date: "2020/03/08"
    // // duration: 6
    // // status: "approved"
    // // suggestedActivities: []
    // // console.log(destinations)
    // // return true;
    // let userTripsPlusCost = userTrips.reduce((tripsPlusCost, trip) => {
    //   let myDestination = destinations.find(destination => {
    //     return destination.id === trip.destinationID;
    //   });
    //
    //   let cost =
    //     (myDestination.estimatedLodgingCostPerDay * trip.duration +
    //       myDestination.estimatedFlightCostPerPerson * trip.travelers) * 1.1;
    //   cost = Math.round(cost);
    //   tripsPlusCost.push({
    //     id: trip.id,
    //     userID: trip.userID,
    //     destination: myDestination.destination,
    //     destinationID: trip.destinationID,
    //     travelers: trip.travelers,
    //     date: trip.date,
    //     duration: trip.duration,
    //     status: trip.status,
    //     suggestedActivities: trip.suggestedActivities,
    //     cost: cost
    //   });
    //   return tripsPlusCost;
    // }, []);
    return userTrips;
  }

  async fetchDestinations() {
    // "destinations": [
    //   {
    //   "id": 1,
    //   "destination": "Lima, Peru",
    //   "estimatedLodgingCostPerDay": 70,
    //   "estimatedFlightCostPerPerson": 400,
    //   "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    //   "alt": "overview of city buildings with a clear sky"
    //   },
    let response = await fetch(BASE_URL + DESTINATIONS_ENDPOINT);
    let destinations = await response.json();
    return destinations.destinations;
  }

  async bookTrip(data) {

    // startDate = moment(startDate);
    // endDate = moment(endDate);
    // let duration = endDate.diff(startDate, 'days');


    // let id = this.authUser.generateRandomNumber()


    // let data = JSON.stringify({

    //   "userID": this.authUser.id,
    //   "id": id,
    //   "destinationID": parseInt(destination),
    //   "travelers": parseInt(travelers),
    //   "date": startDate.format('YYYY/MM/DD'),
    //   "duration": duration,
    //   "status": "pending",
    //   "suggestedActivities": []
    // });
    // //      "tripID":456789123,
    // console.log(data)
    let response = await fetch(
      BASE_URL + TRIP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      }
    );
    let retrievedData = await response.json();
    let updatedUserTrips = await this.fetchUserTrips(this.authUser);
    return updatedUserTrips;

  }

  async modifyTrip(type) {
    let modifyType = type.split('-')[0];
    let id = type.split('-')[1]
    let response;
    switch (modifyType) {
      case 'approve':
        response = await this.approveTrip(id)
        break;
      case 'delete':
        response = await this.deleteTrip(id)
        break;
      default:

    }
    let updatedTripData = await this.fetchAllTrips();
    return updatedTripData;
  }

  async approveTrip(id) {
    // Sample data format to check against
    // {
    // "id": 92829,
    //  "status": "approved"
    //  }

    let data = JSON.stringify({
      id: parseInt(id),
      status: "approved"
    })

    console.log(data)

    let response = await fetch(
      BASE_URL + UPDATE_TRIP_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      }
    );

    let retrievedData = await response.json();
    console.log(retrievedData)


  }

  async deleteTrip(id) {
    // Sample data format to check against
    // {
    //   "id": 92829
    // }
    let data = JSON.stringify({
      id: parseInt(id)
    })

    let response = await fetch(
      BASE_URL + TRIP_ENDPOINT, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      }
    );

    let updatedTripData = await this.fetchAllTrips();
    return updatedTripData;

  }

}

export default DatabaseController;
