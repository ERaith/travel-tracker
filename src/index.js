import $ from "jquery";
import "./css/application.scss";


import "./images/turing-logo.png";
export * from './constants.js'

import DomUpdate from "./domUpdate";
import DatabaseController from "./databaseController";

let domUpdates = new DomUpdate();
let databaseController = new DatabaseController();

let user;

function start() {
  domUpdates.loginForm(databaseController);
}





export function updateTripCost(
  destinationData,
  travelers,
  startDate,
  endDate,
  destination
) {
  let cost = databaseController.authUser.tripCost(
    destinationData,
    travelers,
    startDate,
    endDate,
    destination
  );
  return cost;
}

start();