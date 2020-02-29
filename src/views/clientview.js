import $ from "jquery";
export function generateClientView(domUpdates) {
  
  let loginHtml = `
    <div class="login-page">
      <h1>Welcome Client!</h1>
    </div>
    `;
  $(domUpdates.body).append(loginHtml);
}
