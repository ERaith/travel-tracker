const { generateLogin } = require("./views/login");
import $ from "jquery";
import { generateClientView } from "./views/clientview";

class DomUpdate {
  constructor() {
    this.body = $("body");
  }
  greetUser(user) {}

  createDOMBindings() {}

  loginForm(dabaseController) {
    generateLogin(this, dabaseController, this.body);
  }

  loadView(authUser) {

    switch (authUser.whoAmI()) {
      case "admin":
        //run admin interface here
        this.adminView();
        break;
      case "client":
        //run client interface here
        this.clientView();
        break;
    }
  }
  clientView() {
    this.clearView();
    generateClientView(this);
  }
  adminView() {
    this.clearView();
    generateAdminView(this);
  }
  clearView() {
    $(this.body).empty()
  }

  displayLineChart(data, labels, label, chartType, color) {
    var ctx = document.getElementById(chartType).getContext('2d');
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          backgroundColor: color,
          borderColor: '#AEBDCB',
          data,
          fill: true,
        }]
      },
      options: {
        legend: {
          display: false
        },
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: label
            }
          }]
        }
      }
    });
  }
}

export default DomUpdate;
