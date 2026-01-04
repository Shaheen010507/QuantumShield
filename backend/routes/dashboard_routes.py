from flask import Blueprint, jsonify, request
from controllers.dashboard_controller import (
    get_user_dashboard,
    get_banker_dashboard,
     get_organization_dashboard
)

dashboard_routes = Blueprint("dashboard_routes", __name__)

@dashboard_routes.route("/user/<int:user_id>", methods=["POST"])
def user_dashboard(user_id):
    data = request.json
    user = data.get("user")

    result, status = get_user_dashboard(user, user_id)
    return jsonify(result), status


@dashboard_routes.route("/banker", methods=["POST"])
def banker_dashboard():
    data = request.json
    user = data.get("user")

    result, status = get_banker_dashboard(user)
    return jsonify(result), status
@dashboard_routes.route("/organization", methods=["POST"])
def organization_dashboard():
    data = request.json
    result, status = get_organization_dashboard(data["user"])
    return jsonify(result), status
