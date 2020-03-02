const { generateLogin } = require("./views/login");
import $ from "jquery";
import { generateClientView } from "./views/clientview";

class DomUpdate {
  constructor() {
    this.body = $("body");
    this.user = "";
  }

  loginForm(databaseController) {
    generateLogin(this, databaseController, this.body);
  }

  clientView(authUser, clientTripsData, totalTripCost, destinationData,databaseController) {
    this.clearView();
    console.log(authUser)
    generateClientView(this, clientTripsData, totalTripCost, destinationData,databaseController);
  }

  adminView() {
    this.clearView();
    generateAdminView(this);
  }

  clearView() {
    $(this.body).empty();
  }
}

export default DomUpdate;
