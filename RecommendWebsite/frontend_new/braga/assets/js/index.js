import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
import {Cart} from './cart.js';
import {ProductThumb,GenerateProductGrid} from './global.js';
const api  = new API();

CountNuminCategory();
showRecommendation();

if (localStorage.getItem('token') != null) {
    document.getElementById('LoginButton').style = "display:none";
}
// count the number of product in category
function CountNuminCategory() {
    let electronic = document.getElementById("electronic").getElementsByClassName('num_product_c')
    let book = document.getElementById("book").getElementsByClassName('num_product_c')
    let sport = document.getElementById("sport").getElementsByClassName('num_product_c')
    let clothes = document.getElementById("clothes").getElementsByClassName('num_product_c')
    let home = document.getElementById("home").getElementsByClassName('num_product_c')
    let toy = document.getElementById("toy").getElementsByClassName('num_product_c')
    const c = ['electronic', 'book', 'sport', 'clothes', 'home', 'toy'];
    const v = [electronic, book, sport, clothes, home, toy];
    for (let x = 0; x < c.length; x++) {
        api.GetNumbyCategory(c[x]).then(res => {
            if (res <= 1) {
                v[x][0].innerText = res + " Product"
            } else {
                v[x][0].innerText = res + " Products"
            }
        })
    }
}
// show recommendation
function showRecommendation() {
    const l = document.getElementsByClassName('product_carousel product_column5 owl-carousel owl-loaded owl-drag')
    const product_itemList = l[0].children[0].children[0].childNodes
    let n = product_itemList.length;
    api.GetRecommendation(n * 2).then(res => {
        for (let i = 0; i < product_itemList.length;i++) {
            let a = product_itemList[i]
            let thumb1 = ProductThumb(res[i].id,res[i].name,res[i].first_product_img_url,res[i].second_product_img_url)
            let grid1 = GenerateProductGrid(res[i].id,res[i].name,res[i].price);
            const productblock1 = createElement('article',"",{class:"single_product",id:res[i].id});
            AppendAllChild(productblock1,[thumb1,grid1])
            AppendAllChild(a.lastChild.childNodes[1],[productblock1])
            let cart_add = document.getElementsByClassName('add_cart_button')
            let add = cart_add[i]
            add.onclick = function() {
                let add_id = add.parentElement.parentElement.parentElement.id
                api.AddCart(add_id);
                location.reload();
            }
        }
    })
}