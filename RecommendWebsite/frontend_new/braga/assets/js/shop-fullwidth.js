import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
import {Cart} from './cart.js'
import {ProductinFullWidth} from './global.js';
const api  = new API();

// show up product by category
function showProduct(category) {
    let category_title = document.getElementsByClassName("category_title");
    let page_amount = document.getElementsByClassName("page_amount");
    for (let i = 0; i < category_title.length; i++) {
        category_title[i].innerText = category.charAt(0).toUpperCase() + category.slice(1);
    }
    let row_wrapper = document.getElementsByClassName('row shop_wrapper')
    api.GetProductbyCategory(category).then(res => {
        for (let i = 0; i < res.length; i++) {
            let col = createElement('div',"",{class:'col-lg-3 col-md-4 col-sm-6 col-12'})
            let productblock = ProductinFullWidth(res[i].id,res[i].name,res[i].price,res[i].detail,res[i].first_product_img_url,res[i].second_product_img_url)
            col.appendChild(productblock)
            row_wrapper[0].appendChild(col)
        }

        for (let j = 0; j < (res.length)*2; j++) {
            let cart_add = document.getElementsByClassName('add_cart_button')
            let add = cart_add[j]
            add.onclick = function() {
                let add_id = add.parentElement.parentElement.parentElement.id
                api.AddCart(add_id);
                location.reload();
            }
        }
        let num_product = document.getElementsByClassName('single_product');
        page_amount[0].innerText = "Showing 1–12 of "+num_product.length + " results";
    })
}

const category = window.location.search.substring(1);
if (category == "electronic") {
    showProduct(category)
} else if (category == "book") {
    showProduct(category)
} else if (category == "sport") {
    showProduct(category)
} else if (category == "clothes") {
    showProduct(category)
} else if (category == "home") {
    showProduct(category)
} else if (category == "toy") {
    showProduct(category)
} else if (category == "all") {
    showProduct(category)
} else if (category == "sales") {
}else {
    window.location = "404.html";
}
