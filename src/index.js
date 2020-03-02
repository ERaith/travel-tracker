// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from "jquery";

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/application.scss";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

import DomUpdate from "./domUpdate";
import DatabaseController from "./databaseController";

let domUpdates = new DomUpdate();
let databaseController = new DatabaseController();

let user;

function start() {
  domUpdates.loginForm(databaseController);
}

export async function updateUser(authUser) {
  // console.log(authUser);
  switch (authUser.whoAmI()) {
    case "admin":
      //run admin interface here
      domUpdates.adminView();

      break;
    case "client":
      user = authUser;
      let clientTripsData = await databaseController.fetchUserTrips(authUser);
      let totalTripCost = calcTotalTripCost(clientTripsData);
      let destinationData = await databaseController.fetchDestinations();
      domUpdates.clientView(
        clientTripsData,
        totalTripCost,
        destinationData,
        databaseController
      );
      break;
  }
}

function calcTotalTripCost(clientTripsData) {
  let tripsSum = clientTripsData.reduce((sum, trip) => {
    sum += trip.cost;
    return sum;
  }, 0);

  return tripsSum.toLocaleString("us-US", {
    style: "currency",
    currency: "USD"
  });
}

export function updateTripCost(
  destinationData,
  travelers,
  startDate,
  endDate,
  destination
) {
  let cost = user.tripCost(
    destinationData,
    travelers,
    startDate,
    endDate,
    destination
  );
  return cost;
}

start();
