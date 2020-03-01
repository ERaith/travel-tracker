import $ from "jquery";
export function generateClientView(domUpdates) {
  let loginHtml = `
  <header>
    <h1>Welcome to Travel Tracker</h1>
  </header>
  <main>
    <section class="client-data">
      <article class="client-trips">
        <center><h2>Your Trips!</h2></center>
        <div class="table-wrap">
          <input class="form-control" id="table-filter" type="text" placeholder="Filter results...">
          <br>
          <div class="table-responsive">
            <table data-toggle="table" id="table_data" class="table table-bordered table-hover">
              <thead class="theme-dark">
                <!-- <tr class = 'header'> -->
                  <th id="Trip">Trip ID</th>
                  <th id="Trip Name">Destination</th>
                  <th id="Status">Status</th>
                  <th id="Date">MM/DD/YYYY</th>
                <!-- </tr> -->
              </thead>
              <tbody>
                <tr>
                  <th id="Trip">#123456</th>
                  <th id="Trip Name">Florida</th>
                  <th id="Status">Pending</th>
                  <th id="Date">1/1/2015</th>
                </tr>
                <tr>
                  <th id="Trip">#123456</th>
                  <th id="Trip Name">Florida</th>
                  <th id="Status">Pending</th>
                  <th id="Date">1/1/2015</th>
                </tr>
                <tr>
                  <th id="Trip">#123456</th>
                  <th id="Trip Name">Florida</th>
                  <th id="Status">Pending</th>
                  <th id="Date">1/1/2015</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>

      </article>
      <article class="client-overview">
        <div class="button-container">
          <button>Year to Date</button><button>Select Dates</button>
        </div>
        <div class = chart-wrapper>
                <canvas class="chart" id="client-data"></canvas>
        </div>


      </article>

    </section>

    <section class="client-trip-preperation">
      <article class="client-trip-selection">

      </article>
      <article class="client-trip-preview">

      </article>
    </section>
  </main>
    `;
  $(domUpdates.body).append(loginHtml);
  generateTableHTML();
  let data = [1, 2, 3, 4];
  let labels = ["one", "two", "three", "four"];
  let label = "word";
  let chartType = "client-data";
  let color = "rgba(216, 17, 89, 1)";
  displayLineChart(data, labels, label, chartType, color);
}

function generateTableHTML() {
  console.log("Can access within same file");
}

function displayLineChart(data, labels, label, chartType, color) {
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
            scaleLabel: {
              display: false,
              labelString: "Date"
            }
          }
        ],
        yAxes: [
          {
            display: true,
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
