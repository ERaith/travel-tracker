import {authenticate} from "./auth.js";

class DatabaseController {
  constructor() {
    let hash = () => {
      return "hased-password";
    };
    this.token = "token placeholder";
  }
  loginAttempt(userName,password) {
    let hexPassword = password;
    return authenticate(userName,hexPassword);
  }
}

export default DatabaseController;
