class User {
  constructor(info) {
    this.name = info.name || "anon";
    let role = info.role || "anonymous";
    this.whoAmI = () => {
      return role;
    }

  }

  updateTotalCost(filteredData,type) {
    let total = Math.round(filteredData.reduce((sum,trip) => {
      sum = sum + (trip.adminFee ||trip.cost)
      return sum;
    },0))
    return total.toLocaleString("us-US", {
      style: "currency",
      currency: "USD"
    });
  }


}

export default User;
