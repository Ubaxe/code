from check import *
from Error import *
from global_variable import *
from Token import *
from helper import *
from auth_admin import*

'''
this function return the search result according to the input the search-word
input:
    search_word: str
    min_price: int
    max_price: int
return:
    list of product
'''
def search(search_word,min_price,max_price):
    min_price=int(min_price)
    max_price=int(max_price)

    if max_price<min_price:
        return []

    productDB=load_productDB()
    search_word=str(search_word)
    if search_word=="" or search_word=='':
        r=[]
        for i in productDB:
            if i['price']>=min_price and i['price']<=max_price:
                if i['status']==1:
                    r.append(i)
        return r
    search_word=search_word.lower()
    search_word=search_word.split()
    li=productDB
    #number=int(number)

    li2=[]
    for i in li:
        name=i['name']
        name=name.lower()
        i['name']=name.split()
        dic={'id':i['id'],'score':0}
        li2.append(dic)

    for i in li:
        di=get_element(li2,i['id'])
        #check name
        for j in i['name']:
            if j in search_word:
                di['score']+=5     # same string in their name score +=5
        
        for k in i['tag']:
            if k in search_word:
                di['score']+=1

    li2.sort(key=takesecond,reverse=True)
    re=[]
    #j=0
    for i in li2:
        if i['score']!=0:
            re.append(get_product_ByID(i['id'],load_productDB()))
    temp=[]
    for i in re:
        if i['price']>=min_price and i['price']<=max_price:
            if i['status']==1:
                temp.append(i)
    return temp

'''
this function return the search result according to the input the search-word and store thr search word into search.p
input:
    search_word: str
    min_price: int
    max_price: int
return:
    list of product
'''
def search_with_token(token,search_word,min_price,max_price):
    min_price=int(min_price)
    max_price=int(max_price)
    if max_price<min_price:
        return []

    search_word=str(search_word)
    productDB=load_productDB()
    if search_word=="" or search_word=='':
        r=[]
        for i in productDB:
            if i['price']>=min_price and i['price']<=max_price:
                if i['status']==1:
                    r.append(i)
        return r
    search_word=search_word.lower()
    search_word=search_word.split()
    put_data_into_searchDB(token,search_word)
    
    li=productDB
    #number=int(number)

    li2=[]
    for i in li:
        name=i['name']
        name=name.lower()
        i['name']=name.split()
        dic={'id':i['id'],'score':0}
        li2.append(dic)

    for i in li:
        di=get_element(li2,i['id'])
        #check name
        for j in i['name']:
            if j in search_word:
                di['score']+=5     # same string in their name score +=5
        
        for k in i['tag']:
            if k in search_word:
                di['score']+=1

    li2.sort(key=takesecond,reverse=True)
    re=[]
    #j=0
    for i in li2:
        if i['score']!=0:
            re.append(get_product_ByID(i['id'],load_productDB()))
    temp=[]
    for i in re:
        if i['price']>=min_price and i['price']<=max_price:
            if i['status']==1:
                temp.append(i)
    return temp



#----------------------------------------------------------helper function------------------------------------------------

def get_element(li,id):
    for i in li:
        if i['id']==id:
            return i
    return None

    
def takesecond(ele):
    return ele['score']

def put_data_into_searchDB(token, word):
    searchDB=load_searchDB()
    UserDB=get_UserDB()
    temp=decodeToken(token)
    email=temp['email']
    user=get_user_ByEmail(email, UserDB)
    for i in searchDB:
        if i['user_id']==user['user_id']:
            break
    for w in word:
        i['search_record'].insert(0,w)
    if len(i['search_record'])<=6:
        save_searchDB(searchDB)
    else:
        l=[]
        for j in range(0,6):
            l.append(i['search_record'][j])
        i['search_record']=l
        save_searchDB(searchDB)

