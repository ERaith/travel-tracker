import $ from "jquery";
export function generateClientView(domUpdates) {
  
  let loginHtml = `
    <div class="login-page">
      <h1>Welcome Traveler!</h1>
    </div>
    `;
  $(domUpdates.body).append(loginHtml);
  doSomething();
}

function doSomething() {
  console.log('Can access within same file')
}
