import { signIn, signOut } from "./api/auth.js";

const params = new URLSearchParams(document.location.search);
const action = params.get("action");

const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const btnLogin = document.querySelector("#btn-login");

if (action && action == "logout") {
    signOut();
}

btnLogin.addEventListener("click", (event) => {
    event.preventDefault();

    const username = inputUsername.value;
    const password = inputPassword.value;

    if (!username || username.length < 5 || !password || password.length < 6) {
        // Display some error message
        return;
    }

    signIn(username, password).then((success) => {
        if (success) {
            window.location.href = "./index.html";
        }
    })
});