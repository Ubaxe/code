from google.cloud import dialogflow
import sys
from search import *
from category import *
from global_variable import *
# this is the key for connet google cloud, need to run it first before use chatbot
# $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\hp\Documents\GitHub\capstone-project-3900-h18b-5-hd\reed\mykey.json"


'''
this is a fake function for chatbot, use this to connect frontend and backend, once work, use the real chatbot function
input:
    texts: list of str   ['which product do you have','home','table']
return:
    if the conversation is not finish i will return:
        [response] list length == 1
    if the conversation is finish i will return:
        [response，1] list length == 2
    if the conversation stopped by unknown input i will return:
        [response，1,1] list length == 3
'''
def fake_chatbot_handle(texts):
    check=True
    texts = texts.split(',')
    if len(texts)==1 and check:
        return ['we have electronic, book, home, toy, clothes, sport. which one do you want']
    elif len(texts)==2 and check:
        return ['what kind of sport product do you want']
    elif len(texts)==3 and check:
        l=search('nike',0,1000000)
        re=[]
        for i in l:
            if check_category(i['category_id'])=='clothes':
                re.append(i)
        save_chatDB(re)
        return ['so your are looking for category: clothes product: nike',re]
    else:
        return ['sorry your asking is wrong',1,1]

'''
this is a fake function for chatbot, use this to connect frontend and backend, once work, use the real chatbot function
i put all the search data into chat.p
input:
    texts: list of str   ['which product do you have','home','table']
return:
    if the conversation is not finish i will return:
        [response] list length == 1
    if the conversation is finish i will return:
        [response，1] list length == 2
    if the conversation stopped by unknown input i will return:
        [response，1,1] list length == 3
'''
def chatbot_handle(texts):
    session_client = dialogflow.SessionsClient()

    session = session_client.session_path("common-309205", 0)
    texts = texts.split(',')
    for text in texts:
        text_input = dialogflow.TextInput(
            text=text, language_code="en-US")

        query_input = dialogflow.QueryInput(text=text_input)
        response = session_client.detect_intent(
            request={'session': session, 'query_input': query_input})
        
    response.query_result.fulfillment_text=str(response.query_result.fulfillment_text)
    if 'Sorry' in response.query_result.fulfillment_text:
        return [response.query_result.fulfillment_text,1,1]
    if 'search_product' in str(response.query_result.intent.display_name) and 'so you are' in response.query_result.fulfillment_text:
        s=divide(response.query_result.fulfillment_text)
        l=search(s[1],0,1000000)
        re=[]
        for i in l:
            if check_category(i['category_id'])==s[0]:
                re.append(i)
        save_chatDB(re)
        return [response.query_result.fulfillment_text,1]
    elif 'recommendation' in str(response.query_result.intent.display_name) and 'so you are' in response.query_result.fulfillment_text:
        r=divide2(response.query_result.fulfillment_text)
        if len(r)==1:
            l=search(r[0],0,1000000)
            re=[]
            for i in l:
                re.append(i)
            save_chatDB(re)
            return [response.query_result.fulfillment_text,1]
        else:
            p=int(r[1])
            l=search(r[0],0,p)
            re=[]
            for i in l:
                re.append(i)
            save_chatDB(re)
            return [response.query_result.fulfillment_text,1]
    else:
        return [response.query_result.fulfillment_text]
    





'''
this is original function i copy from google document, i put it here in case i need it later
'''
def detect_intent_texts(project_id, session_id, texts, language_code): #this input texts is list of str
    """Returns the result of detect intent with texts as inputs.

    Using the same `session_id` between requests allows continuation
    of the conversation."""
    
    session_client = dialogflow.SessionsClient()

    session = session_client.session_path(project_id, session_id)
    print('Session path: {}\n'.format(session))

    for text in texts:
        text_input = dialogflow.TextInput(
            text=text, language_code=language_code)

        query_input = dialogflow.QueryInput(text=text_input)
        
        response = session_client.detect_intent(
            request={'session': session, 'query_input': query_input})
        print('=' * 20)
        print('Query text: {}'.format(response.query_result.query_text))
        print('Detected intent: {} (confidence: {})\n'.format(
            response.query_result.intent.display_name,
            response.query_result.intent_detection_confidence))
        print('Fulfillment text: {}\n'.format(
            response.query_result.fulfillment_text))

    return response




#----------------------------------------------helper function leave it alone----------------------
def divide(s):
    s=s.split()
    return [s[6],s[8]]

def divide2(s):
    s=s.split()
    if len(s)==8:
        return [s[7]]
    else:
        return [s[7],s[10]]


if __name__ == '__main__':
    detect_intent_texts("common-309205", 0, ['which product do you have','home','table'], "en-US")

    