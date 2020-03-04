import User from './user.js';

class Admin extends User {
  constructor(info) {
    super(info)
    this.id = info.id;
  }

}

export default Admin;