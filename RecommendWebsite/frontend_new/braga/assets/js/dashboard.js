import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
import {find_category} from './global.js';
const api  = new API();

// if the admin token is empty
// it will return main page
if (localStorage.getItem('admin') == null) {
    window.location = "index.html";
}

// show product
function showAllproduct () {
    let table = document.getElementsByClassName('ViewAllProduct')[0]
    api.AdminGetProducts().then(res => {
        for (let i = 0; i < res.length; i++) {
            let tbody = createElement('tbody','',{})
            let tr = createElement('tr','',{})
            let td_img = createElement('td','',{class:'cart_img'})
            const primary_img = createElement('a',"",{class:"primary_img", href:"product-details.html?"+res[i].id,alt:name});
            const img1 = createElement('img',"",{src:res[i].first_product_img_url,alt:""});
            const td_categoty = createElement('td',find_category(res[i].category_id),{})
            const td_name = createElement('td',res[i].name,{})
            const td_price = createElement('td','$'+res[i].price,{})
            const td_stock = createElement('td',res[i].stock,{})
            const td_tag = createElement('td',res[i].tag,{})
            const td_action_tmp1 = createElement('td','',{})
            const edit = createElement('button','Edit',{class:"editAction",type:"button"})
            const td_action_tmp2 = createElement('td','',{})
            const dt = createElement('button','Delete',{class:"deleteAction",type:"button"})

            AppendAllChild(td_action_tmp1,[edit])
            AppendAllChild(td_action_tmp2,[dt])
            AppendAllChild(primary_img,[img1])
            AppendAllChild(td_img,[primary_img])
            AppendAllChild(tr,[td_img,td_categoty,td_name,td_price,td_stock,td_tag,td_action_tmp1,td_action_tmp2])
            AppendAllChild(tbody,[tr])
            AppendAllChild(table,[tbody])
        }

        for (let j = 0; j < res.length; j++) {
            let edits = document.getElementsByClassName('editAction')
            let edit = edits[j]
            edit.onclick = function () {
                let id = res[j].id
                showEditPage(id,res[j].name,res[j].detail,res[j].tag,res[j].category_id,
                    res[j].stock,res[j].price,res[j].first_product_img_url,
                    res[j].second_product_img_url)
            }
        }

        for (let j = 0; j < res.length; j++) {
            let deletes = document.getElementsByClassName('deleteAction')
            let d = deletes[j]
            d.onclick = function () {
                let id = res[j].id
                api.Delete(id)
                location.reload();
            }
        }
    })
}
// admin add product
function addProduct() {
    let submit = document.getElementById('submit')
    const getFiles = document.querySelectorAll('input[type="file"]');
    let base64_1 = '';
    let base64_2 = '';
    const reader = new FileReader()
    getFiles[0].addEventListener('change', event => {
        const file1 = event.target.files[0]
        reader.readAsDataURL(file1);
        reader.onload = function () {
            base64_1 = reader.result;
            document.getElementById("uploadPreview1").src = base64_1;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    })

    getFiles[1].addEventListener('change', event => {
        const file2 = event.target.files[0]
        reader.readAsDataURL(file2);
        reader.onload = function () {
            base64_2 = reader.result;
            document.getElementById("uploadPreview2").src = base64_2;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };

    })
    submit.onclick = function () {
        const name = document.getElementById('name').value
        const tags = document.getElementById('tags').value
        const detail = document.getElementById('description').value
        let category = document.getElementById('category').value
        const inventory = document.getElementById('stock').value
        const price = document.getElementById('price').value
        // the category mush have a id, otherwise the product can not add
        if (!isNaN(category)) {
            category = parseInt(category)
            api.AdminAddProduct(category,name,detail,price,inventory,tags,base64_1,base64_2).then(res => {
                window.location = "dashboard.html";
            })
        }
    }
}

// show all order
function showOrder() {
    let table = document.getElementsByClassName('table')[0]
    api.AdminGetOrder().then(res => {
        for (let i = 0; i< res.length; i++) {
            let tbody = createElement('tbody','',{style:'border: 1px solid black;'})
            let tr = createElement('tr','',{style:'border: 1px solid black;'})
            let td_name = createElement('td', res[i].name,{style:'border: 1px solid black;'})
            let td_order_id = createElement('td',res[i].cart_id,{style:'border: 1px solid black;'})
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
            let td_view_link = createElement('a','View',{href:"order.html?"+res[i].user_id+"_"+res[i].cart_id,class:"view"})
            AppendAllChild(td_view,[td_view_link])
            AppendAllChild(tr,[td_name,td_order_id,td_date,td_status,td_price,td_view])
            AppendAllChild(tbody,[tr])
            AppendAllChild(table,[tbody])
        }
    })
}
// show edit page
function showEditPage(p_id,p_name,p_ds,p_tgs,p_c,p_stock,p_price,p_im1,p_im2) {
    let viewPorduct = document.getElementById("viewproduct");
    viewPorduct.setAttribute("class", "tab-pane fade");
    let changeproduct = document.getElementById("changeproduct");
    changeproduct.setAttribute("class", "tab-pane fade active show");
    let name = document.getElementById('updateName')
    name.value = p_name
    let description = document.getElementById('updateDescription')
    description.value = p_ds
    let tags = document.getElementById('updateTags')
    tags.value = p_tgs.join(" ");
    let category = document.getElementById('updateCategory')
    category.value = p_c
    let stock = document.getElementById('updateStock')
    stock.value = p_stock
    let price = document.getElementById('updatePrice')
    price.value = p_price
    let preview1 = document.getElementById('changePreview1')
    preview1.src = p_im1
    let preview2 = document.getElementById('changePreview2')
    preview2.src = p_im2
    editProduct(p_id)
}
// edit Product
function editProduct(id) {
    let submit = document.getElementById('updateSubmit')
    const getFiles = document.querySelectorAll('input[type="file"]');
    let base64_1 = '';
    let base64_2 = '';
    const reader = new FileReader()
    getFiles[0].addEventListener('change', event => {
        const file1 = event.target.files[0]
        reader.readAsDataURL(file1);
        reader.onload = function () {
            base64_1 = reader.result;
            document.getElementById("changePreview1").src = base64_1;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    })
    getFiles[1].addEventListener('change', event => {
        const file2 = event.target.files[0]
        reader.readAsDataURL(file2);
        reader.onload = function () {
            base64_2 = reader.result;
            document.getElementById("changePreview2").src = base64_2;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    })
    if (base64_1 == "") {
        base64_1 = document.getElementById('changePreview1').src
    } 

    if (base64_2 == "") {
        base64_2 = document.getElementById('changePreview2').src
    } 
    submit.onclick = function () {
        const name = document.getElementById('updateName').value
        const tags = document.getElementById('updateTags').value
        const detail = document.getElementById('updateDescription').value
        let category = document.getElementById('updateCategory').value
        const inventory = document.getElementById('updateStock').value
        const price = document.getElementById('updatePrice').value
        // the category mush have a id, otherwise the product can not edit
        if (!isNaN(category)) {
            category = parseInt(category)
            api.AdminEditProduct(id,category,name,detail,price,inventory,tags,base64_1,base64_2)
        }
    }
}

// admin logout
function Logout() {
    const text = document.getElementById('logout');
    if (localStorage.getItem('admin') == null) {
        text.innerText = "Login"
        text.href = "admin.html";
    } else {
        let tk = localStorage.getItem('admin')
        text.onclick = function () {
            api.AdminLogout(tk);
            localStorage.removeItem('admin')
            text.href = "index.html";
        }
    }
}

Logout()
showAllproduct()
showOrder()
addProduct()