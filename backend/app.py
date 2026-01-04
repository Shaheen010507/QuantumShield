# backend/app.py

from flask import Flask
from flask_cors import CORS
from routes.dashboard_routes import dashboard_routes
from routes.transaction_routes import transaction_routes
from routes.auth_routes import auth_routes





app = Flask(__name__)
CORS(app)  # Allow frontend React to call API

# Register blueprints
app.register_blueprint(dashboard_routes, url_prefix="/api/dashboard")
app.register_blueprint(transaction_routes, url_prefix="/api/transaction")
app.register_blueprint(auth_routes, url_prefix="/api/auth")



if __name__ == "__main__":
    app.run(debug=True)
