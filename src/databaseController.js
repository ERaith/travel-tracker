import {authenticate} from "./auth.js";

class DatabaseController {
  constructor() {
    let hash = () => {}
    this.token = "token placeholder";
  }
  loginAttempt(userName,password) {
    let hexPassword = password;
    return authenticate(userName,hexPassword);
  }
}

export default DatabaseController;
