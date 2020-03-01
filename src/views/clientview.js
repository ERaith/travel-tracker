import $ from "jquery";
import moment from "moment";
import datepicker from 'js-datepicker'

export function generateClientView(domUpdates, clientTripsData, totalTripCost,destinationData) {
  let tableHTML = generateTableHTML(clientTripsData);
  let dropdownHTML = generateDropDown(destinationData);
  let clientHTML = `
  <header>
    <h1>Welcome to Travel Tracker</h1>
  </header>
  <main>
    <section class="client-data">
      <article class="client-trips">
      <div class="button-container">
      <button>Year to Date</button><button>Select Dates</button>
    </div>
      <div class = "total-cost">
        <h1>Total Cost: <span>${totalTripCost}</span></h1>
        </div>
        <div class="table-wrap">
          <br>
          <div class="table-responsive">
            ${tableHTML}
          </div>
        </div>
        </div>

      </article>
      <article class="client-overview">

        <div class = chart-wrapper>
          <canvas class="chart" id="client-data"></canvas>
        </div>
  
      </article>
    </section>
    <section class="client-trip-preperation">
      <article class="client-trip-selection">
      <div class="destination-picker">
      <form class="login-form">

        <div class = "destination"> 
        <label for="travelers">Number of travelers (1-10):</label>
        <input type="number" id="travelers" name="travelers" min="10" max="100">

        <label for="destination-dropdown">Choose a Destination:</label>
        <select id="destination-dropdown" name="destinations">
        ${dropdownHTML}

        </select>
        </div>
        <div class = "dates">
        <label for="from-date">Date of Departure</label>
        <input id ="1" class ="start" type="text">

        <label for="from-date">Date of Departure</label>
        <input id ="1" class ="end" type="text">
        
        </div>
      </form>
      <button>Submit</button>
    </div>

      </article>
      <article class="client-trip-preview">

      </article>
    </section>
  </main>
    `;
  $(domUpdates.body).append(clientHTML);

  // const picker = datepicker('#date-picker')
  const start = datepicker('.start', { id: 1 })
const end = datepicker('.end', { id: 1 })
 

  let cost = clientTripsData.map(trip => {
    return trip.cost;
  });

  let labels = clientTripsData.map(trip => {
    // return moment(`${trip.date}`).format('MM DD, YYYY');
    return `${trip.date}`;
  });
  let label = "Trip Cost";
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
    <tr class = 'header'>
    <th id="tripID">Trip#</th>
    <th id="destination">Desitination</th>
    <th id="travelers">Travelers</th>
    <th id="date">Date</th>
    <th id="duration">Duration(days)</th>
    <th id="status">Status</th>
    <th id="cost">Cost</th>
    </tr>
  </thead>
  <tbody>
    ${rowsHTML}
  </tbody>
</table>
`;
  return tableHTML;
}

function generateDropDown(destinationData){
let dropDownHTML = destinationData
.reduce((optionHTML, destination) => {
  optionHTML.push(`
  <option value="${destination.id}">${destination.destination}</option>
`);
  return optionHTML;
}, [])
.join();

return dropDownHTML; 

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
