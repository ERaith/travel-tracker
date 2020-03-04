import $ from "jquery";
export function generateAdminView(domUpdates, adminTripData,databaseController) {

  let adminBaseHTML = `
    <div class="admin-page">
    <article class="client-names">
        <input id="search" type="text" placeholder="Sort Users"/>
        <div class = "client-cards"

         </div>
    </article>
        <article class="admin-trips">

        <div class="table-container">
          <div class="table-responsive">
          </div>
          </div>
        </article>

    </div>

    </div>
    `;

  $(domUpdates.main).append(adminBaseHTML);

  generateTableHTML(adminTripData);
  generateUserCards(adminTripData);
  let search = $('#search')
  $(search).on("change keyup paste", function() {
      filter($(search).val(),adminTripData,domUpdates)
  })
  let clientTrips = $('.admin-trips')
  $(clientTrips).on("click", function() {
    if($(event.target).is(":button")){
      updateUI(search,databaseController,$(event.target),domUpdates)
    }
  })
    domUpdates.updateTotalCost(databaseController,adminTripData,'Income:');
}

async function updateUI(search,databaseController,eventTarget,domUpdates){
  let updatedData = await databaseController.modifyTrip($(eventTarget).attr('id'));
  filter($(search).val(),updatedData,domUpdates)
}

//Guthry Tute
function filter(searchText,adminTripData,domUpdates) {
  let filteredData = adminTripData.filter(trip => {
    return (new RegExp(searchText,'i')).test(trip.clientName);
  })
  generateUserCards(filteredData)
  generateTableHTML(filteredData);
}

function generateUserCards(adminTripData) {
  let usersSort = adminTripData.reduce((usersInfo,trip) =>{
    usersInfo[trip.clientName] = usersInfo[trip.clientName]||{totalTravelCost:0,totalAdminIncome:0};
    usersInfo[trip.clientName].totalTravelCost+=trip.cost;
    usersInfo[trip.clientName].totalAdminIncome+=trip.adminFee;
    return usersInfo;
  },{})

  let userKeys = Object.keys(usersSort);

  let usersCardHTML = userKeys.reduce((userCardHTML, userName) => {
    let userHTML = `
    <div class = "client">
    <h2>${userName}</h2>
    <h3>User Total Spent</h3><span>${usersSort[userName].totalTravelCost}</span>
    <h3>Total Generated Income:</h3><span>${usersSort[userName].totalAdminIncome}</span>
     </div>

    `;
    userCardHTML = userCardHTML.concat(" ", userHTML);
    return userCardHTML;
  }, "");

  $(".client-cards").empty();
  $(".client-cards").append(usersCardHTML);
}

function generateTableHTML(adminTripData) {
  let rowsHTML = adminTripData.reduce((rowHTML, trip) => {
    let row = `
    <tr class = "flex-table row">
      <td class = "flex-row"> ${trip.clientName}</td>
      <td class = "flex-row" id="${trip.id}">#${trip.id}</td>
      <td class = "flex-row" id="destination">${trip.destination}</td>
      <td class = "flex-row" id="travelers-col">${trip.travelers}</td>
      <td class = "flex-row" id="date">${trip.date}</td>
      <td class = "flex-row" id="duration">${trip.duration}</td>
      <td class = "flex-row" id="status">${trip.status}</td>
      <td class = "flex-row" id="cost">${trip.adminFee}</td>
      <td class = "flex-row" id="approve"><button id = "approve-${trip.id}">Approve</button></td>
      <td class = "flex-row" id="delete-${trip.id}"><button id = "delete-${trip.id}">Deny</button></td>
    </tr>
    `;
    rowHTML = rowHTML.concat(" ", row);
    return rowHTML;
  }, "");
  let tableHTML = `
  <table data-toggle="table" id="table_data" class="table table-bordered table-hover">
  <thead>
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
