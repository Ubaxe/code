from helper import *
#-----------------------------------------------------------------------------------------------------------------------
#                           run this file, you will see all the data in all the .p document
#--------------------------------------------------------------------------------------------------------------------------




def print_user():
    user=show_all_userDB()
    print("--------------this is user---------------")
    for a in user:
        print()
        print(a)
    print()

def print_product():
    product=show_all_product()
    print("--------------this is product---------------")
    for a in product:
        if a['first_product_img_url']!=None:
            a['first_product_img_url']='have'
        if a['second_product_img_url']!=None:
            a['second_product_img_url']='have'
        print()
        print(a)
    print()

def print_admin():
    admin=show_all_adminDB()
    print("--------------this is admin---------------")
    for a in admin:
        print()
        print(a)
    print()

def print_cart():
    cart=show_all_cart()
    print("--------------this is cart---------------")
    for a in cart:
        print()
        print(a)
    print()

def print_purchase():
    purchase=show_all_purchaseDB()
    print("--------------this is purchase---------------")
    for a in purchase:
        print()
        print(a)
    print()

def print_search():
    search=load_searchDB()
    print("--------------this is search---------------")
    for a in search:
        print()
        print(a)
    print()

if __name__ == '__main__':
    print_admin()
    print_user()
    print_product()
    print_cart()
    print_purchase()
    print_search()
    