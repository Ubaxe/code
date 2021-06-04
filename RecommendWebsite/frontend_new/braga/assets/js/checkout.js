import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
const api  = new API();

// generate the order and show up product details
function viewcheckout() {
    let table = document.getElementsByClassName('orderTable')[0]
    api.GetCart().then(res => {
        let total = 0;
        // if it does not have this order
        // it will return to main page
        if (res.length == 0) {
            window.location = 'index.html';
        }
        for (let i = 0; i < res.length; i++) {
            let tbody = createElement('tbody','',{})
            let tr = createElement('tr','',{})
            let td_img = createElement('td','',{class:'cart_img'})
            let img = createElement('img','',{src:res[i].first_product_img_url})
            let td_name= createElement('td',res[i].name,{class:'product_name'})
            let td_price = createElement('td','$'+res[i].price,{class:'product-price'})
            let td_quantity = createElement('td','1',{class:'product_quantity'})
            total+=res[i].price
            let td_total_quantity = createElement('td','Total quantity: ' + res.length,{class:'product_quantity'})
            let td_tmp1 = createElement('td','',{class:'product-price'})
            let td_tmp2 = createElement('td','',{class:'product-price'})
            let tr_tmp = createElement('tr','',{})

            AppendAllChild(td_img,[img])
            AppendAllChild(tr,[td_img,td_name,td_quantity,td_price])
            // calcualte the total price
            if (i == res.length-1) {
                let td_total_price = createElement('td','Total cost: '+total,{class:'product-price'})
                AppendAllChild(tr_tmp,[td_tmp1,td_tmp2,td_total_quantity,td_total_price])
                AppendAllChild(tbody,[tr,tr_tmp])
                AppendAllChild(table,[tbody])
            } else {
                AppendAllChild(tbody,[tr,tr_tmp])
                AppendAllChild(table,[tbody])
            }
        }
    })
}

// Click checkout means the purcahse successfully regardless of paypal or normal payment
function checkout() {
    let checkout = document.getElementById('checkout')
    let paypal = document.getElementById('paypal_checkout')
    checkout.onclick = function () {
        api.Checkout();
        window.location = 'index.html';
    }
    paypal.onclick = function () {
        api.Checkout();
        window.location = 'index.html';
    }
}

viewcheckout()
checkout()
