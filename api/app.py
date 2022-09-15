from flask import Flask, Response, request, jsonify
import os
from zipfile import ZipFile

""" Global Variables """
app = Flask(__name__)

if __name__ == "__main__":
    app.run(debug=True)