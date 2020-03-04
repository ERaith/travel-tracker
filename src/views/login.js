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
    // Load Default user
    // name = 'agency';
    name = "Ham Leadbeater"
    password = 'travel2020'

    databaseController.login(name, password, domUpdates);
    return false;
  });
  return loginButton;
}