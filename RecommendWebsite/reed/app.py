from flask import Flask
from flask_restplus import Api
from flask_cors import CORS

app = Flask(__name__)

# This will enable CORS for all routes
CORS(app)
