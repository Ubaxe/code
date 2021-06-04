import API from './api.js';
import {createElement ,AppendChildById,AppendAllChild} from './helpers.js';

const api  = new API();

/**
 * show user login page
**/

export function LoginPage() {
    const LoginForm = createElement('form',"",{id:"LoginForm",class:"LoginForm"});
    const LoginPart = createElement('div',"",{class:"LoginPart"});
    const group1 = createElement('label',"",{class:"form-group",for:"username"})
    const group2 = createElement('label',"",{class:"form-group",for:"password"})
    const nameInput = createElement('input',"",{type:'text',id:"username",placeholder:"Username"});
    const passInput = createElement('input',"",{type:'password',id:"password",placeholder:"Password"});
    const submit = createElement('button',"Submit",{id:"LoginSubmit",type:"button"});
    const SignUpBlock = createElement('div',"",{class:"SignUpBlock"});
    const text = createElement('p',"Don't have an account?");
    const title = createElement('h1',"Login to continue",{class:"Section-title"});
    const a = createElement('a');
    // decoration placeholder
    decorPlaceholder(nameInput,nameInput.placeholder);
    decorPlaceholder(passInput,passInput.placeholder);
    const SignUp = createElement('span'," Sign Up");
    a.appendChild(SignUp);
    text.appendChild(a);
    SignUpBlock.appendChild(text);
    AppendAllChild(group1,[nameInput]);
    AppendAllChild(group2,[passInput]);
    var childArray = [title,group1,group2,submit,SignUpBlock];
    AppendAllChild(LoginForm,childArray);
    LoginPart.appendChild(LoginForm);
    var backImg = createElement('img',"",{src:"./Asset/loginPage.jpg",class:"backImg"})
    AppendChildById("main",LoginPart);
    AppendChildById("main",backImg);
    // sign up link
    a.onclick = function() {
        var partent = document.getElementById("main");
        var Login = document.getElementsByClassName("LoginPart");
        partent.removeChild(Login[0])
        RegistrationPage();
    }
    // Login checking
    UserLogin();
}

/**
 * deal with login name and password
 * send login name and password to backend
**/

function UserLogin() {
    let LoginForm = document.getElementById('LoginForm');
    const submit = document.getElementById("LoginSubmit");
    submit.onclick = function() {
        var username = LoginForm.elements[0].value;
        var password = LoginForm.elements[1].value;
        LoginAuth(LoginForm,username,password)
    }
}

function LoginAuth(LoginForm,username,password) {
    let requestURL = api.makeAPIRequest("auth/login");
    const auth = fetch(requestURL, {
        method: 'POST',
        body: JSON.stringify({
            username : username,
            password : password
        }),headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status == 200) {
            if (LoginForm.childNodes[0].className == "errorBox") {
                LoginForm.removeChild(LoginForm.childNodes[0]);
            }
            response.json().then(res => {
                const token = res['token'];
                storeTokenUserName(username,token);
                window.location = "/index.html";
            })
            const parent = document.getElementById("main");
            parent.removeChild(parent.childNodes[3]);
            return Promise.resolve(response);
        } else if (response.status == 400) {
            ErrorBox(LoginForm,"Missing Username/Password");
        } else if (response.status == 403) {
            ErrorBox(LoginForm,"Invalid Username/Password");
        }
    });
    return auth
}


/**
 * Given a form and error message, shows specific error box
 * Show many types of errors and allow user remove it
 * @param   {object}        form 
 * @param   {String}        mesg 
 */

function ErrorBox(form,mesg) {
    if (form.childNodes[0].className === "errorBox") {
        var t = document.getElementsByClassName("errorText");
        t[0].textContent = mesg;
    } else {
        var block = createElement('div',"",{class:"errorBox"});
        var error = createElement('span',mesg,{class:"errorText"});
        var removeIcon = createElement('a',"x",{class:"removeError"});
        block.appendChild(error);
        block.appendChild(removeIcon);
        form.insertBefore(block, form.firstChild);
    }
    const remove = document.getElementsByClassName('removeError');
    remove[0].onclick = function () {
        if (form.childNodes[0].className == "errorBox") {
            form.removeChild(form.childNodes[0]);
        }
    }
}

/**
 * user registration 
**/

function RegistrationPage() {
    const RegistForm = createElement('form',"",{id:"RegistForm",class:"RegistForm"});
    const RegistPart = createElement('div',"",{class:"RegistPart"});
    const userNameInput= createElement('input',"",{type:"text",class:"username",placeholder:"Username"});
    const passInput = createElement('input',"",{type:"password",class:"password",placeholder:"Password"});
    const confirmPassword = createElement('input',"",{type:"password",class:"confirmPassword",placeholder:"Confirmpassword"});
    const emailInput = createElement('input',"",{type:"email",class:"emailValue",placeholder:"Email"});
    const nameInput = createElement('input',"",{type:"text",class:"name",placeholder:"Name"});
    const submit = createElement('button',"Submit",{id:"RegistSubmit",type:"button"});
    const title = createElement('h1',"Create account",{class:"Section-title"});
    const LoginBlock = createElement('div',"",{class:"LoginBlock"});
    const text = createElement('p',"Have an account? ");
    const a = createElement('a');
    // decoration placeholder
    decorPlaceholder(userNameInput,userNameInput.placeholder);
    decorPlaceholder(passInput,passInput.placeholder);
    decorPlaceholder(confirmPassword,confirmPassword.placeholder);
    decorPlaceholder(emailInput,emailInput.placeholder);
    decorPlaceholder(nameInput,nameInput.placeholder);
    a.onclick = function() {
        const parent = document.getElementById("main");
        var Regist = document.getElementsByClassName("RegistPart");
        parent.removeChild(Regist[0]);
        LoginPage();
    }
    const HaveAccount = createElement('span',"Log in");
    a.appendChild(HaveAccount);
    text.appendChild(a);
    LoginBlock.appendChild(text);
    var childArray = [title,userNameInput,passInput,confirmPassword
        ,emailInput,nameInput,submit,LoginBlock];
    AppendAllChild(RegistForm,childArray);
    RegistPart.appendChild(RegistForm);
    AppendChildById("main",RegistPart);
    UserSignUp();
} 

/**
 * deal with sign up information
 * send sign up information to backend
**/

function UserSignUp() {
    let RegistForm = document.getElementById('RegistForm');
    const submit = document.getElementById("RegistSubmit");
    submit.onclick = function() {
        var match = (RegistForm.elements[1].value === RegistForm.elements[2].value 
            && RegistForm.elements[2].value.length > 0) ? true : false;
        if (checkForm(RegistForm)) {
            ErrorBox(RegistForm,"Input can't be empty");
        } else if (match) {
            var username = RegistForm.elements[0].value;
            var password = RegistForm.elements[1].value;
            var emailValue = RegistForm.elements[3].value;
            var name = RegistForm.elements[4].value;
            let requestURL = api.makeAPIRequest("auth/signup");
            fetch(requestURL, {
                method: 'POST',
                body: JSON.stringify({
                    username : username,
                    password :password,
                    email: emailValue,
                    name: name,
                }),headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status == 200) {
                    if (RegistForm.childNodes[0].className == "errorBox") {
                        RegistForm.removeChild(RegistForm.childNodes[0]);
                    }
                    response.json().then(res => {
                        const token = res['token'];
                        storeTokenUserName(username,token);
                        window.location = "/index.html";
                    })
                    const parent = document.getElementById("main");
                    parent.removeChild(parent.childNodes[3]);
                } else if (response.status == 400) {
                    ErrorBox(RegistForm,"Missing Username/Password");
                } else if (response.status == 409) {
                    ErrorBox(RegistForm,"Username Taken");
                }
            });
        } else {
            ErrorBox(RegistForm,"Password does't match");
        }
    }
}

/**
 * Given a form, check the form's value whether is empty
 * @param   {object}        Form 
 * @return {Boolean}
 */

function checkForm (Form) {
    var len = Form.elements.length - 1;
    for (let i = 0; i < len; i++) {
        if (Form.elements[i].value.length === 0) {
            return true;
        }
    }
    return false;
}

/**
 * Given a form, check the form's value whether is empty
 * @param   {HTMLElement}        Input 
 * @param {String}             text
 */

function decorPlaceholder(Input,text) {
    Input.onfocus = function (){
        Input.placeholder = ""
    }
    Input.onblur = function () {
        Input.placeholder = text
    }
}

/**
 * Store the username and token in locaStorage
 * @param   {String}        username 
 * @param {String}             token
 */
function storeTokenUserName(username,token) {
    localStorage.setItem('username',username);
    localStorage.setItem('token',token);
}
