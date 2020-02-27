// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from "jquery";

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/application.scss";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

let user = {
  role: "anonymous"
};


//Initialize User

//




// Show div html based on role
if (user.role == "anonymous") {
  $("div.anonymous").show();
}

if (user.role == "end_user") {
  $("div.end_user").show();
}

if (user.role == "manager") {
  $("div.manager").show();
}
