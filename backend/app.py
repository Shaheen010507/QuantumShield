
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from database.db import init_db
from routes.auth_routes import auth

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
JWTManager(app)
init_db(app)

app.register_blueprint(auth, url_prefix="/api/auth")

if __name__ == "__main__":
    app.run(debug=True)
