import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
import {Cart} from './cart.js'
const api  = new API();

if (localStorage.getItem('token') == null) {
    window.location = "index.html";
}
// change the button for logout or login
function changeLogout() {
    const text = document.getElementById('logout');
    if (localStorage.getItem('token') == null) {
        text.innerText = "Login"
        text.href = "login.html";
    } else {
        let tk = localStorage.getItem('token')
        text.onclick = function () {
            api.Logout(tk);
            localStorage.removeItem('token')
            text.href = "index.html";
        }
    }
}
// show up password
$(document).ready(function() {
    $('.pass_show').append('<span class="ptxt">Show</span>');  
    
});
$(document).on('click','.pass_show .ptxt', function() { 
    $(this).text($(this).text() == "Show" ? "Hide" : "Show"); 
    $(this).prev().attr('type', function(index, attr){return attr == 'password' ? 'text' : 'password'; }); 
});  
/// user change name
function changeName() {
    let form = document.getElementById('Namechange')
    let button = form.elements[2]
    let input1 = form.getElementsByTagName('input')[0]
    let input2 = form.getElementsByTagName('input')[1]
    $(document).ready(function(){
        // it will check the new name input whether is empty
        $("#newName").blur(function(){
            if (input1.value=="") {
                form.previousElementSibling.style = "display:normal"
                form.previousElementSibling.innerText = "The new name cannot be empty"   
            } else {
                form.previousElementSibling.style = "display:none"
            }
        });
        // it will check the confirm name input whether is empty
        $("#confirmName").blur(function(){
            if (input2.value=="") {
                form.previousElementSibling.style = "display:normal"
                form.previousElementSibling.innerText = "The confirm name cannot be empty"
            } else {
                form.previousElementSibling.style = "display:none"
            }
        });
      });
    button.onclick = function () {
        let newName = input1.value
        let confirmName = input2.value
        if (newName != "" && confirmName != "") {
            if (newName != confirmName) {
                form.previousElementSibling.style = "display:normal"
            } else {
                api.ChangeName(confirmName).then(res => {
                    if (res.length > 0) {
                        // if change name successfully, it will show the reminder
                        form.previousElementSibling.classList.value = "alert alert-success"
                        form.previousElementSibling.style = "display:normal"
                        form.previousElementSibling.innerText = "Change Name Successfully"
                    }
                })
            }
        }
    }
}
// user change password
function changePassword() {
    let form = document.getElementById('Pchange')
    let button = form.elements[3]
    let input1 = form.getElementsByTagName('input')[0]
    let input2 = form.getElementsByTagName('input')[1]
    let input3 = form.getElementsByTagName('input')[2]
    $(document).ready(function() {
        // it will check the current password input whether is empty
        $("#currentP").blur(function() {
            if (input1.value=="") {
                form.previousElementSibling.style = "display:normal"
                form.previousElementSibling.innerText = "The current password cannot be empty"   
            } else {
                form.previousElementSibling.style = "display:none"
            }
        });
        // it will check the new password input whether is empty
        $("#newP").blur(function() {
            if (input2.value=="") {
                form.previousElementSibling.style = "display:normal"
                form.previousElementSibling.innerText = "The new password cannot be empty"
            } else {
                form.previousElementSibling.style = "display:none"
            }
        });
        // it will check the confirm password input whether is empty
        $("#confirmP").blur(function() {
            if (input3.value=="") {
                form.previousElementSibling.style = "display:normal"
                form.previousElementSibling.innerText = "The confirm password cannot be empty"
            } else {
                form.previousElementSibling.style = "display:none"
            }
        });
    });
    button.onclick = function () {
        let currentP = input1.value
        let newP = input2.value
        let confirmP = input3.value
        if (newP != "" && confirmP != "") {
            if (newP != confirmP) {
                form.previousElementSibling.style = "display:normal"
            } else {
                api.ChangePassword(currentP,confirmP)
                localStorage.removeItem('token')
                window.location = "index.html";
            }
        }
    }
}
// show orders for user
function showOrders() {
    let table = document.getElementsByClassName('table')[0]
    api.UserGetOrders().then(res => {
        for (let i = 0; i< res.length; i++) {
            let tbody = createElement('tbody','',{style:'border: 1px solid black;'})
            let tr = createElement('tr','',{style:'border: 1px solid black;'})
            let td_id = createElement('td', parseInt(res[i].cart_id) + 1,{style:'border: 1px solid black;'})
            let td_date = createElement('td',res[i].time,{style:'border: 1px solid black;'})
            let td_status = createElement('td','Completed',{style:'border: 1px solid black;'})
            let item = ""
            if (res[i].item_number > 1) {
                item = ' items'
            } else {
                item = ' item'
            }
            let td_price = createElement('td','$'+res[i].cost + ' for ' + res[i].item_number + item,{style:'border: 1px solid black;'})
            let td_view = createElement('td','',{style:'border: 1px solid black;'})
            let td_view_link = createElement('a','View',{href:"order.html?"+res[i].cart_id,class:"view"})
            AppendAllChild(td_view,[td_view_link])
            AppendAllChild(tr,[td_id,td_date,td_status,td_price,td_view])
            AppendAllChild(tbody,[tr])
            AppendAllChild(table,[tbody])
        }
    })
}
showOrders() 
changePassword()
changeName()
changeLogout()
