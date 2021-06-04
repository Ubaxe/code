import API from './api.js';
import {createElement, AppendAllChild} from './api.js';
import {ProductThumb,GenerateProductGrid} from './global.js';
import {find_category} from './global.js';
const api  = new API();

// generate product block by input value
function GenerateProductDetail(id,c_id,name,price,desc,img){
    const category = find_category(c_id);
    const breadcrumb_title = document.getElementsByClassName('breadcrumb_content')[0].querySelectorAll('li')
    const category_link = createElement('a',category,{href:"shop-fullwidth.html?" + category.toLowerCase()})
    breadcrumb_title[1].innerText = ""
    breadcrumb_title[1].appendChild(category_link)
    breadcrumb_title[2].innerText = name
    const col = createElement('div',"",{class:"col-lg-5 col-md-5"})
    const product_details_tab = createElement('div',"",{class:"product-details-tab"})
    const zoomWrapper_single_zoom = createElement('div',"",{class:"zoomWrapper single-zoom",id:"img-1"})
    const zoom1 = createElement('img',"",{src:img,alt:name});
    AppendAllChild(zoomWrapper_single_zoom,[zoom1])
    AppendAllChild(product_details_tab,[zoomWrapper_single_zoom])
    AppendAllChild(col,[product_details_tab])
    const col_lg_7_col_md_7 = createElement('div',"",{class:"col-lg-7 col-md-7"})
    const product_d_right = createElement('div',"",{class:"product_d_right"})
    const productd_title_nav = createElement('div',"",{class:"productd_title_nav"})
    const h1 = createElement('h1',name)
    AppendAllChild(productd_title_nav,[h1])
    const price_box = createElement('div',"",{class:"price_box"})
    const current_price = createElement('span',"$"+price,{class:"current_price"})
    const product_variant_quantity = createElement('div',"",{class:"product_variant quantity"})
    const addCartbutton = createElement('button',"add to cart",{class:"button",id:"addcart"})
    AppendAllChild(product_variant_quantity,[addCartbutton])
    const product_desc = createElement('div',"",{class:"product_desc"});
    const product_desc_text = createElement('p',desc,{});
    AppendAllChild(product_desc,[product_desc_text])
    AppendAllChild(price_box,[current_price])
    AppendAllChild(product_desc,[product_desc_text])
    AppendAllChild(product_d_right,[productd_title_nav,price_box,product_desc,product_variant_quantity])
    AppendAllChild(col_lg_7_col_md_7,[product_d_right])
    const row = createElement('div',"",{class:"row"})
    const container = createElement('div',"",{class:"container",id:id})
    AppendAllChild(row,[col,col_lg_7_col_md_7])
    AppendAllChild(container,[row])
    return container
}

const p_id = window.location.search.substring(1);
// generate data of product with html collection
function showProductDetail(p_id) {
    api.GetOneProduct(p_id).then(res => {
        let t = document.getElementsByClassName('product_details mb-80')[0]
        console.log(res);
        let row = GenerateProductDetail(res.id,res.category_id,res.name,res.price,res.detail,res.first_product_img_url)
        AppendAllChild(t,[row])
        addCartfunc(p_id)
    })
}
// For Cart 
function addCartfunc(id) {
    const add = document.getElementById('addcart');
    add.onclick = function() {
        api.AddCart(id);
        location.reload();
    }
}
// generate the recommendation by id
function GenerateRecommendation(p_id) {
    const l = document.getElementsByClassName('product_carousel product_column5 owl-carousel owl-loaded owl-drag')
    const product_itemList = l[0].children[0].children[0].childNodes
    let n = product_itemList.length;
    api.GetRecommendationbyPid(p_id,n).then(res => {
        for (let i = 0; i < product_itemList.length;i++) {
            let a = product_itemList[i]
            if (res[i] == undefined) {
                break
            }
            let thumb1 = ProductThumb(res[i].id,res[i].name,res[i].first_product_img_url,res[i].second_product_img_url)
            let grid1 = GenerateProductGrid(res[i].id,res[i].name,res[i].price);
            const productblock1 = createElement('article',"",{class:"single_product",id:res[i].id});
            AppendAllChild(productblock1,[thumb1,grid1])
            AppendAllChild(a.lastChild,[productblock1])
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
// generate the also view recommendation
function GenerateAlsoView(p_id) {
    const l = document.getElementsByClassName('product_carousel product_column5 owl-carousel owl-loaded owl-drag')
    const product_itemList = l[1].children[0].children[0].childNodes
    let n = product_itemList.length;
    api.GetBuyRecommendation(p_id,n).then(res => {
        for (let i = 0; i < product_itemList.length;i++) {
            let a = product_itemList[i]
            if (res[i] == undefined) {
                break
            }
            let thumb1 = ProductThumb(res[i].id,res[i].name,res[i].first_product_img_url,res[i].second_product_img_url)
            let grid1 = GenerateProductGrid(res[i].id,res[i].name,res[i].price);
            const productblock1 = createElement('article',"",{class:"single_product",id:res[i].id});
            AppendAllChild(productblock1,[thumb1,grid1])
            AppendAllChild(a.lastChild,[productblock1])
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

GenerateRecommendation(p_id)
GenerateAlsoView(p_id)
showProductDetail(p_id);
