from check import *
from Error import *
from global_variable import *
from Token import *
from helper import *
from auth_admin import*
import random
from search import *


'''
this function will recommend product which is similiar to specific product, and return specific number of product
input:
    id: int
    number: int
return:
    [product list]
'''
def product_recommendation(id,number):
    productDB=load_productDB()
    number=int(number) 
    product=get_product_ByID(id,productDB)
    tag=product['tag']
    category_id=product['category_id']
    li=[]
    for pro in productDB:
        if pro['category_id']==category_id and pro['id']!=id:
            li.append(pro)

    #now all the product with same category_id is in li
    li2=[]
    for i in li:
        name=i['name'].lower()
        i['name']=name.split()
        dic={'id':i['id'],'score':0}
        li2.append(dic)
    
    for i in li:
        di=get_element(li2,i['id'])
        #check name
        for j in i['name']:
            if j in product['name'].lower():
                di['score']+=5     # same string in their name score +=5
        
        for k in i['tag']:
            if k in product['tag']:
                di['score']+=1

    li2.sort(key=takesecond,reverse=True)
    re=[]
    j=0
    for i in li2:
        p=get_product_ByID(i['id'],load_productDB())
        if p['status']==1:
            re.append(p)
            j+=1
        if j==number:
            break
    return re


'''
this function will recommend product according to the purchase record of the user
input:
    token: str
    number: int
return:
    [product list]
'''
def purchase_record_recommendation(token,number):
    productDB=load_productDB()
    UserDB=get_UserDB()
    recordDB=load_RecordDB()
    productDB=load_productDB()
    searchDB=load_searchDB()
    temp=decodeToken(token)
    number=int(number)
    email=temp['email']
    user=get_user_ByEmail(email, UserDB)

    #----------------------------get rank for search_record
    search=get_search_ByUserID(user['user_id'],searchDB)
    search_word=search['search_record']
    search_score=search_record_score(search_word)

    #----------------------------------get rank for purchase record
    re=[]
    if user_or_admin(email)!=0:  #token is an admin
        return random_recommendation(number)
    else: #token is an user
        record=get_record_ByUserID(user['user_id'],recordDB)
        if record['product']==[] and search_score==[]: #the user did not buy anything
            return random_recommendation(number)
        elif record['product']==[]:
            re=[]
            j=0
            for i in search_score:
                re.append(get_product_ByID(i['id'],load_productDB()))
                j+=1
                if j==number:
                    break
            return re
        else:
            exclude_productDB=[]
            all_id=[]
            purchase_product=[]
            for i in record['product']:
                for j in i['id']:
                    all_id.append(j)
                    purchase_product.append(get_product_ByID(j,productDB))
            for j in productDB:
                if j['id'] not in all_id:
                    exclude_productDB.append(j)

        if exclude_productDB==[]:
            raise AccessError(description='you have already bought all the thing int the website!!!!!!!!!!')
        
        #------------------------------------simialr with the above function--------------------------------
        
        rank=get_rank(purchase_product,exclude_productDB) # this is only the rank for purchase record

        #----------------------------now i add search record
        for dic in search_score:
            check=True
            for ele in rank:
                if dic['id']==ele['id']:
                    ele['score']+=dic['score']
                    check=False
            if check:
                rank.append(dic)  
        rank.sort(key=takesecond,reverse=True)
        re=[]
        j=0
        for i in rank:
            p=get_product_ByID(i['id'],load_productDB())
            if p['status']==1:
                re.append(p)
                j+=1
            if j==number:
                break
        return re

     
        
'''
this function will recommend product according to the purchase record of a product
input:
    id: int
    number: int
return:
    [product list]
'''
def buy_recommendation(id,number):
    productDB=load_productDB()
    number=int(number) 
    product=get_product_ByID(id,productDB)
    purchaseDB=load_RecordDB()
    id_list=[]
    for i in purchaseDB:
        for j in i['product']:
            id_temp=[]
            check=False
            for k in j['id']:
                if k==id:
                    check=True
                id_temp.append(k)
            if check:
                for h in id_temp:
                    if h!=id:
                        id_list.append(h)
    
    score=[]
    for i in id_list:
        check=False
        for j in score:
            if j['id']==i:
                j['score']+=1
                check=True
                break
        if not check:
            score.append({'id':i,'score':1})
    
    score.sort(key=takesecond,reverse=True)

    re=[]
    j=0
    for i in score:
        p=get_product_ByID(i['id'],load_productDB())
        if p['status']==1:
            re.append(p)
            j+=1
        if j==number:
            break
    return re



#----------------------------------------------------------helper funtion---------------------------
                
def get_rank(purchase_product,exclude_productDB):
    rank=[]
    for product in purchase_product:
        category_id=product['category_id']
        li=[]
        for pro in exclude_productDB:
            if pro['category_id']==category_id:
                li.append(pro)
        
        #now all the product with same category_id is in li
        li2=[]
        for i in li:
            name=i['name']
            if type(name)!=list:
                name=name.lower()
                i['name']=name.split()
            dic={'id':i['id'],'score':0}
            li2.append(dic)
        
        for i in li:
            di=get_element(li2,i['id'])
            #check name
            for j in i['name']:
                if j in product['name'].lower():
                    di['score']+=5     # same string in their name score +=5
            
            for k in i['tag']:
                if k in product['tag']:
                    di['score']+=1
        for dic in li2:
            check=True
            for ele in rank:
                if dic['id']==ele['id']:
                    ele['score']+=dic['score']
                    check=False
            if check:
                rank.append(dic)   
    rank.sort(key=takesecond,reverse=True)
    return rank

def search_record_score(search_word):
    productDB=load_productDB()
    li=productDB
    #number=int(number)

    li2=[]
    for i in li:
        name=i['name'].lower()
        i['name']=name.split()
        dic={'id':i['id'],'score':0}
        li2.append(dic)

    for i in li:
        di=get_element(li2,i['id'])
        #check name
        for j in i['name']:
            if j in search_word:
                di['score']+=10     # same string in their name score +=5
        
        for k in i['tag']:
            if k in search_word:
                di['score']+=2

    li2.sort(key=takesecond,reverse=True)
    re=[]
    for i in li2:
        if i['score']!=0:
            re.append(i)
    return re

def random_recommendation(number):
    re=[]
    productDB=load_productDB()
    resultList=random.sample(range(0,len(productDB)),number)
    for i in resultList:
        re.append(get_product_ByID(i,productDB))
    return re
    
def takesecond(ele):
    return ele['score']


    
def get_element(li,id):
    for i in li:
        if i['id']==id:
            return i
    return None
    

    

    