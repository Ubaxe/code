
'''

this function will initial the data, so don't run these code when it not necessary

'''
import pickle
import os

def initial_data():
    productDB = []
    with open('product.p', 'wb') as FILE:
        pickle.dump(productDB, FILE)
    UserDB = []
    with open('users.p', 'wb') as FILE:
        pickle.dump(UserDB, FILE)
    cartDB=[]
    with open('cart.p', 'wb') as FILE:
        pickle.dump(cartDB, FILE)
    productDB=[]
    with open('product.p', 'wb') as FILE:
        pickle.dump(productDB, FILE)
    recordDB=[]
    with open('record.p', 'wb') as FILE:
        pickle.dump(recordDB, FILE)
    



def initial_productDB():
    productDB = []
    with open('product.p', 'wb') as FILE:
        pickle.dump(productDB, FILE)


def initial_UserDB():
    UserDB = []
    with open('users.p', 'wb') as FILE:
        pickle.dump(UserDB, FILE)


def initial_adminDB():
    adminDB = []
    with open('admin.p', 'wb') as FILE:
        pickle.dump(adminDB, FILE)

def initial_recordDB():
    a = []
    with open('record.p', 'wb') as FILE:
        pickle.dump(a, FILE)

def initial_cartDB():
    a = []
    with open('cart.p', 'wb') as FILE:
        pickle.dump(a, FILE)

if __name__ == '__main__':
    # run code here
    pass
    