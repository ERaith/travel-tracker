class User {
  constructor(info) {
    this.name = info.name || "anon";
    let role = info.role || "anonymous";
    this.whoAmI = () => {
      return role;
    }

  }

}

export default User;
