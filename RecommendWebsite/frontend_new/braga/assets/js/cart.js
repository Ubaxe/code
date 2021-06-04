import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
const api  = new API();

// Gnerate a cart html collection into cart list
export function GenerateCartBlock(id,name,price,img) {
    const cart_item = createElement('div',"",{class:"cart_item",id:id});
    const cart_img = createElement('div',"",{class:"cart_img"});
    const p_img = createElement('img',"",{src:img,alt:name});
    const cart_info = createElement('div',"",{class:"cart_info"});
    const p_name = createElement('a',name,{href:'product-details.html?'+id});
    const p_quantity = createElement('p',"1 x ",{});
    const p_price = createElement('span',"$" +  price,{});
    AppendAllChild(p_quantity,[p_price])
    const cart_remove = createElement('div',"",{class:"cart_remove"});
    const cart_remove_a = createElement('a',"");
    const cart_remove_icon = createElement('i',"",{class:"ion-ios-close-outline"});
    AppendAllChild(p_quantity,[p_price])
    AppendAllChild(cart_img,[p_img])
    AppendAllChild(cart_info,[p_name,p_quantity])
    AppendAllChild(cart_remove_a,[cart_remove_icon])
    AppendAllChild(cart_remove,[cart_remove_a])
    AppendAllChild(cart_item,[cart_img,cart_info,cart_remove])
    return cart_item
}

// add item into cart
export function Cart() {
    api.GetCart().then(res => {
        if(res == undefined) {
            // if user does not login, the cart is empty and display login string to force user to login
            const cart_parentNode = document.getElementsByClassName('mini_cart')[0]    
            const cart_page = document.getElementsByClassName('cart_page')[0]
            cart_parentNode.removeChild(cart_page);
            const login_text = createElement('div',"",{class:'cart_login'})
            const login_h2 = createElement('h2',"",{})
            const login_link = createElement('a',"Login",{class:'cart_login',style:'display:flex;justify-content:center;margin-top:300px;',href:"login.html"})
            AppendAllChild(login_h2,[login_link])
            AppendAllChild(login_text,[login_h2])
            AppendAllChild(cart_parentNode,[login_text])
        } else if (typeof(res) == 'object') {
            // if user has loggined, the cart will show checkout. 
            // if user add product into cart, the cart will show up the product in cart.
            let count = document.getElementsByClassName('item_count')[0]
            let cart_page = document.getElementsByClassName('cart_page')[0]
            count.innerText = res.length
            let total = 0;
            for (let i = 0; i < res.length; i++) {
                let p = res[i]
                total+=p.price
                let block = GenerateCartBlock(p.id,p.name,p.price,p.first_product_img_url);
                cart_page.appendChild(block)
                let cart_removes = document.getElementsByClassName('ion-ios-close-outline')
                let remove = cart_removes[i]
                remove.onclick = function () {
                    let remove_id = remove.parentElement.parentElement.parentElement.id
                    api.RemoveCart(remove_id);
                    location.reload();
                }
            }
            let checkout = document.getElementById('checkout')
            // if the checkout button has been clicked, the link is cart.htl
            if (res.length > 0) {
                checkout.href = 'cart.html'
            }
            let cart_total_price = document.getElementsByClassName('cart_total mt-10')[0]
            let price = cart_total_price.getElementsByClassName('price')[0]
            price.innerText = '$' + total
            let item_total = document.getElementsByClassName('cart_total')[0]
            let quantity = item_total.getElementsByClassName('quantity')[0]
            quantity.innerText = res.length
            quantity.style = "font-weight: bold;"
        }
    })
}

Cart()

