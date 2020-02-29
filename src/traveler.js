import User from './user.js';

class Traveler extends User {
  constructor(info) {
    super(info)
    let id = info.id;
  }
}

export default Traveler;
