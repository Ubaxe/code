from werkzeug.exceptions import HTTPException

'''
this file is use to definite the HTTP error so that when we test the code, we can get what happen in the frontend
'''
class AccessError(HTTPException):
    code = 400
    message = 'No message specified'
class ValueError(HTTPException):
    code = 400
    message = 'No message specified'
class TypeError(HTTPException):
    code = 400
    message = 'No message specified'
