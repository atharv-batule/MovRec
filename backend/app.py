# app.py

from flask import Flask
from flask_cors import CORS

from routes.users import user_bp
from routes.movies import movies_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Health check
    @app.route("/", methods=["GET"])
    def home():
        return {"message": "Server running"}, 200

    # Register blueprints
    app.register_blueprint(user_bp)
    app.register_blueprint(movies_bp)

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)