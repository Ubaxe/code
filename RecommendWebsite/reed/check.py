from global_variable import *
from Error import *
from helper import *

'''
this function check whether the format of input email address is valid
input:
    email: str
return:
    True/False
'''
def valid_email(email):
    if type(email) != str:
        return False
    atIndex = 0
    isAt = False
    # check until '@' in email
    for character in email:
        if character == '@':
            isAt = True
            break
        atIndex = atIndex + 1
    if not isAt:
        return False
    return True

'''
this function check whether the email is already register
input:
    email: str
return:
    True/False
'''
def not_exist_email(email):
    database = load_UserDB()
    #print(database)
    for user in database:
        if user['email'] == email:
            return False
    return True

'''
this function check whether the email is already register
input:
    email: str
return:
    True/False
'''
def not_exist_email_admin(email):
    database = load_adminDB()
    #print(database)
    for user in database:
        if user['email'] == email:
            return False
    return True
def isLoggedin(email):
    if user_or_admin(email)==1:
        database = load_adminDB()
    elif user_or_admin(email)==0:
        database = load_UserDB()
    else:
        raise AccessError(description='invalid email')
        
    for a in database:
        if a['email'] == email:
            return a['status']
    


'''
this function check whether the password is right
input:
    database: .p document
    email: str
    password: int
return:
    True/False
'''
def valid_password(database, email, password):
    for user in database:
        if user['email'] == email:
            if user['password'] == password:
                return True
            else:
                return False
