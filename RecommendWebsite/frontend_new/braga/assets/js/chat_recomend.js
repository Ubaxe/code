import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
import {ProductThumb,GenerateProductGrid,GenerateProductinList,ProductinFullWidth} from './global.js';
const api  = new API();

chatbot_recommendation()
function chatbot_recommendation() {
    let row_wrapper = document.getElementsByClassName('row shop_wrapper')
    api.ChatBotRecommendation().then(res => {
        if (res.length > 0) {
            let number = document.getElementsByClassName('page_amount')
            number[0].innerText = "Showing " + res.length +" results"
        }
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
    })
}
