from database.db import mongo
from datetime import datetime

def create_user(data):
    return mongo.db.users.insert_one({
        "username": data["username"],
        "email": data["email"],
        "phone": data["phone"],
        "password": data["password"],
        "role": data["role"],
        "createdAt": datetime.utcnow(),
        "lastLogin": None
    })

def find_user_by_email(email):
    return mongo.db.users.find_one({"email": email})

def update_last_login(user_id):
    mongo.db.users.update_one(
        {"_id": user_id},
        {"$set": {"lastLogin": datetime.utcnow()}}
    )
