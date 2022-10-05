from flask import Flask, Response, request, jsonify
import os
from zipfile import ZipFile

""" Global Variables """
app = Flask(__name__)

@app.route("/api/upload", methods=["POST"])
def upload_export():
   return NotImplementedError

@app.route("/api/home", methods=["GET"])
def home():
    return NotImplementedError


if __name__ == "__main__":
    app.run(debug=True)