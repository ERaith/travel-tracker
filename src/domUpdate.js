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

  clientView(authUser,clientTripsData,totalTripCost) {
    this.clearView();
    generateClientView(this,clientTripsData,totalTripCost);
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
