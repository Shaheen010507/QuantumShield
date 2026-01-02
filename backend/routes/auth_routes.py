from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from schemas.user_schema import create_user, find_user_by_email, update_last_login

from utils.auth_utils import hash_password, check_password
from bson.objectid import ObjectId

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.json

    if find_user_by_email(data["email"]):
        return jsonify({"msg": "User already exists"}), 400

    data["password"] = hash_password(data["password"])
    create_user(data)

    return jsonify({"msg": "Registration successful"}), 201


@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    user = find_user_by_email(data["email"])

    if not user or not check_password(data["password"], user["password"]):
        return jsonify({"msg": "Invalid credentials"}), 401

    update_last_login(user["_id"])
    token = create_access_token(identity=str(user["_id"]))

    return jsonify({
        "token": token,
        "role": user["role"]
    }), 200
