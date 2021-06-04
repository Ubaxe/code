from werkzeug.exceptions import HTTPException
import hashlib
import jwt
from flask import Flask, abort, Response, make_response,jsonify
from Error import *


#-------------------------------------------------------------------------------------------------------
#                                  use to generate and decode the token
#---------------------------------------------------------------------------------------------------

def tokenHashAlgo():
    return 'HS256'

def secretKey():
    string="this is secret"
    secret=hashlib.sha256(string.encode()).hexdigest()
    return secret

def generateToken(userDictionary):
    token = jwt.encode(userDictionary, secretKey(), algorithm=tokenHashAlgo())
    token=str(token)
    return token

def generateDictionary(email, password):
    return {'email':email, 'password':password}

def decodeToken(token):
    secret = secretKey()
    token = str.encode(token)
    try:
        userDictionary = jwt.decode(token, secret, algorithms=('HS256'))
    except:
        abort(403)
        raise AccessError(description='invalid token')
    return userDictionary



