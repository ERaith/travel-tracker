const { generateLogin } = require("./views/login");
import $ from "jquery";
import { generateClientView } from "./views/clientview";


class DomUpdate {
  constructor() {
    this.body = $("body");
    this.user = "";
  }
  greetUser(user) {}

  createDOMBindings() {}

  loginForm(databaseController) {
    generateLogin(this, databaseController, this.body);
  }

  loadView(authUser) {
    switch (authUser.whoAmI()) {
      case "admin":
        //run admin interface here
        this.adminView();

        break;
      case "client":
        //run client interface here
        this.clientView(authUser);
        break;
    }
  }
  clientView(authUser,databaseController) {
    this.clearView();
    let trips = databaseController
    generateClientView(this);
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
