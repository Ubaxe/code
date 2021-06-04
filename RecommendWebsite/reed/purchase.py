from check import *
from Error import *
from global_variable import *
from flask import Flask, abort, Response, make_response,jsonify
from Token import *
from helper import *
from app import *
import datetime


'''
purchase the product in cart
input:
    token: str
return:
    {'user_id':user['user_id'], "product_id_list":product_id_list}
'''
def purchase_product(token):
    productDB=get_productDB()
    UserDB=get_UserDB()
    recordDB=load_RecordDB()
    cartDB=load_CartDB()
    temp=decodeToken(token)
    email=temp['email']

    user=get_user_ByEmail(email, UserDB)
    cart=get_cart_ByUserID(user["user_id"],cartDB)
    product_id_list=cart['product']
    if user_or_admin(email)!=0:
        abort(403)
        raise AccessError(description='you need be an user to buy product')
    cost=0
    for product_id in product_id_list:
        product=get_product_ByID(product_id,productDB)
        cost+=product['price']
        if product['status']!=1:
            abort(403)
            raise AccessError(description='the'+ product['name']+'is not for sale')

        if product['stock']<=0:
            abort(403)
            raise AccessError(description='the'+ product['name']+'is not enough for sale')

        

    record=get_record_ByUserID(user['user_id'],recordDB)
    time=datetime.datetime.now()
    time=time.strftime("%Y-%m-%d %H:%M:%S")
    record['product'].append({'id':product_id_list,'time':time, 'cost':cost})
    for product_id in product_id_list:
        product=get_product_ByID(product_id,productDB)
        product['stock']=product['stock']-1
    cart['product']=[]
    save_UserDB(UserDB)
    save_productDB(productDB)
    save_recordDB(recordDB)
    save_cartDB(cartDB)

    return {'user_id':user['user_id'], "product_id_list":product_id_list}

'''
remove the product in cart
input:
    token: str
    product_id: int
return:
    {'user_id':user['user_id'], "product_id_list":product_id_list}
'''
def remove_product(token, product_id):
    productDB=get_productDB()
    UserDB=get_UserDB()
    recordDB=load_RecordDB()
    temp=decodeToken(token)
    email=temp['email']

    user=get_user_ByEmail(email, UserDB)
    product=get_product_ByID(product_id,productDB)
    

    if user_or_admin(email)!=0:
        abort(403)
        raise AccessError(description='you need be an user to remove product')


    record=get_record_ByUserID(user['user_id'],recordDB)
    check=False
    for i in record['product']:
        if i['id']==product_id:
            check=True
            dic=i
    if not check:
        abort(403)
        raise AccessError(description='you do not have this product in your cart')
    record['product'].remove(dic)
    product['stock']=product['stock']+1
    save_UserDB(UserDB)
    save_productDB(productDB)
    save_recordDB(recordDB)
    return {'user_id':user['user_id'], "id":product['id']}

'''
review the product according to it's purchase time
input:
    token: str
    day: datetime
return:
    [product list]
'''
def review_By_time(token, day):
    current_time=datetime.datetime.now()
    day=int(day)
    UserDB=get_UserDB()
    recordDB=load_RecordDB()
    productDB=load_productDB()
    temp=decodeToken(token)
    email=temp['email']
    user=get_user_ByEmail(email, UserDB)
    if user_or_admin(email)!=0:
        abort(403)
        raise AccessError(description='you need be an user to check cost')
    record=get_record_ByUserID(user['user_id'],recordDB)
    cost=0
    li=[]
    for i in record['product']:
        time=datetime.datetime.strptime(i['time'], '%Y-%m-%d %H:%M:%S')
        if (current_time-time).days<=day:
            for product_id in i["id"]:
                product=get_product_ByID(product_id,productDB)
                li.append(product)
    return li

'''
review the cost according to it's purchase time
input:
    token: str
    day: datetime
return:
    cost
'''
def get_cost_By_Time(token, day):
    current_time=datetime.datetime.now()
    day=int(day)
    UserDB=get_UserDB()
    recordDB=load_RecordDB()
    productDB=load_productDB()
    temp=decodeToken(token)
    email=temp['email']
    user=get_user_ByEmail(email, UserDB)
    if user_or_admin(email)!=0:
        abort(403)
        raise AccessError(description='you need be an user to check cost')
    record=get_record_ByUserID(user['user_id'],recordDB)
    cost=0
    for i in record['product']:
        time=datetime.datetime.strptime(i['time'], '%Y-%m-%d %H:%M:%S')
        if (current_time-time).days<=day:
            for product_id in i["id"]:
                product=get_product_ByID(product_id,productDB)
                cost+=product["price"]
    return {'cost':cost}

'''
get purchase record of a user
input:
    token: str
return:
    [product list]
'''
def get_record(token):
    UserDB=get_UserDB()
    recordDB=load_RecordDB()
    productDB=load_productDB()
    temp=decodeToken(token)
    email=temp['email']
    user=get_user_ByEmail(email, UserDB)
    if user_or_admin(email)!=0:
        abort(403)
        raise AccessError(description='you need be an user to check cost')
    record=get_record_ByUserID(user['user_id'],recordDB)
    l=[]
    number=0
    for i in record['product']:   
        l2=[]
        for product_id in i["id"]:
            product=get_product_ByID(product_id,productDB)
            l2.append(product)
        time=datetime.datetime.strptime(i['time'], '%Y-%m-%d %H:%M:%S')
        time=time.strftime("%Y-%m-%d")
        l.append({'cart_id':number, 'product':l2, 'item_number':len(l2),'cost':i['cost'],'time':time})
        number+=1
    return l


#helper function, because in [{'cart_id':number, 'product':[], 'item_number':len(l),'cost':i['cost']}], product is too long
#so i transfer product information to it's id only, so you can check
def transfer(record):
    for i in record:
        l=[]
        for j in i['product']:
            l.append(j['id'])
        i['product']=l
    return record
