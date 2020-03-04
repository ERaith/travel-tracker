import $ from "jquery";
import moment from "moment";
import datepicker from "js-datepicker";
import {
  updateTripCost
} from "../index";

export function generateClientView(
  domUpdates,
  clientTripsData,
  destinationData,
  databaseController
) {
  let clientHTML = `
<div class = "client-page">
  <section class = "client-booker">
    <article class="client-trip-selection">
    </article>
    <article class="client-trip-preview">
      <img id="preview-trip" src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80" alt="trip preview">
    </article>
  </section>
    <article class = "past-trips">
      <div class="table-wrapper">
        <div class="table-responsive">
        </div>
      </div>
      </div>
    </article>
    <article class="client-trip-data">
        </canvas><canvas id="client-data"></canvas>
    </article>
    </div>
    `;

  $(domUpdates.main).append(clientHTML);
  generateFormHTML(destinationData);
  initDatePicker();
  eventListeners(destinationData, databaseController, domUpdates);
  domUpdates.displayLineChart(clientTripsData);
  generateTableHTML(clientTripsData);
  domUpdates.updateTotalCostDOM(databaseController,clientTripsData, 'Spent');
}

function eventListeners(destinationData, databaseController, domUpdates) {
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
    updateTravelCost(destinationData, databaseController);
  });

  submitButton.on("click", function() {
    submit(databaseController, domUpdates);
  });

  $("#destination-dropdown").on("change", function() {
    let trip = destinationData.find(destination => {
      return destination.id == $(this).val();
    });

    $("#preview-trip").attr("src", trip.image);
  });
}

function initDatePicker() {
  let today = new Date();
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  const start = datepicker(".start", {
    id: 1
  });
  start.setDate(today, true);
  const end = datepicker(".end", {
    id: 1
  });
  end.setDate(today.addDays(12), true);
}

function updateTravelCost(destinationData) {
  var travelers = $("#travelers").val();
  var startDate = $(".start").val();
  var endDate = $(".end").val();
  var destination = $("#destination-dropdown").val();
  let cost = updateTripCost(
    destinationData,
    travelers,
    startDate,
    endDate,
    destination
  );
  $(".trip-cost").text(`Estimated Trip Cost: $${cost}`);
}

function generateFormHTML(destinationData) {
  let dropdownHTML = generateDropDown(destinationData);
  let formHTML = `
  <div class="destination-picker">
  <h2> Book Your Trip Today!</h2>
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
  <h2><span class ="trip-cost"></span></h2>

  `;

  $(".client-trip-selection").empty();
  $(".client-trip-selection").append(formHTML);
}

async function submit(databaseController, domUpdates) {
  var travelers = $("#travelers").val();
  var startDate = $(".start").val();
  var endDate = $(".end").val();
  var destination = $("#destination-dropdown").val();

  let tripData = databaseController.authUser.createTrip(
    travelers,
    startDate,
    endDate,
    destination
  );
  let updatedClientTripsData = await databaseController.bookTrip(tripData)
  generateTableHTML(updatedClientTripsData);
  $("#travelers").val("");
  domUpdates.displayLineChart(updatedClientTripsData);

}

function generateTableHTML(clientTripsData) {


  let  rowsHTML = clientTripsData.reduce((rowHTML, trip) => {
      let row = `
      <tr>
        <td class = "flex-row" id="${trip.id}">#${trip.id}</td>
        <td class = "flex-row" id="destination">${trip.destination}</td>
        <td class = "flex-row" id="travelers-col">${trip.travelers}</td>
        <td class = "flex-row" id="date">${trip.date}</td>
        <td class = "flex-row" id="duration">${trip.duration}</td>
        <td class = "flex-row" id="status">${trip.status}</td>
        <td class = "flex-row" id="cost">${trip.cost}</td>
      </tr>
      `;
      rowHTML = rowHTML.concat(" ", row);
      return rowHTML;
    }, "");

  let tableHTML = `
  <h2>Trip Data</h2>
  <table data-toggle="table" id="table_data" class="table table-bordered table-hover">
  <thead>
    <tr class = 'flex-table header'>
    <th class = "flex-row" id="tripID">Trip#</th>
    <th class = "flex-row" id="destination">Desitination</th>
    <th class = "flex-row" id="travelers-head">Travelers</th>
    <th class = "flex-row" id="date">Date</th>
    <th class = "flex-row" id="duration">Duration(days)</th>
    <th class = "flex-row" id="status">Status</th>
    <th class = "flex-row" id="cost">Cost</th>
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
