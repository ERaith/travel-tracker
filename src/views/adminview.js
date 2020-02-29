import $ from "jquery";
export function generateAdminView(domUpdates) {
  
  let loginHtml = `
    <div class="login-page">
      <h1>Welcome Admin!</h1>
    </div>
    `;
  $(domUpdates.body).append(loginHtml);
}
