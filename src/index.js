// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from "jquery";

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/application.scss";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";


import User from './user';
import DomUpdate from './domUpdate';

let domUpdates = new DomUpdate();

function start() {
  let currentUser = new User("John");
  // let currentUser = new User("Morey Flanders");
  domUpdates.loginForm(currentUser);
  // currentUser.login("travel2020")

  // Show div html based on role
  if (currentUser.role == "anonymous") {
    $("div.anonymous").show();
  }
  
  if (currentUser.role == "end_user") {
    $("div.end_user").show();
  }
  
  if (currentUser.role == "manager") {
    $("div.manager").show();
  }  
};

start();