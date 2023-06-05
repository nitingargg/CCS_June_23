from flask import Flask, request, make_response
from pymongo import MongoClient
from bson import json_util
from json import loads
import os
import secrets
import datetime

app = Flask(__name__)

uri = "mongodb+srv://ngargq:7JOkkeyGw12yEJNp@cluster0.3oo8ouq.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client.db
users = db.users
req= db.req


@app.route("/postFile",methods=["POST"])
def file():
    if(request.method=="POST"):
        
        body=request.form
        fl = request.files["img_file"]

        req_uid = secrets.token_hex(4)

        filename = req_uid + "." + fl.filename.split(".")[1]

        filepath = os.path.dirname(__file__)+'\images\\' + filename

        fl.save(filepath)

        query = req.insert_one({"name":body["name"],"email":body["email"],"req_uid":req_uid,"timeStamp":datetime.datetime.now(),"processed":"null","file":filename})
        

        return {"msg":"File Uploaded","req_id":req_uid, "output": "processed data"}
    else:
        return make_response({"msg":"NOT ALLOWED"},405)


@app.route("/getOne/<string:id>")
def get(id):
    all_data = req.find_one({"req_uid":id})
    json = loads(json_util.dumps(all_data))
    return {"response":json}

if(__name__ == "__main__"):
    app.run(debug=True)



# @app.route("/getOne/<string:id>")
# def home(id):
#     user = users.find_one({"name":id})
#     if(user):
#         data = loads(json_util.dumps(user))
#         return data
#     else:
#         return make_response({"msg":"User Not Found"},404)

# @app.route("/create")
# def new():
#     data = request.get_json()
#     users.insert_one({"name":data["name"],"email":data["email"]})
#     return {"msg":"User Created"}