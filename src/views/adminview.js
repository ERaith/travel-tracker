import $ from "jquery";
export function generateAdminView(domUpdates, adminTripData,databaseController) {

  let adminBaseHTML = `
    <div class="login-page">
      <h1>Welcome Admin!</h1>
      <section class="client-data">
        <article class="client-trips">
        <input id="search" type="text" placeholder="Search"/>
          <div class="table-wrap">
            <div class="table-responsive">
            </div>
          </div>
          </div>
        </article>
      </section>
    </div>
    `;

  $(domUpdates.body).append(adminBaseHTML);

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
}

function generateTableHTML(adminTripData) {
  let rowsHTML = adminTripData.reduce((rowHTML, trip) => {
    let row = `
    <tr>
      <th>${trip.clientName}</th>
      <th id="${trip.id}">#${trip.id}</th>
      <th id="destination">${trip.destination}</th>
      <th id="travelers-col">${trip.travelers}</th>
      <th id="date">${trip.date}</th>
      <th id="duration">${trip.duration}</th>
      <th id="status">${trip.status}</th>
      <th id="cost">${trip.cost}</th>
      <th id="approve"><button id = "approve-${trip.id}">Approve</button></th>
      <th id="delete-${trip.id}"><button id = "delete-${trip.id}">Deny</button></th>
    </tr>
    `;
    rowHTML = rowHTML.concat(" ", row);
    return rowHTML;
  }, "");
  let tableHTML = `
  <table data-toggle="table" id="table_data" class="table table-bordered table-hover">
  <thead class="theme-dark">
    <tr class = 'header'>
    <th id="userName">User</th>
    <th id="tripID">Trip#</th>
    <th id="destination">Desitination</th>
    <th id="travelers-head">Travelers</th>
    <th id="date">Date</th>
    <th id="duration">Duration(days)</th>
    <th id="status">Status</th>
    <th id="cost">Cost</th>
    <th id="approve">Approve</th>
    <th id="deny">Deny</th>
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
