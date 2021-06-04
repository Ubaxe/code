from check import *
from Error import *
from global_variable import *
from flask import Flask, abort, Response, make_response,jsonify
from Token import *
from helper import *
from app import *
from initial import*

'''
function for user register, this will not only create a account for user but also create an empty record list, purchase list
and cart list for user
if you register, will automatically log in
input:
    email: str
    password: str
    name: str
return:
    {"token": token}
'''
#register as an user with email,assword and retun token
def user_register(email, password, name):
    UserDB = load_UserDB()
    cart=load_CartDB()
    record=load_RecordDB()
    searchDB=load_searchDB()
    password = str(password)
    email = str(email)
    name=str(name)
    if valid_email(email) == False:
        abort(403)
        raise ValueError(description="Required parameter is missing")
    if not_exist_email(email) == False:
        abort(403)
        raise ValueError(description="email already exist")
    token = generateToken(generateDictionary(email, password))
    user_id = len(UserDB)
    dic = {"email": email, "password": password, "name": name, "user_id": user_id,"status":True, "token": token}
    dic2={"user_id" : user_id, 'product':[]}
    dic3={"user_id" : user_id, 'product':[]}
    dic4={"user_id" : user_id, 'search_record':[]}
    check=False
    check2=False
    check3=False
    for a in cart:
        if a['user_id']==user_id:
            check=True
            break
    for b in record:
        if b['user_id']==user_id:
            check2=True
            break
    for c in searchDB:
        if c['user_id']==user_id:
            check3=True
            break
    if not check:
        cart.append(dic2)
    else:
        a['product']=[]
    if not check2:
        record.append(dic3)
    else:
        b['product']=[]
    if not check3:
        searchDB.append(dic4)
    else:
        c['search_record']=[]
    UserDB.append(dic)
    save_UserDB(UserDB)
    save_cartDB(cart)
    save_recordDB(record)
    save_searchDB(searchDB)
    return {"token": token}


'''
function for user log in
input:
    email: str
    password: str
return:
    {"token": token}
'''
def user_login(email, password):
    password = str(password)
    UserDB = load_UserDB()
    email = str(email)
    user = get_user_ByEmail(email,UserDB)
    if password != user["password"]:
        abort(403)  # 403 mean password wrong
        raise AccessError(description='password wrong')
    user['status']=True
    save_UserDB(UserDB)
    return {"token": user["token"]}

'''
function for user log out
input:
    token: str
return:
    {}
'''
def user_logout(token):
    UserDB = load_UserDB()
    # check wether this email is already logged in
    user = decodeToken(token)  # now user is {email: email, password: password}
    email = user['email']
    if isLoggedin(email) == False:
        abort(403)
        raise AccessError(description='not logged in')
    else:
        user = get_user_ByEmail(email,UserDB)
        user['status']=False
        save_UserDB(UserDB)
        return {'status':user['status']}



    
