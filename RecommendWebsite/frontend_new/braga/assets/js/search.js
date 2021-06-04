import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
import {ProductinFullWidth} from './global.js';
const api  = new API();

const searchform = document.getElementById('search')
let button = searchform.elements[2]
let link = ""
button.onclick = function () {
    let price = searchform[0].value
    let word = searchform[1].value
    let s = price.match(/\d+/g)
    let min_price = s[0]
    let max_price = s[1]
    link = "search.html?search_word="+word+"&min_price="+min_price+"&max_price="+max_price
    window.location = link;
}

// search keyword and return result
function searchResult() {
    let search = window.location.search
    search = unescape(search)
    //let arguArray = search.match(/=+\w*/g)
    let arguArray = search.match(/=*\w*/g)
    for (let i = 0; i < arguArray.length; i++) {
        arguArray[i] = arguArray[i].replace('=',"")
    }
    const filter = arguArray.filter(word => word != "")
    const index = filter.indexOf('min_price')
    const price_array = filter.slice(index,filter.length)
    let keywords_array = filter.slice(0,index)
    keywords_array = keywords_array.filter(word=> word != "search_word")
    const string = keywords_array.join(" ")
    let keywords = string
    let min_price = parseInt(price_array[1])
    let max_price = parseInt(price_array[3])
    let row_wrapper = document.getElementsByClassName('row shop_wrapper')
    if (min_price != NaN && max_price != NaN) {
        api.Search(keywords,min_price,max_price).then(res => {
            if (res.length > 0) {
                let s = document.getElementById('seachResult')
                s.innerText = ""
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
}
if (window.location.search != "" && window.location.pathname.includes('search.html') == true) {
    searchResult()
}

