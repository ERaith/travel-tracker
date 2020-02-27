class User {
  constructor(userName) {
    this.name = userName;
    this.role = "anonymous";
    let password = "test";
    let token = "Placeholder";
    this.login = () => password;
  }
}

export default User;
