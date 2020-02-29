import {authenticate} from "./auth.js";
import Admin from "./admin.js";
import Traveler from "./traveler.js";

class DatabaseController {
  constructor() {
    let hash = () => {}
    this.token = "token placeholder";
  }
  loginAttempt(userName,password) {
    let hexPassword = password;
    return authenticate(userName,hexPassword);
  }

  login(userName,passwordEntered){
    let response = this.loginAttempt(
      userName,
      passwordEntered
    );
    if (response.message === "Login Successfull") {
      if(response.role === 'client'){
        let traveler = new Traveler(response)
        return traveler;
      } else {
        let admin = new Admin(response)
        return admin;
      }
  
    } else {
      return response.message;
    }
  };
}

export default DatabaseController;
