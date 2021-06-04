import pickle
import os


'''
get userDB from users.p
'''
def get_UserDB():
    UserDB = load_UserDB()
    return UserDB

'''
get productDB from product.p
'''
def get_productDB():
    productDB = load_productDB()
    return productDB

'''
get adminDB from admin.p
'''
def get_AdminDB():
    productDB = load_adminDB()
    return productDB

'''
load userDB from users.p
'''
def load_UserDB():
    if os.path.exists('users.p'):
        try:
            UserDB = pickle.load(open("users.p", "rb"))
            return UserDB
        except EOFError:
            UserDB = []
            with open('users.p', 'wb') as FILE:
                pickle.dump(UserDB, FILE)
            return UserDB
    else:
        return TypeError

'''
load cartDB from cart.p
'''
def load_CartDB():
    if os.path.exists('cart.p'):
        try:
            cartDB = pickle.load(open("cart.p", "rb"))
            return cartDB
        except EOFError:
            cartDB = []
            with open('cart.p', 'wb') as FILE:
                pickle.dump(cartDB, FILE)
            return cartDB
    else:
        return TypeError

'''
load recordDB from record.p
'''
def load_RecordDB():
    if os.path.exists('record.p'):
        try:
            recordDB = pickle.load(open("record.p", "rb"))
            return recordDB
        except EOFError:
            recordDB = []
            with open('record.p', 'wb') as FILE:
                pickle.dump(recordDB, FILE)
            return recordDB
    else:
        return TypeError

'''
load adminDB from admin.p
'''
def load_adminDB():
    if os.path.exists('admin.p'):
        try:
            adminDB = pickle.load(open("admin.p", "rb"))
            return adminDB
        except EOFError:
            adminDB = []
            with open('admin.p', 'wb') as FILE:
                pickle.dump(adminDB, FILE)
            return adminDB
    else:
        return TypeError

'''
load productDB from product.p
'''
def load_productDB():
    if os.path.exists('product.p'):
        try:
            productDB = pickle.load(open("product.p", "rb"))
            return productDB
        except EOFError:
            productDB = []
            with open('product.p', 'wb') as FILE:
                pickle.dump(productDB, FILE)
            return productDB
    else:
        return []


'''
load searchDB from search.p
'''
def load_searchDB():
    if os.path.exists('search.p'):
        try:
            searchDB = pickle.load(open("search.p", "rb"))
            return searchDB
        except EOFError:
            searchDB = []
            with open('search.p', 'wb') as FILE:
                pickle.dump(searchDB, FILE)
            return searchDB
    else:
        return []

'''
load chatDB from chat.p
'''
def load_chatDB():
    if os.path.exists('chat.p'):
        try:
            chatDB = pickle.load(open("chat.p", "rb"))
            return chatDB
        except EOFError:
            chatDB = []
            with open('chat.p', 'wb') as FILE:
                pickle.dump(chatDB, FILE)
            return chatDB
    else:
        return []

'''
save the input list into users.p
'''
def save_UserDB(UserDB):
    with open('users.p', 'wb') as FILE:
        pickle.dump(UserDB, FILE)

'''
save the input list into search.p
'''
def save_searchDB(searchDB):
    with open('search.p', 'wb') as FILE:
        pickle.dump(searchDB, FILE)

'''
save the input list into admin.p
'''
def save_adminDB(adminDB):
    with open('admin.p', 'wb') as FILE:
        pickle.dump(adminDB, FILE)

'''
save the input list into product.p
'''
def save_productDB(productDB):
    with open('product.p', 'wb') as FILE:
        pickle.dump(productDB, FILE)

'''
save the input list into cart.p
'''
def save_cartDB(cartDB):
    with open('cart.p', 'wb') as FILE:
        pickle.dump(cartDB, FILE)

'''
save the input list into record.p
'''
def save_recordDB(recordDB):
    with open('record.p', 'wb') as FILE:
        pickle.dump(recordDB, FILE)

'''
save the input list into chat.p
'''
def save_chatDB(chatDB):
    with open('chat.p', 'wb') as FILE:
        pickle.dump(chatDB, FILE)


    
