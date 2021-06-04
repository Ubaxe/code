import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
const api  = new API();

let cart_id = window.location.search.replace('?','')
// show up order
// there are two types for user and admin to view order
function Orderdetail() {
    let table = document.getElementsByClassName('orderTable')[0]
    // this is for user to view order
    if (!cart_id.includes("_")) {
        api.UserGetOrders().then(res => {
            const product = res[cart_id].product
            for (let i = 0; i < product.length; i++) {
                let tbody = createElement('tbody','',{})
                let tr = createElement('tr','',{})
                let td_img = createElement('td','',{class:'cart_img'})
                let img = createElement('img','',{src:product[i].first_product_img_url})
                let td_name= createElement('td',product[i].name,{class:'product_name'})
                let td_price = createElement('td','$'+product[i].price,{class:'product-price'})
                let td_quantity = createElement('td','1',{class:'product_quantity'})
                let td_total_price = createElement('td','Total cost: '+res[0].cost,{class:'product-price'})
                let td_total_quantity = createElement('td','Total quantity: '+product.length,{class:'product_quantity'})
                let td_tmp1 = createElement('td','',{class:'product-price'})
                let td_tmp2 = createElement('td','',{class:'product-price'})
                let tr_tmp = createElement('tr','',{})

                AppendAllChild(td_img,[img])
                AppendAllChild(tr,[td_img,td_name,td_quantity,td_price])
                if (i == product.length-1) {
                    AppendAllChild(tr_tmp,[td_tmp1,td_tmp2,td_total_quantity,td_total_price])
                    AppendAllChild(tbody,[tr,tr_tmp])
                    AppendAllChild(table,[tbody])
                } else {
                    AppendAllChild(tbody,[tr,tr_tmp])
                    AppendAllChild(table,[tbody])
                }
            }
        })
    // this is for admin view order
    } else {
        api.AdminViewOrder(cart_id).then(res => {
            const product = res.product
            for (let i = 0; i < product.length; i++) {
                let tbody = createElement('tbody','',{})
                let tr = createElement('tr','',{})
                let td_img = createElement('td','',{class:'cart_img'})
                let img = createElement('img','',{src:product[i].first_product_img_url})
                let td_name= createElement('td',product[i].name,{class:'product_name'})
                let td_price = createElement('td','$'+product[i].price,{class:'product-price'})
                let td_quantity = createElement('td','1',{class:'product_quantity'})
                let td_total_price = createElement('td','Total cost: '+res.cost,{class:'product-price'})
                let td_total_quantity = createElement('td','Total quantity: '+product.length,{class:'product_quantity'})
                let td_tmp1 = createElement('td','',{class:'product-price'})
                let td_tmp2 = createElement('td','',{class:'product-price'})
                let tr_tmp = createElement('tr','',{})
                AppendAllChild(td_img,[img])
                AppendAllChild(tr,[td_img,td_name,td_quantity,td_price])
                if (i == product.length-1) {
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
}
Orderdetail()