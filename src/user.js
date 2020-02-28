import DatabaseController from "./databaseController.js";

class User {
  constructor(userName) {
    this.name = userName;
    let role = "anonymous";
    let password = "test";
    let loggedIn = false;
    let id = null;
    this.databaseController = new DatabaseController();
    this.login = (passwordEntered) => {
      let response = this.databaseController.loginAttempt(this.name,passwordEntered)
      if(response.message === 'Login Successfull') {
        loggedIn = true;
        role = response.role;
        id = role.id;
        return response.message;
      } else {
        return response.message;
      }
    };
  }
}

export default User;
