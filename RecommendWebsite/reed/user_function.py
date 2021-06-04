from Token import *
from helper import *
from auth import *
from global_variable import *
from Error import*
from flask import Flask, abort, Response, make_response,jsonify



'''
this function change the password of the user, once it work, the user will automatically log out
input:
    token: str
    current_password: int
    passworde: str
return:
    {'email':email}
'''
def change_password(token,current_password, password):
    password=str(password)
    current_password=str(current_password)
    temp=decodeToken(token) # now user is {email: email, password: password}
    email=temp['email']
    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')

    #check admin or user or none
    if user_or_admin(email)==1:
        adminDB=get_AdminDB()
        admin=get_admin_ByEmail(email,adminDB)
        if admin['password']!=current_password:
            abort(403)
            raise AccessError(description='invalid password')
        admin['password']=str(password)
        admin['token']=generateToken(generateDictionary(email,password))
        admin["status"]=False
        save_adminDB(adminDB)
    elif user_or_admin(email)==0:
        userDB=get_UserDB()
        user=get_user_ByEmail(email,userDB)
        if user['password']!=current_password:
            abort(403)
            raise AccessError(description='invalid password')
        user['password']=str(password)
        user['token']=generateToken(generateDictionary(email,password))
        user["status"]=False
        save_UserDB(userDB)
    else:
        raise AccessError(description='invalid token')

    return {'email':email}

    
    #automatically log out
    
'''
this function change the password of the user, once it work, the user will automatically log out
input:
    token: str
    name: str
return:
    {'email':email, 'name':name}
'''
def change_name(token, name): # the admin can not change password
    temp=decodeToken(token) # now user is {email: email, password: password}
    email=temp['email']
    name=str(name)
    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')

    if user_or_admin(email)==1:
        adminDB=get_AdminDB()
        admin=get_admin_ByEmail(email,adminDB)
        admin['name']=name
        save_adminDB(adminDB)
    elif user_or_admin(email)==0:
        userDB=get_UserDB()
        user=get_user_ByEmail(email,userDB)
        user['name']=name
        save_UserDB(userDB)
    else:
        abort(403)
        raise AccessError(description='invalid token')

    return {'email':email, 'name':name}
    
