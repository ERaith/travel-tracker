const usersInfo = require("../private/userDB");
var bcrypt = require("bcryptjs");

export function authenticate(userName, passwordAttempt) {
  console.log(userName)
  let curUser = usersInfo.travelers.find(user => {
    return user.name === userName;
  });

  
  if (curUser) {
    let hash = curUser.password;
    if (bcrypt.compareSync(passwordAttempt, hash)) {
      return {
        message: "Login Successfull",
        role: curUser.role,
        id: curUser.id,
        name: curUser.name
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
