class User {
  constructor(info) {
    this.name = info.name || "anon";
    let role = info.role || "anonymous";
    this.whoAmI = () => {
      return role;
    }

  }

  updateTotalCost(filteredData,type) {
    console.log(type)
    if(type === 'Spent'){
      type = 'cost';
    } else {
      type = 'adminFee';
    }
    let total = Math.round(filteredData.reduce((sum,trip) => {
      sum = sum + trip[type]
      return sum;
    },0))
    return total.toLocaleString("us-US", {
      style: "currency",
      currency: "USD"
    });
  }


}

export default User;
