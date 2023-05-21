import { authEndpoint, baseUrl } from "./constants.js";

export async function signIn(username, password) {

    const response = await fetch(baseUrl + authEndpoint, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if (response.ok) {
        const authData = await response.json();
        setAuth(authData);
        return true;
    }
    else {
        return false;
    }

}

export function signOut() {
    localStorage.removeItem("auth");
}

export function setAuth(auth) {
    localStorage.setItem("auth", JSON.stringify({
        token: auth.token,
        name: auth.user_display_name
    }));
}

export function getAuth() {
    const auth = localStorage.getItem("auth");

    if (auth) {
        return JSON.parse(auth);
    }

    return null;
}

export function isLoggedIn() {
    if (localStorage.getItem("auth"))
        return true;

    return false;
}