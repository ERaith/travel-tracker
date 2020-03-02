import { authenticate } from "./auth.js";
import Admin from "./admin.js";
import Traveler from "./traveler.js";
import { updateUser } from "./index";

class DatabaseController {
  constructor() {
    let hash = () => {};
    this.token = "token placeholder";
    this.authUser ='';
  }
  login(userName, passwordEntered) {
    let response = authenticate(userName, passwordEntered);
    if (response.message === "Login Successfull") {
      if (response.role === "client") {
        this.authUser = new Traveler(response);
        updateUser(this.authUser);

      } else {
        this.authUser = new Admin(response);
        updateUser(this.authUser);
      }
    } else {
      return response.message;
    }
  }
  async fetchSingleUserInfo(authUser) {
    let response = await fetch(
      `https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers/${authUser.id}`
    );
    let userInfo = await response.json();

    return userInfo;
  }
  async fetchAllTrips() {
    let response = await fetch(
      `https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips`
    );
    let allTrips = await response.json();
    return allTrips;
  }

  async fetchUserTrips(authUser) {
    let allTrips = await this.fetchAllTrips();
    let userTrips = allTrips.trips.filter(trip => {
      return trip.userID === authUser.id;
    });

    let destinations = await this.fetchDestinations();
    // id: 55
    // userID: 39
    // destinationID: 49
    // travelers: 3
    // date: "2020/03/08"
    // duration: 6
    // status: "approved"
    // suggestedActivities: []
    // console.log(destinations)
    // return true;
    let userTripsPlusCost = userTrips.reduce((tripsPlusCost, trip) => {
      let myDestination = destinations.find(destination => {
        return destination.id === trip.destinationID;
      });

      let cost =
        (myDestination.estimatedLodgingCostPerDay * trip.duration +
          myDestination.estimatedFlightCostPerPerson * trip.travelers) * 1.1;
          cost = Math.round(cost);
      tripsPlusCost.push({
        id: trip.id,
        userID: trip.userID,
        destination: myDestination.destination,
        destinationID: trip.destinationID,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities,
        cost: cost
      });
      return tripsPlusCost;
    }, []);

    return userTripsPlusCost;

    /*
      create new object, fetch both trips and trip costs
      [{
        userTrip:
        tripCost:
      },{

      }]
    */
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
    let response = await fetch(
      `https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations`
    );
    let destinations = await response.json();
    return destinations.destinations;
  }

  async bookTrip(name,travelers,startDate,endDate,destination){
    let id = Math.floor(1000 + Math.random() * 9000);
    let data = JSON.stringify({

      "userID": 39,
      "id":id,
      "destinationID": 1,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "pending",
      "suggestedActivities": []
   });
   //      "tripID":456789123,

   let response = await fetch(
    "https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips",
    {
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




}

export default DatabaseController;
