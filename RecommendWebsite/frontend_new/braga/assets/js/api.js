const API_URL = 'http://127.0.0.1:5000'

/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */

export function createElement(tag, data, options = {}) {
    const el = document.createElement(tag);
    el.textContent = data;
    // Sets the attributes in the options object to the element
    return Object.entries(options).reduce(
        (element, [field, value]) => {
            element.setAttribute(field, value);
            return element;
        }, el);
}

/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */

export function AppendAllChild(parent,childArray) {
    for (let i = 0; i < childArray.length; i++) {
        parent.appendChild(childArray[i]);
    }
}

/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
export default class API {
    /** @param {String} url */
    constructor() {
        this.url = API_URL;
    } 

    /** @param {String} path */
    makeAPIRequest(path) {
        return `${this.url}/${path}`;
    }
    /** @param {String} token */
    /** @param {String} p p define user or admin */
    storeTokenUserName(token,p) {
        if (p == 'admin') {
            localStorage.setItem('admin',token);
        } else if (p == 'user') {
            localStorage.setItem('token',token);
        }
    }
    // Login API
    /** @param {String} email */
    /** @param {String} password */
    /** @return {Promise<string>} Promise which resolves a token */
    LoginAuth(email,password) {
        let requestURL = this.makeAPIRequest("login");
        const auth = fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify({
                email : email,
                password : password
            }),headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 200) {
                response.json().then(res => {
                    const token = res['token'];
                    this.storeTokenUserName(token,'user');
                    window.location = "index.html";
                })
                return Promise.resolve(response);
            } else if (response.status == 400) {
            } else if (response.status == 403) {
                const login_part = document.getElementById('login_part')
                const alter = createElement('div',"Invalid Username/Password",{class:"alert alert-danger",role:"alert"});
                login_part.prepend(alter)
            }
        });
        return auth
    }

    // Register API
    /** @param {String} name */
    /** @param {String} email */
    /** @param {String} password */
    /** @return {Promise<string>} Promise which resolves a token */
    RegisterAuth(name, email,password) {
        let requestURL = this.makeAPIRequest("register");
        const auth = fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify({
                name : name,
                email : email,
                password : password
            }),headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 200) {
                response.json().then(res => {
                    const token = res['token'];
                    this.storeTokenUserName(token,'user');
                    window.location = "index.html";
                })
                return Promise.resolve(response);
            }
        });
    }
    // Logout API
    /** @param {String} token */
    Logout(token) {
        let requestURL = this.makeAPIRequest("logout");
        const auth = fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify({
                token : token,
            }),headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 200) {
               response.json().then(res => {
                    localStorage.removeItem('token')
                })
                return Promise.resolve(response);
            }
        });
    }
    // GetProduct API
    /** @return {Array} product List */
    GetAllProduct() {
        let requestURL = this.makeAPIRequest("get_product/all");
        const r = fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }

    // Get Product by category API
    /** @param {String} category */
    /** @param {Int} which page */
    /** @return {Array} product List */
    GetProductbyCategory(category,page) {
        let requestURL = this.makeAPIRequest("get_product/" + category);
        const r = fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Page': page,
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }

    // Get Number of Product by category API
    /** @param {String} category */
    /** @return {Int} the number of product by category */
    GetNumbyCategory(category) {
        let requestURL = this.makeAPIRequest("get_number/" + category);
        const r = fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }

    // Get Id of Product API
    /** @param {Int} product Id */
    /** @return {Object} product Json data */
    GetOneProduct(id) {
        let requestURL = this.makeAPIRequest("get_one_product/" + id);
        const r = fetch(requestURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    // Get Id of Product API
    /** @return {Object} Cart Json data */
    GetCart(){
        let requestURL = this.makeAPIRequest("get_cart");
        const r = fetch(requestURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    // Add product to Cart API
    /** @param {Int} product Id */
    /** @return {*} add product successfully*/
    AddCart(id) {
        let requestURL = this.makeAPIRequest("add_product_to_cart/" + id);
        const r = fetch(requestURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
    }
    // Remove product from Cart API
    /** @param {Int} product Id */
    /** @return {*} remove product from cart succesfully*/
    RemoveCart(id) {
        let requestURL = this.makeAPIRequest("remove_product_from_cart/" + id);
        const r = fetch(requestURL,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
    }
    // Get Recommendation API
    /** @param {Int} the number of recommendation product */
    /** @return {Object} Recommendation products */
    GetRecommendation(number){
        let requestURL_1 = this.makeAPIRequest("random_recommend");
        let requestURL_2 = this.makeAPIRequest("purchase_record_recommendation");
        if (localStorage.getItem('token') == null) {
            const r = fetch(requestURL_1,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Numbers': number,
                }
            }).then(res  => {
                return res.json();
            }).then (data => {
                return data;
            }).catch(e => {
                console.log(e);
            })  
            return r
        } else {
            const r = fetch(requestURL_2,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                    'Numbers': number,
                }
            }).then(res  => {
                return res.json();
            }).then (data => {
                return data;
            }).catch(e => {
                console.log(e);
            })  
            return r
        }
    }

    // Get Recommendation by product API
    /** @param {Int} Get recommendation for product id */
    /** @param {Int} the number of recommendation product */
    /** @return {Object} Recommendation products */
    GetRecommendationbyPid(id,number) {
        let requestURL = this.makeAPIRequest("product_recommendation/" + id);
        const r = fetch(requestURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Numbers': number,
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }

    // Get Buy Recommendation by product API
    /** @param {Int} Get buy recommendation for product id */
    /** @param {Int} the number of recommendation product */
    /** @return {Object} Recommendation products */
    GetBuyRecommendation(id,number) {
        let requestURL = this.makeAPIRequest("buy_recommendation/" + id);
        const r = fetch(requestURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Numbers': number,
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    // CheckOut API
    /** @return {*} does not return data just checkout */
    Checkout() {
        let requestURL = this.makeAPIRequest("purchase_product");
        const r = fetch(requestURL,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    
    // Change user name API
    /** @param {String} User name */
    /** @return {*} Change user name successfully */
    ChangeName(name) {
        let requestURL = this.makeAPIRequest("change_name");
        const r = fetch(requestURL,{
            method: 'PUT',
            body: JSON.stringify({
                name : name,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }

    // Change user password API
    /** @param {String} current password */
    /** @param {String} New password */
    /** @return {*} Change user password successfully */
    ChangePassword(current_password,password) {
        let requestURL = this.makeAPIRequest("change_password");
        const r = fetch(requestURL,{
            method: 'PUT',
            body: JSON.stringify({
                current_password : current_password,
                password : password,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res  => {
            if (res.status == 403) {
                let form = document.getElementById('Pchange')
                form.previousElementSibling.style = "display:normal"
                form.previousElementSibling.innerText = "Wrong Password"
            }
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }

    // Get User Order API
    /** @return {Object} Orders List */
    UserGetOrders() {
        let requestURL = this.makeAPIRequest("get_record");
        const r = fetch(requestURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }

    // Admin get all products API
    /** @return {Object} return products */
    AdminGetProducts() {
        let requestURL = this.makeAPIRequest("admin_product");
        const r = fetch(requestURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Admin': localStorage.getItem('admin'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }

    // Admin get order API
    /** @return {*} order list */
    AdminGetOrder() {
        let requestURL = this.makeAPIRequest("admin_order");
        const r = fetch(requestURL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Admin': localStorage.getItem('admin'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    // Admin login API
    /** @param {String} Email */
    /** @param {String} password */
    /** @return {*} admin login successfully */
    LoginAdmin(email,password) {
        let requestURL = this.makeAPIRequest("admin_login");
        const auth = fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify({
                email : email,
                password : password
            }),headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 200) {
                response.json().then(res => {
                    const token = res['token'];
                    this.storeTokenUserName(token,'admin');
                    window.location = "dashboard.html";
                })
                return Promise.resolve(response);
            } else if (response.status == 400) {
            } else if (response.status == 403) {
                const login_part = document.getElementById('login_part')
                const alter = createElement('div',"Invalid Username/Password",{class:"alert alert-danger",role:"alert"});
                login_part.prepend(alter)
            }
        });
        return auth
    }

    // Admin logout API
    /** @param {String} token */
    /** @return {*} return admin logout successfully */
    AdminLogout(token) {
        let requestURL = this.makeAPIRequest("admin_logout");
        const auth = fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify({
                Admin : token,
            }),headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status == 200) {
               response.json().then(res => {
                    localStorage.removeItem('admin')
                })
                return Promise.resolve(response);
            }
        });
    }
    // Admin add products API
    /** @param {Int} category id*/
    /** @param {String} name */
    /** @param {String} detail */
    /** @param {Int} Price */
    /** @param {Int} Stock */
    /** @param {String} Tag */
    /** @param {Base64} First image */
    /** @param {Base64} Second image */
    /** @return {*} return add product successfully */
    AdminAddProduct(category_id,name,detail,price,stock,tag,first_img,second_img) {
        let requestURL = this.makeAPIRequest("add_product");
        const r = fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify({
                category_id : category_id,
                name: name,
                detail: detail,
                price: price,
                stock: stock,
                tag: tag,
                first_p: first_img,
                second_p: second_img,
            }),headers: {
                'Content-Type': 'application/json',
                'Admin': localStorage.getItem('admin'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    // Admin edit products API
    /** @param {Int} category id*/
    /** @param {String} name */
    /** @param {String} detail */
    /** @param {Int} Price */
    /** @param {Int} Stock */
    /** @param {String} Tag */
    /** @param {Base64} First image */
    /** @param {Base64} Second image */
    /** @return {*} return edit product successfully */
    AdminEditProduct(id,category_id,name,detail,price,stock,tag,first_img,second_img) {
        let requestURL = this.makeAPIRequest("update_information");
        const r = fetch(requestURL, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                category_id : category_id,
                name: name,
                detail: detail,
                price: price,
                stock: stock,
                tag: tag,
                first_p: first_img,
                second_p: second_img,
            }),headers: {
                'Content-Type': 'application/json',
                'Admin': localStorage.getItem('admin'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    // Admin view order API
    /** @param {Int} order id */
    /** @return {*} return order */
    AdminViewOrder(index) {
        let requestURL = this.makeAPIRequest("admin_get_order");
        const r = fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Admin': localStorage.getItem('admin'),
                'index': index,
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    // Search product API
    /** @param {String} keywords */
    /** @param {Int} min price */
    /** @param {Int} max price */
    /** @return {*} return search result */
    Search(word,min_price,max_price) {
        let token = localStorage.getItem('token');
        let requestURL;
        if (token == null) {
            requestURL = this.makeAPIRequest("search");
            const r = fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'search_word': word,
                    'max_price': max_price,
                    'min_price': min_price,
                }
            }).then(res  => {
                return res.json();
            }).then (data => {
                return data;
            }).catch(e => {
                console.log(e);
            })  
            return r
        } else {
            requestURL = this.makeAPIRequest("search_with_token");
            const r = fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                    'search_word': word,
                    'max_price': max_price,
                    'min_price': min_price,
                }
            }).then(res  => {
                return res.json();
            }).then (data => {
                return data;
            }).catch(e => {
                console.log(e);
            })  
            return r
        }
    }
    // Admin delete product API
    /** @param {Int} product id*/
    /** @return {*} return delete product successfully */
    Delete(id) {
        let requestURL = this.makeAPIRequest("delete_product/"+id);
        const r = fetch(requestURL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('admin'),
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    // Chatbot API
    /** @param {String} chat text input*/
    /** @return {*} return chat bot output */
    ChatBot(text) {
        let requestURL = this.makeAPIRequest("chatbot");
        const r = fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'word': text,
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }
    // Chatbot recommendation API
    /** @return {Object} return recommendation product by chatbot */
    ChatBotRecommendation() {
        let requestURL = this.makeAPIRequest("chatbot_get");
        const r = fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res  => {
            return res.json();
        }).then (data => {
            return data;
        }).catch(e => {
            console.log(e);
        })  
        return r
    }

}
