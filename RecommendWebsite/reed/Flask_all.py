from json import dumps
from flask import Flask, request
from flask_cors import CORS
from auth import *
from app import *
from auth_admin import *
from product import *
from user_function import *
from purchase import *
from cart import *
from recommend import *
from search import *
from chat import *
#----------------------------------------------user login-------------------------------
@app.route('/login', methods=['POST'])
def flask_login():
    j = request.json
    email = j['email']
    password = j['password']
    l = user_login(email, password)
    return dumps(l)


@app.route('/register', methods=['POST'])
def flask_register():
    j = request.json
    email = j['email']
    password = j['password']
    name = j['name']
    l = user_register(email, password, name)
    return dumps(l)


@app.route('/logout', methods=['POST'])
def flask_logout():
    j = request.json
    t = j['token']
    l = user_logout(t)
    return dumps(l)

#----------------------------------------------admin login-------------------------------
@app.route('/admin_login', methods=['POST'])
def flask_admin_login():
    j = request.json
    email = j['email']
    password = j['password']
    l = admin_login(email, password)
    return dumps(l)

@app.route('/admin_logout', methods=['POST'])
def flask_admin_logout():
    j = request.json
    token = j['Admin']
    l = admin_logout(token)
    return dumps(l)

@app.route('/admin_product', methods=['GET'])
def flask_admin_product():
    token = request.headers.get('Admin',None)
    l = admin_product(token)
    return dumps(l)

@app.route('/admin_order', methods=['GET'])
def flask_admin_order():
    token = request.headers.get('Admin',None)
    l = admin_order(token)
    return dumps(l)


@app.route('/admin_get_order', methods=['GET'])
def flask_admin_get_order():
    token = request.headers.get('Admin',None)
    index = request.headers.get('index',None)
    l=admin_get_order(token,index)
    return dumps(l)

#----------------------------------------------product-------------------------------

          
@app.route('/add_product', methods=['POST'])
def flask_add_product():
    j = request.json
    token = request.headers.get('Admin',None)
    category_id = j['category_id']
    name = j['name']
    detail = j['detail']
    price = j['price']
    stock = j['stock']
    tag=j['tag']
    first_p=j['first_p']
    second_p=j['second_p']
    l = add_product(token,category_id,name,detail,price,stock,tag,first_p,second_p)
    return dumps(l)

@app.route('/delete_product/<id>', methods=['PUT'])
def flask_delete_product(id):
    id=int(id)
    token = request.headers.get('Authorization',None)
    l=delete_product(token,id)
    return dumps(l)

@app.route('/update_information', methods=['POST'])
def flask_update_information():
    j = request.json
    token = request.headers.get('Admin',None)
    id=j['id']
    category_id = j['category_id']
    name = j['name']
    detail = j['detail']
    price = j['price']
    stock = j['stock']
    tag=j['tag']
    first_p=j['first_p']
    second_p=j['second_p']
    l = update_information(token,id,category_id,name,detail,price,stock,tag,first_p,second_p)
    return dumps(l)


@app.route('/change_detail', methods=['PUT'])
def flask_change_detail():
    j = request.json
    token = request.args.get("token")
    id = request.args.get("id")
    detail = j['detail']
    l =  chang_detail(token, id, detail)
    return dumps(l)

@app.route('/add_tag', methods=['PUT'])
def flask_add_tag():
    j = request.json
    token = request.args.get("token")
    id = request.args.get("id")
    tag = j['tag']
    l =  add_tag(token, id, tag)
    return dumps(l)

@app.route('/change_tag', methods=['PUT'])
def flask_change_tag():
    j = request.json
    token = request.args.get("token")
    id = request.args.get("id")
    tag = j['tag']
    l =  change_tag(token, id, tag)
    return dumps(l)

@app.route('/change_status', methods=['PUT'])
def flask_change_status():
    j = request.json
    token = request.args.get("token")
    id = request.args.get("id")
    status = j['status']
    l =  change_status(token, id, status)
    return dumps(l)

@app.route('/change_stock', methods=['PUT'])
def flask_change_stock():
    j = request.json
    token = request.args.get("token")
    id = request.args.get("id")
    stock= j['stock']
    l =  change_stock(token, id, stock)
    return dumps(l)

@app.route('/change_price', methods=['PUT'])
def flask_change_price():
    j = request.json
    token = request.args.get("token")
    id = request.args.get("id")
    price = j['price']
    l =  change_stock(token, id, price)
    return dumps(l)

@app.route('/get_product/<category>', methods=['GET'])
def flask_get_product(category):
    return dumps(get_by_category(category))

@app.route('/get_number/<category>', methods=['GET'])
def flask_get_number(category):
    return dumps(get_number_by_category(category))

@app.route('/get_one_product/<id>', methods=['GET'])
def flask_get_one_product(id):
    id=int(id)
    return dumps(get_one_product(id))


@app.route('/update_first_photo', methods=['PUT'])
def flask_update_first_photo():
    j = request.json
    id = request.args.get("id")
    token = request.args.get("token")
    photo = j['photo']
    return dumps(update_first_photo(photo))

@app.route('/update_second_photo', methods=['PUT'])
def flask_update_second_photo():
    j = request.json
    id = request.args.get("id")
    token = request.args.get("token")
    photo = j['photo']
    return dumps(update_second_photo(photo))
#----------------------------------------------user function-------------------------------

@app.route('/change_password', methods=['PUT'])
def flask_change_password():
    j = request.json
    token = request.headers.get('Authorization',None)
    password =  j['password']
    current_password =  j['current_password']
    l =  change_password(token,current_password, password)
    return dumps(l)


@app.route('/change_name', methods=['PUT'])
def flask_change_name():
    j = request.json
    token = request.headers.get('Authorization',None)
    name =  j['name']
    l =  change_name(token,name)
    return dumps(l)


#----------------------------------------------purchase-------------------------------


@app.route('/purchase_product', methods=['POST'])
def flask_purchase_product():
    token = request.headers.get('Authorization',None)
    l =  purchase_product(token)
    return dumps(l)

@app.route('/review_By_time', methods=['POST'])
def flask_review_By_time():
    j = request.json
    token = request.args.get("token")
    day = request.args.get("day")
    l =  review_By_time(token,day)
    return dumps(l)

@app.route('/get_cost_By_Time', methods=['POST'])
def flask_get_cost_By_Time():
    j = request.json
    token = request.args.get("token")
    day = request.args.get("day")
    l =  get_cost_By_Time(token,day)
    return dumps(l)

@app.route('/get_record', methods=['GET'])
def flask_get_record():
    token = request.headers.get('Authorization',None)
    l =  get_record(token)
    return dumps(l)
#----------------------------------------------cart-------------------------------

@app.route('/add_product_to_cart/<id>', methods=['GET'])
def flask_add_product_to_cart(id):
    token = request.headers.get('Authorization',None)
    id=int(id)
    l =  add_product_to_cart(token,id)
    return dumps(l)

@app.route('/remove_product_from_cart/<id>', methods=['DELETE'])
def flask_remove_product_from_cart(id):
    token = request.headers.get('Authorization',None)
    id=int(id)
    l =  remove_product_from_cart(token,id)
    return dumps(l)

@app.route('/get_cart', methods=['GET'])
def flask_get_cart():
    token = request.headers.get('Authorization',None)
    l =  get_cart(token)
    return dumps(l)



#----------------------------------------------recommend-------------------------------

@app.route('/random_recommend', methods=['GET'])
def flask_random_recommend():
    number = request.headers.get('Numbers',None)
    number = int(number)
    l=random_recommendation(number)  # return 10 product
    return dumps(l)

@app.route('/product_recommendation/<id>', methods=['GET'])
def flask_product_recommendation(id):
    id=int(id)
    number = request.headers.get('Numbers',None)
    l=product_recommendation(id,number)  # return 10 product
    return dumps(l)


@app.route('/buy_recommendation/<id>', methods=['GET'])
def flask_buy_recommendation(id):
    id=int(id)
    number = request.headers.get('Numbers',None)
    l=buy_recommendation(id,number)  # return 10 product
    return dumps(l)

@app.route('/purchase_record_recommendation', methods=['GET'])
def flask_purchase_record_recommendation():
    token = request.headers.get('Authorization',None)
    number = request.headers.get('Numbers',None)
    number = int(number)
    l=purchase_record_recommendation(token,number)  # return 10 product
    return dumps(l)

#-----------------------------------------------search------------------------------------
@app.route('/search', methods=['GET'])
def flask_search():
    search_word = request.headers.get('search_word',None)
    max_price = int(request.headers.get('max_price',None))
    min_price = int(request.headers.get('min_price',None))
    l =  search(search_word,min_price,max_price)
    return dumps(l)

@app.route('/search_with_token', methods=['GET'])
def flask_search_with_token():
    token = request.headers.get('Authorization',None)
    search_word = request.headers.get('search_word',None)
    max_price = request.headers.get('max_price',None)
    min_price = request.headers.get('min_price',None)
    l =  search_with_token(token,search_word,min_price,max_price)
    return dumps(l)


#-------------------------------------------cahtbot-----------------------------
'''
@app.route('/chatbot', methods=['GET'])
def flask_chatbot():
    j = request.json
    word=j['word']
    l=chatbot_handle(word)
    return dumps(l)
'''
@app.route('/chatbot', methods=['GET'])
def flask_chatbot():
    word = request.headers.get('word',None)
    l=chatbot_handle(word)
    return dumps(l)

@app.route('/chatbot_get', methods=['GET'])
def flask_chatbot_get():
    l=load_chatDB()
    return dumps(l)

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000,debug=True)
