const loginView = require("./views/login");
import $ from "jquery";
// const $ = require('jquery');

class DomUpdate {
  constructor() {
    this.body = $("body");
    // this.searchField = $(".search-bar");
  }

  greetUser(user) {}
  createDOMBindings() {}

  loginForm(user) {
    this.body.append(loginView.html);
    let loginButton = $("button");
    console.log(loginButton)
    let userName = $("input")

    loginButton.click(function(event) {
      event.preventDefault();
      var name = $("#userName").val();
      var password = $("#password").val();
      user.updateName(name);
      user.login(password);
      console.log(name);
      console.log(password);
      return false;
     
    });
  }
}

export default DomUpdate;
