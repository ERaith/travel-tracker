import $ from "jquery";
export function generateAdminView(domUpdates, adminTripData,databaseController) {

  let adminBaseHTML = `
    <div class="login-page">
      <h1>Welcome Admin!</h1>
      <h1>Total Cost: <span id = "totalIncome"></span></h1>
      <section class="client-data">
        <article class="client-trips">
        <input id="search" type="text" placeholder="Search"/>

          </div>
        </article>
      </section>
    </div>
    <div class="table-container">
      <div class="table-responsive">
      </div>
    </div>
    `;

  $(domUpdates.main).append(adminBaseHTML);

  generateTableHTML(adminTripData);
  let search = $('#search')
  $(search).on("change keyup paste", function() {
      filter($(search).val(),adminTripData)
  })
  let clientTrips = $('.client-trips')
  $(clientTrips).on("click", function() {
    if($(event.target).is(":button")){
      updateUI(search,databaseController,$(event.target))
    }
  })
    updateTotalCost(adminTripData);
}

async function updateUI(search,databaseController,eventTarget){
  let updatedData = await databaseController.modifyTrip($(eventTarget).attr('id'));
  filter($(search).val(),updatedData)
}

//Guthry Tute
function filter(searchText,adminTripData) {
  let filteredData = adminTripData.filter(trip => {
    return (new RegExp(searchText,'i')).test(trip.clientName);
  })
  generateTableHTML(filteredData);
  updateTotalCost(filteredData);
}

function updateTotalCost(filteredData) {
  let total = filteredData.reduce((sum,trip) => {
    sum +=trip.adminFee;
    return sum;

  },0)
  $('#totalIncome').text(`$${total}`);
}

function generateTableHTML(adminTripData) {
  let rowsHTML = adminTripData.reduce((rowHTML, trip) => {
    let row = `
    <tr class = "flex-table row">
      <td class = "flex-row">${trip.clientName}</th>
      <td class = "flex-row" id="${trip.id}">#${trip.id}</th>
      <td class = "flex-row" id="destination">${trip.destination}</th>
      <td class = "flex-row" id="travelers-col">${trip.travelers}</th>
      <td class = "flex-row" id="date">${trip.date}</th>
      <td class = "flex-row" id="duration">${trip.duration}</th>
      <td class = "flex-row" id="status">${trip.status}</th>
      <td class = "flex-row" id="cost">${trip.adminFee}</th>
      <td class = "flex-row" id="approve"><button id = "approve-${trip.id}">Approve</button></th>
      <td class = "flex-row" id="delete-${trip.id}"><button id = "delete-${trip.id}">Deny</button></th>
    </tr>
    `;
    rowHTML = rowHTML.concat(" ", row);
    return rowHTML;
  }, "");
  let tableHTML = `
  <table data-toggle="table" id="table_data" class="table table-bordered table-hover">
  <thead class="theme-dark">
    <tr class = 'flex-table header'>
    <th class = "flex-row" id="userName">User</th>
    <th class = "flex-row" id="tripID">Trip#</th>
    <th class = "flex-row" id="destination">Desitination</th>
    <th class = "flex-row" id="travelers-head">Travelers</th>
    <th class = "flex-row" id="date">Date</th>
    <th class = "flex-row" id="duration">Duration(days)</th>
    <th class = "flex-row" id="status">Status</th>
    <th class = "flex-row" id="cost">Admin Fee</th>
    <th class = "flex-row" id="approve">Approve</th>
    <th class = "flex-row" id="deny">Deny</th>
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
