import User from './user.js';
import DatabaseController from './databaseController.js';

class Traveler extends User {
  constructor(info) {
    super(info)
    this.id = info.id;
    this.databaseController = new DatabaseController();
  }
  async findTrips() {
    let trips = await this.databaseController.fetchTrips(this.id);
    return trips;
  }
  
}

export default Traveler;
