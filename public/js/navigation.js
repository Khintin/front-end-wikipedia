import { isLoggedIn } from "./api/auth.js";

const navList = document.querySelector("header ul");
const btnLogin = document.querySelector("#login-button");
const isUserLoggedIn = isLoggedIn();

export function initNavigation() {
    if (isUserLoggedIn) {
        btnLogin.href += "?action=logout";
        btnLogin.innerText = "LOG OUT";

        navList.innerHTML += `<li class="font-medium text-gray-600 hover:bg-green-500 p-1 mr-2">
                            <a href="./edit.html?action=new">
                                <span>CREATE</span>
                            </a>
                        </li>`;
    }
}