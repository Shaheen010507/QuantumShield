# backend/routes/transaction_routes.py

from flask import Blueprint, request, jsonify
from controllers.transaction_controller import create_transaction

transaction_routes = Blueprint("transaction_routes", __name__)

@transaction_routes.route("/create", methods=["POST"])
def create():
    data = request.json

    user = data.get("user")            # logged-in user info
    transaction = data.get("transaction")  # transaction details

    result, status = create_transaction(user, transaction)
    return jsonify(result), status
