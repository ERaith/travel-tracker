const usersInfo = require("../private/userDB");
var bcrypt = require("bcryptjs");

export function authenticate(userName, passwordAttempt) {
  let isValid = false;
  let curUser = usersInfo.travelers.find(user => {
    return user.name === userName;
  });


  let hash = curUser.password;
  if (curUser) {
    if (bcrypt.compareSync(passwordAttempt, hash)) {
      return {
        message: "Login Successfull",
        role: curUser.role,
        id: curUser.id
      };
    }
  } else {
    return { message: "Login Failed" };
  }
}

export function newUserPassword() {
  var salt = bcrypt.genSaltSync(5);
  console.log(salt);
  var hash = bcrypt.hashSync("travel2020", salt);
  console.log(hash);
  var a = bcrypt.compareSync("whaup", hash); // false
  var b = bcrypt.compareSync(passwordAttempt, hash); // true
  console.log(a, b);
}
