import $ from "jquery";
export function generateLogin(domUpdates, databaseController, main) {

  let loginHtml = `
    <div class="login-page">
      <div class="form">
        <form class="login-form">
          <input id="userName" type="text" placeholder="username"/>
          <input id="password" type="password" placeholder="password"/>
          <button>login</button>
        </form>
      </div>
    </div>
    `;
  $(main).append(loginHtml);

  let loginButton = $("button");
  loginButton.click(function(event) {
    event.preventDefault();
    var name = $("#userName").val();
    var password = $("#password").val();

    // name = 'agency';
    // name = "Ham Leadbeater"
    // password = 'travel2020'

    let response = databaseController.login(name, password, domUpdates)
    console.log(response)
    if(response.failed){

      alert(response.message);
    }

    return false;
  });
  return loginButton;
}
