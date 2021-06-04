from helper import *
from product import *
import pytest

def test_change_detail():
    adminDB = load_adminDB()
    token=adminDB[0]['token']
    product = chang_detail(token,3,'changeeeeedetailllllll')
    print(product)
    assert(product['detail'] == 'changeeeeedetailllllll')
    reset = chang_detail(token,3,'6.1-inch Super Retina XDR display* Ceramic Shield, tougher than any smartphone glass 5G for superfast downloads and high-quality streaming*')
    print(reset)


def test_add_tag():
    adminDB = load_adminDB()
    token=adminDB[0]['token']
    product = add_tag(token,1,'expensive')
    print(product)
    assert(product['tag'][-1]=='expensive')


def test_split():
    before = 'hello world'
    print(before.split())


def test_change_tag():
    adminDB = load_adminDB()
    token=adminDB[0]['token']
    product = change_tag(token, 3, 'space_grey iphone12 128G apple')
    #print(product)
    assert(len(product['tag'])==4)


def test_change_status():
    adminDB = load_adminDB()
    token=adminDB[0]['token']
    product = change_status(token, 3, 0)
    assert(product['status']==0)

def test_change_stock():
    adminDB = load_adminDB()
    token=adminDB[0]['token']
    product = change_stock(token, 3, 624)
    assert(product['stock']==624)

def test_change_price():
    adminDB = load_adminDB()
    token=adminDB[0]['token']
    product = change_price(token, 3, 1999)
    assert(product['price']==1999)



def test_invalid_category():
    adminDB = load_adminDB()
    token=adminDB[0]['token']
    with pytest.raises(AccessError):
        get_by_category(token,'ajdieubf')


if __name__ == '__main__':
   #print(show_all_product())
   print(show_all_adminDB())
   test_change_detail()
   test_add_tag()
   test_split()
   test_change_tag()
   test_invalid_category()