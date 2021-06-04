import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
const api  = new API();

const loginPage = "/login.html";
const registerPage = "/register.html"

if (localStorage.getItem('token') != null) {
    window.location = "index.html";
}

// User Login
function UserLogin() {
    let LoginForm = document.getElementById('loginForm');
    const submit = document.getElementById("loginSubmit");
    submit.onclick = function() {
        var email = LoginForm.elements[0].value;
        var password = LoginForm.elements[1].value;
        if (email != "" && password != "") {
            api.LoginAuth(email,password)
        }
    }
}
// User Register 
function UserSignUp() {
    let RegistForm = document.getElementById('registForm');
    const submit = document.getElementById("registSubmit");
    submit.onclick = function() {
        var username = RegistForm.elements[0].value;
        var email = RegistForm.elements[1].value;
        var password = RegistForm.elements[2].value;
        if (username != "" && email != "" && password != "") {
            api.RegisterAuth(username,email,password)
        }
    }
}
if (window.location.pathname.includes(loginPage)) {
    UserLogin()
} else if (window.location.pathname.includes(registerPage)) {
    UserSignUp()
}