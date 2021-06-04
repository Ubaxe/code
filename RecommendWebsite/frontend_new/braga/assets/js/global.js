import {createElement, AppendAllChild} from './api.js';
const category = {0 : "Electronic", 1: "Book",2: "Sport",3: "Clothes",4: "Home",5: "Toy"};
  
/** find the category name by id */
/** @param {Int} category id */
/** @return {String} return category name */
export function find_category(id) {
    return category[id];
}

// generate product thumb
export function ProductThumb(id,name,first_img,second_img) {
    const product_thumb = createElement('div',"",{class:"product_thumb"});
    const primary_img = createElement('a',"",{class:"primary_img",href:"product-details.html?"+id});
    const secondary_img = createElement('a',"",{class:"secondary_img",href:"product-details.html?"+id});
    const img1 = createElement('img',"",{src:first_img, href:"product-details.html?"+id,alt:name});
    const img2 = createElement('img',"",{src:second_img, href:"product-details.html?"+id,alt:name});
    AppendAllChild(primary_img,[img1])
    AppendAllChild(secondary_img,[img2])
    AppendAllChild(product_thumb,[primary_img,secondary_img])
    return product_thumb
}
// generate product grid
export function GenerateProductGrid(id,name,price) {
    const product_content_grid_content = createElement('div',"",{class:"product_content grid_content"});
    const product_content_inner = createElement('div',"",{class:"product_content_inner"});
    const product_name = createElement('h4',"",{class:"product_name"});
    const product_name_link = createElement('a',name,{href:"product-details.html?"+id});
    const price_box = createElement('div',"",{class:"price_box"});
    const current_price = createElement('span',"$"+price,{class:"current_price"});
    const add_to_cart = createElement('div',"",{class:"add_to_cart"});
    const add_to_cart_link = createElement('a',"Add to cart",{class:"add_cart_button",style:"color:white"});
    AppendAllChild(product_name,[product_name_link])
    AppendAllChild(price_box,[current_price])
    AppendAllChild(add_to_cart,[add_to_cart_link])
    AppendAllChild(product_content_inner,[product_name,price_box])
    AppendAllChild(product_content_grid_content,[product_content_inner,add_to_cart])
    return product_content_grid_content
}
// generate product List
export function GenerateProductinList(id,name,price,desc) {
    const product_content_list_content = createElement('div',"",{class:"product_content list_content"});
    const product_name_list = createElement('h4',"",{class:"product_name"});
    const product_name_list_link = createElement('a',name,{href:"product-details.html?"+id});
    const price_box_list = createElement('div',"",{class:"price_box"});
    const current_price_list = createElement('span',"$"+price,{class:"current_price"});
    const product_desc = createElement('div',"",{class:"product_desc"});
    const product_desc_text = createElement('p',desc,{});
    const add_to_cart_list = createElement('div',"",{class:"add_to_cart shop_list_cart"});
    const add_to_cart_list_link = createElement('a',"Add to cart",{class:"add_cart_button"});
    AppendAllChild(product_name_list,[product_name_list_link])
    AppendAllChild(price_box_list,[current_price_list])
    AppendAllChild(product_desc,[product_desc_text])
    AppendAllChild(add_to_cart_list,[add_to_cart_list_link])
    AppendAllChild(product_content_list_content,[product_name_list,price_box_list,product_desc,add_to_cart_list])
    return product_content_list_content
}

export function ProductinFullWidth(id,name,price,desc,first_img,second_img)  {
    const thumb = ProductThumb(id,name,first_img,second_img)
    const grid = GenerateProductGrid(id,name,price);
    const list = GenerateProductinList(id,name,price,desc);
    const productblock = createElement('article',"",{class:"single_product",id:id});
    AppendAllChild(productblock,[thumb,grid,list])
    return productblock
}