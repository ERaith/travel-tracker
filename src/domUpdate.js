const { generateLogin } = require("./views/login");
import $ from "jquery";
import { generateClientView } from "./views/clientview";

class DomUpdate {
  constructor() {
    this.body = $("body");
  }
  greetUser(user) {}

  createDOMBindings() {}

  loginForm(dabaseController) {
    generateLogin(this, dabaseController, this.body);
  }

  loadView(authUser) {

    switch (authUser.whoAmI()) {
      case "admin":
        //run admin interface here
        this.adminView();
        break;
      case "client":
        //run client interface here
        this.clientView();
        break;
    }
  }
  clientView() {
    this.clearView();
    generateClientView(this);
  }
  adminView() {
    this.clearView();
    generateAdminView(this);
  }
  clearView() {
    $(this.body).empty()
  }
}

export default DomUpdate;
