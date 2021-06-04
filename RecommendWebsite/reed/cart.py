from check import *
from Error import *
from global_variable import *
from flask import Flask, abort, Response, make_response,jsonify
from Token import *
from helper import *
from app import *
from auth import *

'''
function for user add product into cart
the user should log in to add cart
input:
    token: str
    product_id: int
return:
    {'user_id':user['user_id'], "product_id":product['id']}
'''

def add_product_to_cart(token, product_id):
    productDB=get_productDB()
    UserDB=get_UserDB()
    cartDB=load_CartDB()
    temp=decodeToken(token)
    email=temp['email']
    if user_or_admin(email)!=0:
        abort(403)
        raise AccessError(description='you need be an user to buy product')
    user=get_user_ByEmail(email, UserDB)
    product=get_product_ByID(product_id,productDB)
    
    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')

    if product['status']!=1:
        abort(410)
        raise AccessError(description='the'+ product['name']+'is not for sale')

    if product['stock']<=0:
        abort(410)
        raise AccessError(description='the'+ product['name']+'is not enough for sale')

    cart=get_cart_ByUserID(user['user_id'],cartDB)
    cart['product'].append(product['id'])
    save_UserDB(UserDB)
    save_productDB(productDB)
    save_cartDB(cartDB)
    return {'user_id':user['user_id'], "product_id":product['id']}


'''
function for user remove product into cart
the user should log in to add cart
input:
    token: str
    product_id: int
return:
    
'''
def remove_product_from_cart(token, product_id):
    productDB=get_productDB()
    UserDB=get_UserDB()
    cartDB=load_CartDB()
    temp=decodeToken(token)
    email=temp['email']

    if user_or_admin(email)!=0:
        abort(403)
        raise AccessError(description='you need be an user to remove product')
    user=get_user_ByEmail(email, UserDB)
    product=get_product_ByID(product_id,productDB)
    
    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')


    cart=get_cart_ByUserID(user['user_id'],cartDB)
    check=False
    for i in cart['product']:
        if i==product_id:
            check=True
    if not check:
        abort(403)
        raise AccessError(description='you do not have this product in your cart')
    cart['product'].remove(product['id'])
    #product['stock']=product['stock']-1
    save_UserDB(UserDB)
    save_productDB(productDB)
    save_cartDB(cartDB)

'''
function for user get cart
the user should log in to add cart
input:
    token: str
return:
    cart list
'''
def get_cart(token):
    productDB=get_productDB()
    UserDB=get_UserDB()
    cartDB=load_CartDB()
    temp=decodeToken(token)
    email=temp['email']

    if not isLoggedin(email):#not logged in
        raise AccessError(description='not logged in')

    if user_or_admin(email)!=0:
        abort(607)
        raise AccessError(description='you need be an user to get cart')
    user=get_user_ByEmail(email, UserDB)
    cart=get_cart_ByUserID(user['user_id'],cartDB)
    if not isLoggedin(email):#not logged in
        abort(608)
        raise AccessError(description='not logged in')
    l=[]
    for i in cart['product']:
        l.append(get_product_ByID(i,productDB))
    return l






