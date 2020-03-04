const { generateLogin } = require("./views/login");
import $ from "jquery";
import { generateClientView } from "./views/clientview";
import { generateAdminView } from "./views/adminview";

class DomUpdate {
  constructor() {
    this.main = $("main");
    this.totalIncome = $("#totalIncome");
    this.user = "";
  }

  loginForm(databaseController) {
    generateLogin(this, databaseController, this.main);
  }

  clientView(clientTripsData, totalTripCost, destinationData,databaseController) {
    this.clearView();
    generateClientView(this, clientTripsData, totalTripCost, destinationData,databaseController);
  }

  adminView(adminTripData,databaseController) {
    this.clearView();
    generateAdminView(this,adminTripData,databaseController);
  }

  clearView() {
    $(this.main).empty();
  }

  updateTotalCost(filteredData,type) {
    console.log(filteredData)
    let total = Math.round(filteredData.reduce((sum,trip) => {

      sum = sum + (trip.adminFee ||trip.cost)
      return sum;
    },0))
    $(this.totalIncome).text(`${type}: $${total}`);
  }

  displayLineChart(clientTripsData) {

    let data = clientTripsData.map(trip => {
      return trip.cost;
    });

    let labels = clientTripsData.map(trip => {
      // return moment(`${trip.date}`).format('MM DD, YYYY');
      return `${trip.date}`;
    });
    let label = "Trip Cost";
    let chartType = "client-data";
    let color = "rgba(216, 17, 89, 1)";

    var ctx = document.getElementById(chartType).getContext("2d");
    var myLineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label,
            backgroundColor: color,
            borderColor: "#AEBDCB",
            borderWidth: 8,
            data,
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              ticks: {
                fontSize: 20
              },
              scaleLabel: {
                display: false,
                labelString: "Date"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                fontSize: 20
              },
              scaleLabel: {
                display: true,
                labelString: label
              }
            }
          ]
        }
      }
    });
  }
  async updateUser(authUser,databaseController) {
    console.log(authUser.whoAmI())
    switch (authUser.whoAmI()) {
      case "admin":
        let adminTripData = await databaseController.fetchAllTrips();
        this.adminView(adminTripData,databaseController);
        break;
      case "client":
        let clientTripsData = await databaseController.fetchUserTrips(authUser);
        let totalTripCost = authUser.calcTotalTripCost(clientTripsData);
        let destinationData = await databaseController.fetchDestinations();
        this.clientView(
          clientTripsData,
          totalTripCost,
          destinationData,
          databaseController
        );
        break;
    }
  }
}

export default DomUpdate;
