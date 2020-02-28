import $ from "jquery";
export function generateLogin(user,body) {
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

  $(body).append(loginHtml);

  let loginButton = $("button");

  loginButton.click(function(event) {
    event.preventDefault();
    var name = $("#userName").val();
    var password = $("#password").val();
    user.updateName(name);
    console.log(user.login(password));
    return false;
  });
}
