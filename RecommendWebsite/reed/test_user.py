from auth import *
import auth
from user_function import *
from global_variable import *
import pytest
from auth_admin import *

def test_auth_register():
    email = "xiaohe@qq.com"
    database = load_UserDB()
    #print(database)
    for user in database:
        if (user['email'] == email):
            database.remove(user)
            save_UserDB(database)
    user_register("xiaohe@qq.com", "Liyueying", "Yueying")
    UserDB = load_UserDB()
    #print(UserDB)
    assert(UserDB[-1]["name"]=="Yueying")
    return UserDB


def test_invalid_register():
    with pytest.raises(ValueError):
        user_register("xiaohe@qq.com", "Liyueying", "Yueying")



def test_user_login():
    email = "xiaohe@qq.com"
    user_login("xiaohe@qq.com","Liyueying")
    database = load_UserDB()
    for user in database:
        if (user['email'] == email):
            assert(user['status']==True)
            save_UserDB(database)
    return database

def test_password_wrong():
    with pytest.raises(AccessError):
         user_login("xiaohe@qq.com","edvfeafra")
    
def test_not_login():
    with pytest.raises(AccessError):
         user_logout("xiaohe@qq.com")


def test_user_logout():
    database = load_UserDB()
    dic = user_login("xiaohe@qq.com","Liyueying")
    user_logout(dic["token"])
    user = decodeToken(dic["token"])
    database = load_UserDB()
    user = get_user_ByEmail(user["email"],database)
    print(user["status"])
    assert(user["status"]==False)
    return database
    
def test_change_password():
    token = user_login("xiaohe@qq.com","Liyueying")
    user = get_user_ByEmail("xiaohe@qq.com",load_UserDB())
    print(user["status"])
    change_password(token["token"],"ASDFghj")
    user=get_user_ByEmail("xiaohe@qq.com",load_UserDB())
    assert(user["password"]== "ASDFghj")




def test_change_name():
    token = user_login("xiaohe@qq.com","ASDFghj")
    user = get_user_ByEmail("xiaohe@qq.com",load_UserDB())
    change_name(token["token"],"DT")
    user = get_user_ByEmail("xiaohe@qq.com",load_UserDB())
    assert(user["name"]=="DT")


def test_change_name_error():
    token = "auduywabaijakrueif"
    with pytest.raises(AccessError):
         change_name(token,"Queen")


'''following tests are for admin functions"
'''

def test_admin():
    email = "xiaoli@qq.com"
    database = initial_adminDB()
    #print(database)
    if(database != None):
        for admin in database:
            if (admin['email'] == email):
                database.remove(admin)
                save_adminDB(database)
    #print(database)
    admin_add("xiaoli@qq.com", "Captain_teemo", "Yueying")
    database = load_adminDB()
    #print(database)
    return database

def test_admin_login():
    email = "xiaoli@qq.com"
    database = get_AdminDB()
    admin_login(email,"Captain_teemo")
    database = load_adminDB()
    print(database)
    for admin in database:
        if (admin['email'] == email):
            assert(admin["status"]==True)
            #save_adminDB(database)
    return database