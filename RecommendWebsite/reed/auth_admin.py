from check import *
from Error import *
from global_variable import *
from Token import *
from helper import *
from flask import Flask, abort, Response, make_response,jsonify
from purchase import *
from auth import *

'''
function for admin log in
input:
    email: str
    password: str
return:
    {"token":admin['token']}
'''
def admin_login(email, password):
    adminDB=get_AdminDB()
    email=str(email)
    password=str(password)
    #check wether this email is already logged in
    if isLoggedin(email):
        abort(403)
        raise AccessError(description='admin already logged in')
    
    admin=get_admin_ByEmail(email,adminDB)
    if password!=admin["password"]:
        abort(403)
        raise AccessError(description='password wrong')
    admin['status']=True
    save_adminDB(adminDB)
    return {"token":admin['token']}


'''
function for admin log out
input:
    token: str
return:
    {}
'''
def admin_logout(token):
    adminDB=get_AdminDB()
    #check wether this email is already logged in
    admin=decodeToken(token) # now user is {email: email, password: password}
    email=admin['email']
    if not isLoggedin(email):
        abort(403)
        raise AccessError(description='not logged in')
    admin=get_admin_ByEmail(email,adminDB)
    admin['status']=False
    save_adminDB(adminDB)
    return {}

'''
this is a helper function, you can add admin in the backend, but we will not allow you to add admin in frontend
input:
    email: str
    password: str
    name: str
return:
    {}
'''
def admin_add(email, password, name):
    adminDB=get_AdminDB()
    email=str(email)
    password=str(password)
    name=str(name)
    token=generateToken(generateDictionary(email, password))
    admin_id=len(adminDB)
    dic={"email" : email, "password" : password, "name": name, "admin_id" : admin_id,"status":False, "token" : token}
    adminDB.append(dic)
    save_adminDB(adminDB)
    return {}

'''
return all the product which is added by this admin
input:
    token: str
return:
    list of product
'''
def admin_product(token):
    adminDB=get_AdminDB()
    productDB=load_productDB()
    #check wether this email is already logged in
    admin=decodeToken(token) # now user is {email: email, password: password}
    email=admin['email']
    admin=get_admin_ByEmail(email,adminDB)
    l=[]
    for product in productDB:
        if product['admin_id']==admin['admin_id']:
            l.append(product)
    re=[]
    for i in l:
        if i['status']==1:
            re.append(i)
    return re


'''
this function return all the product which is being saled for one admin
input:
    token: str
return:
    [{'user_id':number, 'cart_id':number,'product':[list of product], 'item_number':len(l),'cost':i['cost'],'time':time}]
'''
def admin_order(token):
    adminDB=get_AdminDB()
    recordDB=load_RecordDB()
    productDB=load_productDB()
    userDB=load_UserDB()
    #check wether this email is already logged in
    admin=decodeToken(token) # now user is {email: email, password: password}
    email=admin['email']
    admin=get_admin_ByEmail(email,adminDB)
    l=[]
    for i in recordDB:
        cart_id=0
        for j in i['product']:
            l3=[]
            for k in j['id']:
                product=get_product_ByID(k,productDB)
                if product['admin_id']==admin['admin_id']:
                    l3.append(product)############
            if l3!=[]:
                time=datetime.datetime.strptime(j['time'], '%Y-%m-%d %H:%M:%S')
                time=time.strftime("%Y-%m-%d")
                name=get_user_ById(i['user_id'],userDB)
                name=name['name']
                l.append({'name':name,'user_id':i['user_id'], 'cart_id':cart_id,'product':l3, 'item_number':len(l3),'cost':j['cost'],'time':time})
                cart_id+=1

    return l

'''
return the specific order with index 
input:
    token: str
    index: int       index must be userid_cartid
return:
    {'user_id':number, 'cart_id':number,'product':[list of product], 'item_number':len(l),'cost':i['cost'],'time':time}]
''' 
def admin_get_order(token,index): 
    return_from_admin_order=admin_order(token)
    index=str(index)
    if '_' not in index:
        abort(500)
        raise AccessError(description='wrong index')
    user_id=''
    cart_id=''
    for i in index:
        if i=='_':
            break
        user_id+=i
        
    check=0
    for i in index:
        if i=='_':
            check=1
            continue
        if check==1:
            cart_id+=i
          
    user_id=int(user_id)
    cart_id=int(cart_id)

    for i in return_from_admin_order:
        if i['user_id']==user_id and i['cart_id']==cart_id:
            return i
    
    abort(540)
    raise AccessError(description='wrong input index')


'''
return the income of the admin
input:
    token: str
return:
    income: int
'''
def admin_income(token):
    adminDB=get_AdminDB()
    recordDB=load_RecordDB()
    productDB=load_productDB()
    #check wether this email is already logged in
    admin=decodeToken(token) # now user is {email: email, password: password}
    email=admin['email']
    admin=get_admin_ByEmail(email,adminDB)
    income=0
    for i in recordDB:
        for j in i['id']:
            product=get_product_ByID(j,productDB)
            if product['admin_id']==admin['admin_id']:
                income+=product['price']
    return income
