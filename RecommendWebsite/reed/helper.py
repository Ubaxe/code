from global_variable import *
from Error import *

'''
this function return user information from userDB by their email
input:
    email: str
    UserDB: users.p
return:
    dictionary of user
'''
def get_user_ByEmail(email,UserDB):
    for user in UserDB:
        if user['email'] == email:
            return user
    raise AccessError(description='invalid email')

'''
this function return user information from userDB by their user_id
input:
    user_id: str
    UserDB: users.p
return:
    dictionary of user
'''
def get_user_ById(user_id,UserDB):
    for user in UserDB:
        if user['user_id'] == user_id:
            return user
    raise AccessError(description='invalid user_id')


'''
this function return admin information from adminDB by their email
input:
    email: str
    adminDB: admin.p
return:
    dictionary of admin
'''
def get_admin_ByEmail(email,adminDB):
    for admin in adminDB:
        if admin['email'] == email:
            return admin
    raise AccessError(description='invalid email')

'''
this function return product information from productDB by their id
input:
    email: str
    productDB: product.p
return:
    dictionary of product
'''
def get_product_ByID(id,productDB):
    for pro in productDB:
        if pro['id']==id:
            return pro
    raise AccessError(description='invalid id')

'''
this function return cart information from cartDB for a user
input:
    user_id: str
    cartDB: cart.p
return:
    dictionary of cart
'''
def get_cart_ByUserID(user_id, cartDB):
    for cart in cartDB:
        if cart['user_id']==user_id:
            return cart
    raise AccessError(description='invalid id')

'''
this function return purchase record information from recordDB for a user
input:
    user_id: str
    recordDB: record.p
return:
    dictionary of purchase record
'''
def get_record_ByUserID(user_id, recordDB):
    for record in recordDB:
        if record['user_id']==user_id:
            return record
    raise AccessError(description='invalid id')


'''
this function return search record from searchDB for a user
input:
    user_id: str
    searchDB: search.p
return:
    dictionary of search record
'''
def get_search_ByUserID(user_id, searchDB):
    for search in searchDB:
        if search['user_id']==user_id:
            return search
    raise AccessError(description='invalid id')


'''
a simple function that according to the email to check whether this is an admin or a user
'''
def user_or_admin(email): #return 0 if this is user, return 1 if this is admin, return -1 elese
    adminDB = get_AdminDB()
    UserDB = get_UserDB()
    for admin in adminDB:
        if admin['email'] == email:
            return 1
    for user in UserDB:
        if user['email'] == email:
            return 0

    return -1

def show_all_product():
    productDB=get_productDB()
    return productDB

def show_all_cart():
    cartDB=load_CartDB()
    return cartDB

def show_all_userDB():
    userDB=load_UserDB()
    return userDB

def show_all_adminDB():
    adminDB=load_adminDB()
    return adminDB

def show_all_purchaseDB():
    purchaseDB=load_RecordDB()
    return purchaseDB


    