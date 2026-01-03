# backend/routes/auth_routes.py

from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database.db import get_db_connection
from datetime import datetime

auth_routes = Blueprint("auth", __name__)

@auth_routes.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    phone = data.get("phone")
    role = data.get("role")

    if not all([name, username, password, email, phone, role]):
        return jsonify({"error": "All fields are required"}), 400

    hashed_password = generate_password_hash(password)
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (name, username, password, email, phone, role) VALUES (%s,%s,%s,%s,%s,%s)",
            (name, username, hashed_password, email, phone, role)
        )
        conn.commit()
    except Exception as e:
        conn.close()
        return jsonify({"error": "Username or email already exists"}), 400

    conn.close()
    return jsonify({"message": "User registered successfully"}), 201


@auth_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({"error": "Invalid username"}), 400

    if not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid password"}), 400

    # Update last login
    last_login = datetime.now()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET last_login = %s WHERE id = %s", (last_login, user["id"]))
    conn.commit()
    conn.close()

    user_data = {
        "id": user["id"],
        "name": user["name"],
        "username": user["username"],
        "email": user["email"],
        "phone": user["phone"],
        "role": user["role"],
        "last_login": str(last_login)
    }

    return jsonify({"message": "Login successful", "user": user_data}), 200
