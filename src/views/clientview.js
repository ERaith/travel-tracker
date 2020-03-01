import $ from "jquery";
export function generateClientView(domUpdates, clientTripsData,totalTripCost) {
  let tableHTML = generateTableHTML(clientTripsData);

  let clientHTML = `
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
            ${tableHTML}
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
        <h1>${totalTripCost}</h1>
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
  $(domUpdates.body).append(clientHTML);

  let cost = clientTripsData.map(trip => {
    return trip.cost;
  })

  let labels = clientTripsData.map(trip => {
    return `${trip.date}`;
  })
  let label = "word";
  let chartType = "client-data";
  let color = "rgba(216, 17, 89, 1)";
  displayLineChart(cost, labels, label, chartType, color);
}

function generateTableHTML(clientTripsData) {
  // []
  // id: 55
  // userID: 39
  // destinationID: 49
  // travelers: 3
  // date: "2020/03/08"
  // duration: 6
  // status: "approved"
  // suggestedActivities: []
  let rowsHTML = clientTripsData
    .reduce((rowHTML, trip) => {
      rowHTML.push(`
    <tr>
      <th id="${trip.id}">#${trip.id}</th>
      <th id="destination">${trip.destination}</th>
      <th id="travelers">${trip.travelers}</th>
      <th id="date">${trip.date}</th>
      <th id="duration">${trip.duration}</th>
      <th id="status">${trip.status}</th>
      <th id="cost">${trip.cost}</th>
    </tr>
    `);
      return rowHTML;
    }, [])
    .join();
  let tableHTML = `
  <table data-toggle="table" id="table_data" class="table table-bordered table-hover">
  <thead class="theme-dark">
    <!-- <tr class = 'header'> -->
    <th id="tripID">Trip#</th>
    <th id="destination">Desitination</th>
    <th id="travelers">Travelers</th>
    <th id="date">Date</th>
    <th id="duration">Duration(days)</th>
    <th id="status">Status</th>
    <th id="cost">Cost</th>
    <!-- </tr> -->
  </thead>
  <tbody>
    ${rowsHTML}
  </tbody>
</table>
`;
  return tableHTML;
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
