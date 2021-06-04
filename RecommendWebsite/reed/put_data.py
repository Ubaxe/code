import pickle
import os
from Error import *
from auth import *
from auth_admin import *
from product import *
from check import *
import base64
import random
from cart import *
#---------------------------------------------------------------------------------------------------------------------------
#                                       if you run this file all the data will be intialled
#---------------------------------------------------------------------------------------------------------------------


def initial():
    data=[]
    save_adminDB(data)
    save_cartDB(data)
    save_chatDB(data)
    save_productDB(data)
    save_recordDB(data)
    save_searchDB(data)
    save_UserDB(data)

#    if you run this function, the userDB will refresh, and will only contain the following data 
def put_data_into_user():
    #refresh userDB to []
    data=[]
    save_UserDB(data)

    #add data
    reed=user_register('z5221388@ad.unsw.edu.au',123,'reed')["token"]
    alex=user_register('z5190777@ad.unsw.edu.au',123,'alex')["token"]
    leslie=user_register('z5212833@ad.unsw.edu.au',123,'leslie')["token"]
    dylan=user_register('z5157999@ad.unsw.edu.au',123,'dylan')["token"]
    tony=user_register('z5238695@ad.unsw.edu.au',123,'tony')["token"]
    robot=user_register('z5555555@ad.unsw.edu.au',123,'robot')["token"]
    user_logout(reed)
    user_logout(alex)
    user_logout(leslie)
    user_logout(dylan)
    user_logout(tony)
    user_logout(robot)
    print("Put data into user finish")


#   if you run this function, the userDB will refresh, and will only contain the following data 
def put_data_into_admin():
    #refresh adminDB to []
    data=[]
    save_adminDB(data)

    #add data
    admin=admin_add('5hd@ad.unsw.edu.au',123,'5hd')
    print("Put data into admin finish")

def put_data_into_product():
    #refresh productDB to []
    data=[]
    save_productDB(data)

    adminDB=load_adminDB()
    
    if isLoggedin(adminDB[0]['email'])!=1:
        admin_login(adminDB[0]['email'], 123)

    token=adminDB[0]['token']
    
    '''
    the following is for category 0, electronic add_product(token, category_id, name, detail, price, stock, tag)
    '''
    #phone
    add_product(token,0,'Apple iPhone 12 128GB (Black)', '6.1-inch Super Retina XDR display* Ceramic Shield, tougher than any smartphone glass 5G for superfast downloads and high-quality streaming*',1429, 10, 'black iphone12 128G','','')
    add_product(token,0,'Apple iPhone 12 128GB (Blue)', '6.1-inch Super Retina XDR display* Ceramic Shield, tougher than any smartphone glass 5G for superfast downloads and high-quality streaming*',1429, 10, 'blue iphone12 128G','','')
    add_product(token,0,'Apple iPhone 12 128GB (Green)', '6.1-inch Super Retina XDR display* Ceramic Shield, tougher than any smartphone glass 5G for superfast downloads and high-quality streaming*',1429, 10, 'green iphone12 128G','','')
    add_product(token,0,'Apple iPhone 12 128GB (White)', '6.1-inch Super Retina XDR display* Ceramic Shield, tougher than any smartphone glass 5G for superfast downloads and high-quality streaming*',1429, 10, 'white iphone12 128G','','')

    #switch
    add_product(token,0,'Nintendo Switch Console Neon', 'Buy the Nintendo Switch Neon Console online today and experience a full home video game console experience anytime, anywhere!',399, 10, 'red blue switch','','')
    add_product(token,0,'Nintendo Switch Console Mario Red & Blue Edition', 'Nintendo Switch – Mario Red & Blue Edition, with a distinct red-and-blue colour scheme in honour of Mario’s iconic outfit.',449, 10, 'Mario Red Blue Edition switch','','')
    add_product(token,0,'Nintendo Switch Console Grey', 'Buy the Nintendo Switch Grey Console online today and experience a full home video game console experience anytime, anywhere!',399, 10, 'gray switch','','')

    #macbook
    add_product(token,0,'Apple MacBook Air 13-inch Space Grey', 'Apple-designed M1 chip for a giant leap in CPU, GPU and machine learning performance Go longer than ever with up to 18 hours of battery life* 8-core CPU delivers up to 3.5x faster performance, to tackle projects faster than ever*',1599, 10, 'laptop macbook air space gray','','')
    add_product(token,0,'Apple MacBook Pro 13-inch Space Grey', 'Apple-designed M1 chip for a giant leap in CPU, GPU and machine learning performance Go longer than ever with up to 18 hours of battery life* 8-core CPU delivers up to 3.5x faster performance, to tackle projects faster than ever*',1999, 10, 'laptop macbook pro space gray','','')
    add_product(token,0,'Apple MacBook Air 13-inch Silver', 'Apple-designed M1 chip for a giant leap in CPU, GPU and machine learning performance Go longer than ever with up to 18 hours of battery life* 8-core CPU delivers up to 3.5x faster performance, to tackle projects faster than ever*',1999, 10, 'laptop macbook air silver','','')

    '''
    the following is for category 1, book
    '''
    add_product(token,1,'hunger game 1', 'a famous book which talk about the adventure of a girl',50, 100, 'science adventure youth fiction','','')
    add_product(token,1,'hunger game 2', 'a famous book which talk about the adventure of a girl',50, 100, 'science adventure youth fiction','','')
    add_product(token,1,'hunger game 3', 'a famous book which talk about the adventure of a girl',50, 100, 'science adventure youth fiction','','')

    add_product(token,1,'Harry Potter 1', 'a story about magic world',80, 100, 'magic adventure youth fiction','','')
    add_product(token,1,'Harry Potter 2', 'a story about magic world',80, 100, 'magic adventure youth fiction','','')
    add_product(token,1,'Harry Potter 3', 'a story about magic world',80, 100, 'magic adventure youth fiction','','')

    add_product(token,1,'Hobbits 1', 'The story narrated a sorcerer leads the story which 13 dwarves and east a Huo bit person treasurees hunt',69, 100, 'magic war fiction','','')
    add_product(token,1,'Hobbits 2', 'The story narrated a sorcerer leads the story which 13 dwarves and east a Huo bit person treasurees hunt',69, 100, 'magic war fiction','','')
    
    add_product(token,1,'Romeo and Juliet', 'a story about love',80, 100, 'love romantic youth fiction','','')
    add_product(token,1,'Jane Eyre', 'Jane Eyre ranks as one of the greatest and most perennially popular works of English fiction',85, 100, 'love realism fiction','','')

    
    '''
    the following is for category 2, sport
    '''
    add_product(token,2,'air jordan 34', 'a shoes which is belong to nike, air jordan series', 1200, 30, 'shoes nike AJ','','')
    add_product(token,2,'air jordan 1', 'a shoes which is belong to nike, air jordan series', 1100, 30, 'shoes nike AJ','','')
    add_product(token,2,'air jordan 32', 'a shoes which is belong to nike, air jordan series', 800, 30, 'shoes nike AJ','','')
    add_product(token,2,'air jordan 4', 'a shoes which is belong to nike, air jordan series', 500, 30, 'shoes nike AJ','','')

    add_product(token,2,'baseball cap', 'a cap for baseball', 40, 30, 'baseball cap','','')
    add_product(token,2,'baseball bat', 'a bat for baseball', 80, 30, 'baseball bat','','')

    add_product(token,2,'hair band', 'band for sport', 70, 30, 'nike band','','')
    add_product(token,2,'tennis racket', 'racket for tennis', 76, 30, 'tennis racket','','')
    add_product(token,2,'tennis shoes', 'shoes for tennis', 60, 30, 'tennis shoes','','')
    add_product(token,2,'badminton racket', 'racket for badminton', 90, 30, 'badminton racket','','')



    '''
    the following is for category 3, clothes
    '''
    add_product(token,3,'Balenciaga T shirt', 'a white extravagant t-shirt', 5000, 30, 'Balenciaga T-shirt black','','' )
    add_product(token,3,'Balenciaga sweater', 'a black sweater', 5200, 30, 'Balenciaga sweater black','','' )


    add_product(token,3,'lv fleece', 'a white fleece', 4000, 30, 'lv fleece white','','' )
    add_product(token,3,'lv trousers', 'a white trousers', 3400, 30, 'lv trousers','','' )

    add_product(token,3,'burberry fleece', 'a brown fleece', 8000, 30, 'burberry fleece brown','','' )
    add_product(token,3,'burberry shirt', 'a blue shirt', 3400, 30, 'burberry blue shirt','','')

    add_product(token,3,'gucci sweater', 'a blue sweater', 9100, 30, 'gucci sweater','','')
    add_product(token,3,'gucci jeans', 'a blue jeans', 9100, 30, 'gucci jeans','','')

    add_product(token,3,'nike shorts', 'a black shorts', 900, 30, 'nike shorts','','')
    add_product(token,3,'nike shirt', 'a black shirt', 900, 30, 'nike shirt','','')
    
    '''
    the following is for category 4, home
    '''
    add_product(token,4,'desk', 'a normal desk fro working', 323, 30, 'black medium desk','','' )
    add_product(token,4,'table', 'a normal table for chatting', 360, 30, 'white medium table','','' )
    add_product(token,4,'chair', 'a normal chair', 400, 30, 'chair','','' )
    add_product(token,4,'cabinet', 'a normal cabinet for storing', 500, 30, 'black cabinet','','' )
    add_product(token,4,'sofa', 'a sofa', 3000, 30, 'sofa','','' )
    add_product(token,4,'table lamp', 'a table lamp', 200, 30, 'table lamp','','' )
    add_product(token,4,'refrigerator ', 'a refrigerator ', 700, 30, 'refrigerator','','' )
    add_product(token,4,'quilt', 'a quilt', 300, 30, 'quilt','','' )
    add_product(token,4,'pillow', 'a pillow', 7000, 30, 'pillow','','' )
    add_product(token,4,'washing machine', 'a washing machine', 600, 30, 'washing machine','','' )

    '''
    the following is for category 5, toy
    '''
    add_product(token,5,'LEGO JEEP', 'a model for JEEP', 3000, 30, 'model splicing car','','' )
    add_product(token,5,'LEGO benz', 'a model for benz', 3300, 30, 'model splicing car','','' )
    add_product(token,5,'LEGO ship', 'a model for ship', 2000, 30, 'model splicing ship','','' )

    add_product(token,5,'telecontrolled car', 'a telecontrolled car', 5000, 30, 'telecontrolled car','','' )
    add_product(token,5,'telecontrolled plane', 'a telecontrolled plane', 5500, 30, 'telecontrolled plane','','' )
    add_product(token,5,'telecontrolled ship', 'a telecontrolled ship', 4000, 30, 'telecontrolled ship','','' )


    add_product(token,5,'plush toy', 'plush toy', 4000, 30, 'plush toy','','' )
    add_product(token,5,'sliding plate', 'a sliding plate', 4000, 30, 'sliding plate','','' )
    add_product(token,5,'female barbie doll ', 'a female barbie doll', 4000, 30, 'female barbie doll','','' )
    add_product(token,5,'male barbie doll ', 'a male barbie doll', 4000, 30, 'male barbie doll','','' )

    # id here start with 60, take care when you give name to the photo

    '''
    the following is for category 0, electronic add_product(token, category_id, name, detail, price, stock, tag)
    '''
    add_product(token,0,'Samsung Galaxy 20', 'The 4500mAh (typical) battery gives your phone the juice it needs to outlast your day and power for when you really need it',12499, 30,'samsung phone','','')
    add_product(token,0,'Samsung Galaxy Z Fold2 5G', '7.6-inch Tablet-like Display and Full-viewing Cover Screen',2499, 30, 'samsung phone','','')
    add_product(token,0,'Samsung Galaxy S21+', 'Pro-grade Camera and Intelligent Infinity-O Display',1299, 20,'samsung phone','','')
    add_product(token,0,'HUAWEI P40 Pro 5G','Ultra Vision Leica Quad Camera, VIP Service - Deep Sea Blue',1188,30,'huawei phone','','')

    add_product(token,0,'HUAWEI MATE 30 PRO','DUAL-SIM LIO-L29',899,30,'huawei phone','','')
    add_product(token,0,'Huawei P30 Pro','Dual Sim 40MP 8GB 256GB Mobile Phone',998,30,'huawei phone','','')

    add_product(token,0,'Surface Laptop 3','13.5“，Sandstone(Metal),Intel Core i7',2099,30,'Surface laptop','','')
    add_product(token,0,'Surface Pro 7','Platinum,Intel Core i7',2099,30,'Surface laptop','','')
    add_product(token,0,'Microsoft Surface Laptop 3','13.5“，128GB i5 Platinum',1298,30,'Surface laptop','','')

    '''
    the following is for category 1, book
    '''
    add_product(token,1,'Harry Potter and the Goblet of Fire', 'a story about magic world',80, 100, 'magic adventure youth fiction','','')
    add_product(token,1,'Harry Potter and the Order of the Phoenix', 'a story about magic world',80, 100, 'magic adventure youth fiction','','')
    add_product(token,1,'Harry Potter and the Half-Blood Prince', 'a story about magic world',80, 100, 'magic adventure youth fiction','','')
    add_product(token,1,'Harry Potter and the Deathly Hallows', 'a story about magic world',80, 100, 'magic adventure youth fiction','','')

    add_product(token,1,'Wuthering Heights', 'an 1847 novel by Emily Bronte',80, 100, 'romantic realism fiction','','')
    add_product(token,1,'War and Peace', 'a novel by the Russian author Leo Tolstoy',80, 100, 'historical war fiction','','')
    add_product(token,1,'The Great Gatsby', 'a 1925 novel by American writer F. Scott Fitzgerald',80, 100, 'romantic love american-dream fiction','','')
    add_product(token,1,'Norwegian Wood', 'a 1987 novel by Japanese author Haruki Murakami',80, 100, 'nostalgic love fiction','','')
    add_product(token,1,'The lady of the camellias', 'a novel by Alexandre Dumas fils,',80, 100, 'romantic tragedy fiction','','')
    add_product(token,1,'The Hunchback of Notre-Dame', ' a French Gothic novel by Victor Hugo,',80, 100, 'gothic religion love fiction','','')


    '''
    the following is for category 2, sport
    '''
    add_product(token,2,'air jordan 1 Travis Scott ', 'a shoes which is belong to nike, air jordan series', 4200, 30, 'shoes nike AJ','','')
    add_product(token,2,'air jordan 6', 'a shoes which is belong to nike, air jordan series', 1100, 30, 'shoes nike AJ','','')
    add_product(token,2,'air jordan 32 Golden Harvest', 'a shoes which is belong to nike, air jordan series', 800, 30, 'shoes nike AJ','','')
    add_product(token,2,'air jordan 4 Linen', 'a shoes which is belong to nike, air jordan series', 500, 30, 'shoes nike AJ','','')
    add_product(token,2,'air jordan 11', 'a shoes which is belong to nike, air jordan series', 500, 30, 'shoes nike AJ','','')

    add_product(token,2,'NYC Baseball Cap', 'a cap for baseball', 40, 30, 'baseball cap','','')
    add_product(token,2,'Brooklyn Basher Baseball Bat', 'a bat for baseball', 80, 30, 'baseball bat','','')

    add_product(token,2,'Tennis Ball', 'Competition used tennis ball ', 76, 30, 'tennis ball','','')
    add_product(token,2,'Wilson Pro Tennis Racket', 'racket for tennis', 76, 30, 'tennis racket','','')
    add_product(token,2,'Adidas tennis shoes', 'shoes for tennis', 60, 30, 'tennis shoes','','')
    add_product(token,2,'Lining badminton racket', 'racket for badminton', 90, 30, 'badminton racket','','')
    '''
    the following is for category 3, clothes
    '''
    add_product(token,3,'Balenciaga T shirt', 'a beige extravagant t-shirt', 5000, 30, 'Balenciaga T-shirt beige','','' )
    add_product(token,3,'Balenciaga Hoodie', 'a black sweater', 5200, 30, 'Balenciaga Hoodie black','','' )


    add_product(token,3,'lv jacket', 'a black fleece with LV logo', 4000, 30, 'lv black jackte','','' )
    add_product(token,3,'lv logo pants ', 'a black shiny pants', 3400, 30, 'lv black pants','','' )

    add_product(token,3,'burberry jacket', 'a brown fleece', 8000, 30, 'burberry jacket brown','','' )
    add_product(token,3,'burberry plaid shirt', 'a signature beige plaid shirt', 3400, 30, 'burberry plaid shirt','','')

    add_product(token,3,'gucci cardigan', 'a blue&brown cardigan', 9100, 30, 'gucci brown blue cardigan','','')
    add_product(token,3,'gucci jeans skinny', 'a blue jeans', 9100, 30, 'gucci jeans skinny','','')

    add_product(token,3,'nike swoosh shorts ', 'a black shorts with swoosh', 900, 30, 'nike shorts black','','')
    add_product(token,3,'nike swoosh T-shirt', 'a black t-shirt', 900, 30, 'nike t-shirt black','','')
    '''
    the following is for category 4, home
    '''
    add_product(token,4,'Wood Desk', 'a normal wood desk fro working', 323, 30, 'wooden brown desk','','' )
    add_product(token,4,'Wooden table', 'a normal table for studying', 360, 30, 'wooden brown table','','' )
    add_product(token,4,'wooden chair', 'a normal chair', 400, 30, 'wooden chair','','' )
    add_product(token,4,'wooden cabinet', 'a normal cabinet for storing', 500, 30, 'wooden brown cabinet','','' )
    add_product(token,4,'Double cloth Sofa', 'a sofa', 3000, 30, 'Cloth sofa','','' )
    add_product(token,4,'pink table lamp', 'a table lamp', 200, 30, 'pink table lamp','','' )
    add_product(token,4,'Hisense refrigerator ', 'a refrigerator ', 700, 30, 'silver refrigerator','','' )
    add_product(token,4,'wool quilt', 'a quilt', 300, 30, 'wool quilt','','' )
    add_product(token,4,'Haier washing machine', 'a washing machine', 600, 30, 'white washing machine','','' )
    '''
    the following is for category 5, toy
    '''
    add_product(token,5,'Lego Harry Potter Castle','71043 Castle Model Building Kit with Harry Potter Figures',519,30,'Lego Model Castle','','')
    add_product(token,5,'Jellycat Bunny','Jellycat Small Bashful Bunny',200,30,'Plush toy ','','')
    add_product(token,5,'JellyCat Dragon','Bashful Dragon medium 31cm soft toy',519,30,'plush soft toy','','')
    add_product(token,5,'JellyCat Curvie Pig',' super fluffy lovable look pig',519,30,'plush soft toy','','')
    add_product(token,5,'JellyCat Amuseable Cloud','dreamy companion cutie cloud',519,30,'plush soft toy','','')
    add_product(token,5,'JellyCat bag','Amusable Pineapple woven bag 33cm',200,30,'plush soft toy bag','','')


    add_product(token,5,'JellyCat Pear bag','Amusable Pear plushn cross body bag',519,30,'plush soft toy bag','','')


    add_product(token,5,'Lego Technic Porche','Porche 911 RSR 42096 Building Kit',1000,30,'lego model splicing car','','')
    add_product(token,5,'Lego Star Wars','The Rise of Skywalker Millennium Falcon 75257 Building Kit',1000,30,'lego model splicing ship','','')
    admin_logout(adminDB[0]['token'])
    print("put data into product finish")


def add_photo():
    adminDB=load_adminDB()
    productDB=load_productDB()
    if isLoggedin(adminDB[0]['email'])!=1:
        admin_login(adminDB[0]['email'], 123)

    token=adminDB[0]['token']

    #this is for add first img
    for i in range(0,len(productDB)):
        url='photo/'+str(i)+'-'+'0'+'.png'
        if os.path.exists(url):
            base_64=change_iml_to_base64(url)
            base_64='data:image/png;base64,'+str(base_64)
            update_first_photo(token,i,base_64)
    #this is for add second img
    for i in range(0,len(productDB)):
        url='photo/'+str(i)+'-'+'1'+'.png'
        if os.path.exists(url):
            base_64=change_iml_to_base64(url)
            base_64='data:image/png;base64,'+str(base_64)
            update_second_photo(token,i,base_64)

    admin_logout(adminDB[0]['token'])
    print("add photo finish")

def add_pro():
    token=user_login('z5555555@ad.unsw.edu.au',123)['token']
    productDB=load_productDB()
    id=[]
    for i in productDB:
        id.append(i['id'])
    length=len(productDB)
    l=random.sample(id, length)

    j=0
    for i in l:
        j+=1
        add_product_to_cart(token,i)
        if j%10==0 or j==length:
            purchase_product(token)
    user_logout(token)
    print("add record")
def change_iml_to_base64(url):
    f=open(url,'rb')#第一个参数图像路径
    ls_f=base64.b64encode(f.read())
    ls_f = ls_f.decode("utf-8")
    f.close()
    return ls_f


if __name__ == '__main__':
    initial()

    put_data_into_admin()

    put_data_into_user()

    put_data_into_product()

    add_pro()

    add_photo()

    
   
    

    
    
    
