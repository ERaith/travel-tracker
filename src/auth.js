const usersInfo = require('../private/userDB')
export function authenticate(userName,hexPassword){
  let isValid = false;
  let curUser =  usersInfo.travelers.find((user) => {
    return user.name === userName;
  });

  if(curUser){
    if(curUser.password === hexPassword){
      return {message: 'Login Successfull',role:curUser.role,id:curUser.id}
    } 
  } else{
    return {message:'Login Failed'};
  }

}
