const {generateLogin} = require("./views/login");
import $ from "jquery";

class DomUpdate {
  constructor() {
    this.body = $("body");
  }
  greetUser(user) {}

  createDOMBindings() {}

  loginForm(user) {
    generateLogin(user,this.body);
  }
}

export default DomUpdate;
