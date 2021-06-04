from check import *
from Error import *
from global_variable import *
from flask import Flask, abort, Response, make_response,jsonify
from Token import *
from helper import *
import base64
import datetime
from auth_admin import*

'''
this function add product into productDB
input:
    token: str
    category_id: int
    name: str
    detail: str
    price: int
    stock: int
    tag: int
    first_p: str
    second_: str
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def add_product(token, category_id, name, detail, price, stock, tag, first_p, second_p):# name is always lower letter
    adminDB=get_AdminDB()
    productDB=get_productDB()
    if type(category_id)!=int:
        abort(421)
        raise AccessError(description='you need input category_id')
    if name=='':
        abort(422)
        raise AccessError(description='you need input name')
    if detail=='':
        abort(423)
        raise AccessError(description='you need input detail')
    if price=='':
        abort(424)
        raise AccessError(description='you need input price')
    if stock=='':
        abort(425)
        raise AccessError(description='you need input stock')
    if tag=='':
        abort(426)
        raise AccessError(description='you need input tag')
    if first_p=='':
        url='photo/'+'default'+'.png'
        if os.path.exists(url):
            base_64=change_iml_to_base64(url)
            base_64='data:image/png;base64,'+str(base_64)
            first_p=str(base_64)
    else:
        first_p=str(first_p)
    if second_p=='':
        url='photo/'+'default'+'.png'
        if os.path.exists(url):
            base_64=change_iml_to_base64(url)
            base_64='data:image/png;base64,'+str(base_64)
            second_p=str(base_64)
    else:
        second_p=str(second_p)
    category_id=int(category_id)
    name=str(name)
    detail=str(detail)
    price=int(price)
    stock=int(stock)
    tag=str(tag)
    temp=decodeToken(token)
    email= temp['email']
    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')

    if isLoggedin(email)==False:
        abort(403)
        raise AccessError(description='you need to log in')

    
    admin=get_admin_ByEmail(email,adminDB)
    id=len(productDB)
    admin_id=admin['admin_id']
    create_time=datetime.datetime.now()
    create_time=create_time.strftime("%Y-%m-%d %H:%M:%S")
    status=1
    detial=detail.lower()
    name=name.capitalize()
    tag=tag.lower()
    tag=tag.split() # split "black cloth dress" into ['black', 'cloth', 'dress']

    p={'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
    productDB.append(p)
    save_productDB(productDB)
    return p


'''
delete product from productDB
input:
    token: str
    id: int
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def delete_product(token,id):
    adminDB=get_AdminDB()
    productDB=get_productDB()
    temp=decodeToken(token)
    email= temp['email']
    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to delete product')
    if isLoggedin(email)==False:
        abort(403)
        raise AccessError(description='you need to log in')
    product=get_product_ByID(id,productDB)
    admin=get_admin_ByEmail(email,adminDB)
    if product['admin_id']!=admin['admin_id']:
        abort(403)
        raise AccessError(description='you are not the admin for this product')
    product['status']=0
    save_productDB(productDB)
    return product


'''
update product from productDB
input:
    token: str
    category_id: int
    name: str
    detail: str
    price: int
    stock: int
    tag: int
    first_p: str
    second_: str
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def update_information(token, id, category_id, name, detail, price, stock, tag, first_p, second_p):
    adminDB=get_AdminDB()
    productDB=get_productDB()
    if type(category_id)!=int:
        abort(420)
        raise AccessError(description='you need input category_id')
    if name=='':
        abort(420)
        raise AccessError(description='you need input name')
    if detail=='':
        abort(420)
        raise AccessError(description='you need input detail')
    if price=='':
        abort(420)
        raise AccessError(description='you need input price')
    if stock=='':
        abort(420)
        raise AccessError(description='you need input stock')
    if tag=='':
        abort(420)
        raise AccessError(description='you need input tag')
    if first_p=='':
        url='photo/'+'default'+'.png'
        if os.path.exists(url):
            base_64=change_iml_to_base64(url)
            base_64='data:image/png;base64,'+str(base_64)
            first_p=str(base_64)
    else:
        first_p=str(first_p)
    if second_p=='':
        url='photo/'+'default'+'.png'
        if os.path.exists(url):
            base_64=change_iml_to_base64(url)
            base_64='data:image/png;base64,'+str(base_64)
            second_p=str(base_64)
    else:
        second_p=str(second_p)
    category_id=int(category_id)
    name=str(name)
    detail=str(detail)
    price=int(price)
    stock=int(stock)
    tag=str(tag)
    temp=decodeToken(token)
    email= temp['email']
    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')

    if isLoggedin(email)==False:
        abort(403)
        raise AccessError(description='you need to log in')

    
    admin=get_admin_ByEmail(email,adminDB)
    status=1
    detial=detail.lower()
    name=name.capitalize()
    tag=tag.lower()
    tag=tag.split() # split "black cloth dress" into ['black', 'cloth', 'dress']
    product=get_product_ByID(id,productDB)
    admin_id=product['admin_id']
    product['id']=id
    product['category_id']=category_id
    product['admin_id']=admin_id
    product['name']=name
    product['detail']=detail
    product['tag']=tag
    product['first_product_img_url']=first_p
    product['second_product_img_url']=second_p
    product['price']=price
    product['stock']=stock
    product['status']=status
    #product={'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':product['create_time']}
    save_productDB(productDB)
    return product


'''
update detail of a product
input:
    token: str
    id: int
    detail: str
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def chang_detail(token, id, detail):
    adminDB=get_AdminDB()
    productDB=get_productDB()
    temp=decodeToken(token)
    detail=str(detail)
    email=temp['email']

    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')

    if isLoggedin(email)==False:
        abort(403)
        raise AccessError(description='you need to log in')
    
    admin=get_admin_ByEmail(email,adminDB)
    product=get_product_ByID(id,productDB)

    if product['admin_id']!=admin['admin_id']:
        abort(403)
        raise AccessError(description='you are not the admin for this product')

    product['detail']=detail
    save_productDB(productDB)
    return product

'''
update tag of a product
input:
    token: str
    id: int
    tag: str
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def add_tag(token, id, tag):
    adminDB=get_AdminDB()
    tag=str(tag)
    productDB=get_productDB()
    temp=decodeToken(token)
    email=temp['email']

    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')

    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')
    admin=get_admin_ByEmail(email,adminDB)
    product=get_product_ByID(id,productDB)

    if product['admin_id']!=admin['admin_id']:
        abort(403)
        raise AccessError(description='you are not the admin for this product')
    tag=tag.lower()
    tag=tag.split()

    for s in tag:
        product['tag'].append(s)
    
    save_productDB(productDB)
    return product


'''
change tag of a product
input:
    token: str
    id: int
    tag: str
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def change_tag(token, id, tag): # change all the tag 
    tag=str(tag)
    adminDB=get_AdminDB()
    productDB=get_productDB()
    temp=decodeToken(token)
    email=temp['email']

    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')

    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')
    admin=get_admin_ByEmail(email,adminDB)
    product=get_product_ByID(id,productDB)

    if product['admin_id']!=admin['admin_id']:
        abort(403)
        raise AccessError(description='you are not the admin for this product')
    tag=tag.lower()
    tag=tag.split()

    product['tag']=tag
    
    save_productDB(productDB)
    return product

'''
change status of a product
input:
    token: str
    id: int
    status: int
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def change_status(token, id, status): # change all the tag  1 for sale 0 for not
    adminDB=get_AdminDB()
    status=int(status)
    productDB=get_productDB()
    temp=decodeToken(token)
    email=temp['email']


    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')

    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')
    admin=get_admin_ByEmail(email,adminDB)
    product=get_product_ByID(id,productDB)

    if product['admin_id']!=admin['admin_id']:
        abort(403)
        raise AccessError(description='you are not the admin for this product')

    product['status']=status
    
    save_productDB(productDB)
    return product


'''
change stock of a product
input:
    token: str
    id: int
    stock: int
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def change_stock(token, id, stock): # change all the tag  1 for sale 0 for not
    stock=int(stock)
    adminDB=get_AdminDB()
    productDB=get_productDB()
    temp=decodeToken(token)
    email=temp['email']

    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')

    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')
    admin=get_admin_ByEmail(email,adminDB)
    product=get_product_ByID(id,productDB)

    if product['admin_id']!=admin['admin_id']:
        abort(403)
        raise AccessError(description='you are not the admin for this product')

    product['stock']=stock
    
    save_productDB(productDB)
    return product
    
'''
change price of a product
input:
    token: str
    id: int
    price: int
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def change_price(token, id, price): # change all the tag  1 for sale 0 for not
    price=int(price)
    adminDB=get_AdminDB()
    productDB=get_productDB()
    temp=decodeToken(token)
    email=temp['email']

    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in') 

    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')
    admin=get_admin_ByEmail(email,adminDB)
    product=get_product_ByID(id,productDB)

    if product['admin_id']!=admin['admin_id']:
        abort(403)
        raise AccessError(description='you are not the admin for this product')

    product['price']=price
    
    save_productDB(productDB)
    return product


'''
change first photo of a product
input:
    token: str
    id: int
    base_64: str
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def update_first_photo(token, id,base_64):
    adminDB=get_AdminDB()
    productDB=get_productDB()
    temp=decodeToken(token)
    email=temp['email']

    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')

    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')
    admin=get_admin_ByEmail(email,adminDB)
    product=get_product_ByID(id,productDB)
    if product['admin_id']!=admin['admin_id']:
        abort(403)
        raise AccessError(description='you are not the admin for this product')
    product["first_product_img_url"]=str(base_64)
    save_productDB(productDB)
    return product


'''
change second photo of a product
input:
    token: str
    id: int
    base_64: str
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def update_second_photo(token, id,base_64):
    adminDB=get_AdminDB()
    productDB=get_productDB()
    temp=decodeToken(token)
    email=temp['email']

    if not isLoggedin(email):#not logged in
        abort(403)
        raise AccessError(description='not logged in')

    if user_or_admin(email)!=1:
        abort(403)
        raise AccessError(description='you need be an admin to add product')
    admin=get_admin_ByEmail(email,adminDB)
    product=get_product_ByID(id,productDB)

    if product['admin_id']!=admin['admin_id']:
        abort(403)
        raise AccessError(description='you are not the admin for this product')
    product["second_product_img_url"]=str(base_64)
    save_productDB(productDB)
    return product

'''
get product by their id
input:
    id: int
return:
    {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time}
'''
def get_one_product(id):
    productDB=get_productDB()
    product=get_product_ByID(id,productDB)
    return product

'''
get product by their category
input:
    category: str
return:
    [ {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time} ]
'''
def get_by_category(category):
    productDB=get_productDB()

    l=[]
    if category=='all':
        l= productDB
    elif category=='electronic':
        for a in productDB:
            if a['category_id']==0:
                l.append(a)
    elif category=='book':
        for a in productDB:
            if a['category_id']==1:
                l.append(a)
    elif category=='sport':
        for a in productDB:
            if a['category_id']==2:
                l.append(a)
    elif category=='clothes':
        for a in productDB:
            if a['category_id']==3:
                l.append(a)
    elif category=='home':
        for a in productDB:
            if a['category_id']==4:
                l.append(a)
    elif category=='toy':
        for a in productDB:
            if a['category_id']==5:
                l.append(a)
    else:
        abort(403)
        raise AccessError(description='invalid name')
    re=[]
    for i in l:
        if i['status']==1:
            re.append(i)
    return re

'''
get product by their category and page number
input:
    category: str
    page: int
return:
    [ {'id':id, 'category_id':category_id, 'admin_id':admin_id, 'name':name, 'detail': detail, 'tag':tag, "first_product_img_url": first_p, "second_product_img_url": second_p, 'price':price, 'stock':stock, 'status':status, 'create_time':create_time} ]
'''
def get_by_category_pages(category,page): # page>=1
    productDB=get_productDB()

    l=[]
    if category=='all':
        l=productDB
    elif category=='electronic':
        for a in productDB:
            if a['category_id']==0:
                l.append(a)
        
    elif category=='book':
        for a in productDB:
            if a['category_id']==1:
                l.append(a)
        
    elif category=='sport':
        for a in productDB:
            if a['category_id']==2:
                l.append(a)
        
    elif category=='clothes':
        for a in productDB:
            if a['category_id']==3:
                l.append(a)
        
    elif category=='home':
        for a in productDB:
            if a['category_id']==4:
                l.append(a)
        
    elif category=='toy':
        for a in productDB:
            if a['category_id']==5:
                l.append(a)   
    else:
        abort(403)
        raise AccessError(description='invalid name')
    
    start=(page-1)*12
    end=page*12-1
    if len(l)<=start:
        abort(600)
        raise AccessError(description='wrong page number')
    else:
        i=start
        l2=[]
        while(i<=end or  i<=len(l)-1):
            l2.append(l[i])
            i+=1
        return l2


'''
get product number by their category 
input:
    category: str
    page: int
return:
    number
'''
def get_number_by_category(category):
    productDB=get_productDB()

    l=[]
    if category=='all':
        return len(productDB)
    elif category=='electronic':
        for a in productDB:
            if a['category_id']==0:
                l.append(a)
        return len(l)
    elif category=='book':
        for a in productDB:
            if a['category_id']==1:
                l.append(a)
        return len(l)
    elif category=='sport':
        for a in productDB:
            if a['category_id']==2:
                l.append(a)
        return len(l)
    elif category=='clothes':
        for a in productDB:
            if a['category_id']==3:
                l.append(a)
        return len(l)
    elif category=='home':
        for a in productDB:
            if a['category_id']==4:
                l.append(a)
        return len(l)
    elif category=='toy':
        for a in productDB:
            if a['category_id']==5:
                l.append(a)
        return len(l)
    else:
        abort(403)
        raise AccessError(description='invalid name')

'''
helper function which translate the img to base_64type
'''
def change_iml_to_base64(url):
    f=open(url,'rb')
    ls_f=base64.b64encode(f.read())
    ls_f = ls_f.decode("utf-8")
    f.close()
    return ls_f

    





