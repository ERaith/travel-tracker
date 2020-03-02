import $ from "jquery";
import moment from "moment";
import datepicker from "js-datepicker";

export function generateClientView(
  domUpdates,
  clientTripsData,
  totalTripCost,
  destinationData,
  databaseController
) {

  let clientHTML = `
  <header>
    <h1>Welcome to Travel Tracker</h1>
  </header>
  <main>
    <section class="client-data">
      <article class="client-trips">
      <div class = "total-cost">
        <h1>Total Cost: <span>${totalTripCost}</span></h1>
        </div>
        <div class="table-wrap">
          <br>
          <div class="table-responsive">
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
    

      </article>
      <article class="client-trip-preview">
    <img id = "preview-trip"src=  "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80" alt = "trip preview">
      </article>
    </section>
  </main>
    `;
  $(domUpdates.body).append(clientHTML);
  createForm(destinationData)
  let today = new Date();
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const start = datepicker(".start", { id: 1 });
  start.setDate(today, true);
  const end = datepicker(".end", { id: 1 });
  end.setDate(today.addDays(12), true);
  let submitButton = $("#myTripButtonSubmit");
  $("form.login-form :input").on("change keyup paste", function() {
    let disabled = true;
    $("form.login-form :input").each(function() {
      if (!$(this).hasClass("qs-overlay-year")) {
        if ($(this).val() != "") {
          disabled = false;
        }
      }
    });
    submitButton.prop("disabled", disabled);
    updateCost(destinationData,databaseController)
  });
  submitButton.on("click", function() {
    submit(databaseController,destinationData);
  });

  $("#destination-dropdown").on("change", function() {
    console.log("this");
    let trip = destinationData.find(destination => {
      return destination.id == $(this).val();
    });

    $("#preview-trip").attr("src", trip.image);
  });



  displayLineChart(clientTripsData);
  generateTableHTML(clientTripsData);
}

function updateCost(destinationData,databaseController) {
  var travelers = $("#travelers").val();
  var startDate = $(".start").val();
  var endDate = $(".end").val();
  var destination = $("#destination-dropdown").val();
  let cost = databaseController.costOfTrip(destinationData,travelers,startDate,endDate,destination);
  console.log($('.trip-cost'))
  $('.trip-cost').text(`$${cost}`)
}

function createForm(destinationData) {
  let dropdownHTML = generateDropDown(destinationData);
  let formHTML =`
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
    <input  class ="start" type="text">

    <label for="from-date">Date of Departure</label>
    <input class ="end" type="text">
    
    </div>
  </form>
  <button id = "myTripButtonSubmit" disabled='true'>Submit</button>
  <span class ="trip-cost"></span>
  `;

  $(".client-trip-selection").empty();
  $(".client-trip-selection").append(formHTML);
}

async function submit(databaseController,) {
  var travelers = $("#travelers").val();
  var startDate = $(".start").val();
  var endDate = $(".end").val();
  var destination = $("#destination-dropdown").val();

  let updatedClientTripsData = await databaseController.bookTrip(
    travelers,
    startDate,
    endDate,
    destination
  );
  generateTableHTML(updatedClientTripsData);
  $('#travelers').val('')
  displayLineChart(updatedClientTripsData);
}

function generateTableHTML(clientTripsData) {
  let rowsHTML = clientTripsData.reduce((rowHTML, trip) => {
    let row = `
    <tr>
      <th id="${trip.id}">#${trip.id}</th>
      <th id="destination">${trip.destination}</th>
      <th id="travelers-col">${trip.travelers}</th>
      <th id="date">${trip.date}</th>
      <th id="duration">${trip.duration}</th>
      <th id="status">${trip.status}</th>
      <th id="cost">${trip.cost}</th>
    </tr>
    `;
    rowHTML = rowHTML.concat(" ", row);
    return rowHTML;
  }, "");
  let tableHTML = `
  <table data-toggle="table" id="table_data" class="table table-bordered table-hover">
  <thead class="theme-dark">
    <tr class = 'header'>
    <th id="tripID">Trip#</th>
    <th id="destination">Desitination</th>
    <th id="travelers-head">Travelers</th>
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
  $(".table-responsive").empty();
  $(".table-responsive").append(tableHTML);
}

function generateDropDown(destinationData) {
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

function displayLineChart(clientTripsData) {

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
