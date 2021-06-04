#this is for adjust category

#category.p is a fixed file with the category id and it's corresponding name
import pickle
import os
from Error import *

'''
this function is just a remark function
i will put all the category name and it's corresponding id into category.p
'''
def create_category():
    li=[]
    category0={'id':0, 'name':'electronic'}
    category1={'id':1, 'name':'book'}
    category2={'id':2, 'name':'sport'}
    category3={'id':3, 'name':'clothes'}
    category4={'id':4, 'name':'home'}
    category5={'id':5, 'name':'toy'}
    li.append(category0)
    li.append(category1)
    li.append(category2)
    li.append(category3)
    li.append(category4)
    li.append(category5)
    with open('category.p', 'wb') as FILE:
        pickle.dump(li, FILE)

'''
this function will return all the name of category from database
'''
def all_category():
    category = pickle.load(open("category.p", "rb"))
    return category


'''
this function will get the id of category and translate it to name
input:
    category_id: int
return:
    category: str
'''
def check_category(category_id):
    category = pickle.load(open("category.p", "rb"))
    for i in category:
        if i['id']==category_id:
            return i['name']
    raise AccessError(description='category_id is wrong')

