import User from './user.js';

class Admin extends User {
  constructor(info) {
    super(info.name,info.role)
    let id = info.id;
  }
}

export default Admin;
