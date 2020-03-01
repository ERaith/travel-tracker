import { authenticate } from "./auth.js";
import Admin from "./admin.js";
import Traveler from "./traveler.js";
import { updateUser } from "./index";

class DatabaseController {
  constructor() {
    let hash = () => {};
    this.token = "token placeholder";
  }
  loginAttempt(userName, password) {
    let hexPassword = password;
    return authenticate(userName, hexPassword);
  }

  login(userName, passwordEntered) {
    let response = this.loginAttempt(userName, passwordEntered);
    if (response.message === "Login Successfull") {
      if (response.role === "client") {
        let authUser = new Traveler(response);
        updateUser(authUser);
      } else {
        let authUser =new Admin(response);
        updateUser(authUser);
      }
    } else {
      return response.message;
    }
  }
}

export default DatabaseController;
