from auth import *
import auth
from user_function import *
from global_variable import *

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


def test_user_login():
    email = "xiaohe@qq.com"
    user_login("xiaohe@qq.com","Liyueying")
    database = load_UserDB()
    for user in database:
        if (user['email'] == email):
            assert(user['status']==True)
            save_UserDB(database)
    return database
    

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
    




