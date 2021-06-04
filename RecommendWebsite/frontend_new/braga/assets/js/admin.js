import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
const api  = new API();

const loginAdminPage = "/admin.html";


if (window.location.pathname.includes(loginAdminPage)) {
    Login()
} 

if (localStorage.getItem('admin') != null) {
    window.location = "dashboard.html";
}

// Admin Login
function Login() {
    let LoginForm = document.getElementById('loginForm');
    const submit = document.getElementById("loginSubmit");
    submit.onclick = function() {
        var email = LoginForm.elements[0].value;
        var password = LoginForm.elements[1].value;
        if (email != "" && password != "") {
            api.LoginAdmin(email,password)
        }
    }
}