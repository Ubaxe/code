from purchase import *
import pytest
from cart import *



def test_add():
    email = "z5212833@ad.unsw.edu.au"
    UserDB = load_UserDB()
    dic = user_login('z5212833@ad.unsw.edu.au','123')
    user= get_user_ByEmail(email,UserDB)
    ID = user['user_id']
    token = dic['token']
    result = add_product_to_cart(token,5)
    print(result)
    cartDB = load_CartDB()
    cart=get_cart_ByUserID(user['user_id'],cartDB)
    print(cart)
    assert(len(cart['product'])==1)
    remove_product_from_cart(token,5)

def test_purchase():
    email = "z5212833@ad.unsw.edu.au"
    UserDB = load_UserDB()
    user= get_user_ByEmail(email,UserDB)
    user_id = user['user_id']
    token = user['token']
    result = add_product_to_cart(token,3)
    purchase_product(token)
    cartDB = load_CartDB()
    cart=get_cart_ByUserID(user['user_id'],cartDB)
    assert(len(cart['product'])==0)

#def test_review():
if __name__ == '__main__':
    test_add()
    test_purchase()