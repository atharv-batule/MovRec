from flask import Flask
from flask_cors import CORS

from routes.users import user_bp
from routes.movies import movies_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route("/", methods=["GET"])
    def home():
        return {"message": "Server running"}, 200

    app.register_blueprint(user_bp)
    app.register_blueprint(movies_bp)

    return app


app = create_app()


if __name__ == "__main__":
    print("App started")
    app.run(host="0.0.0.0", port=5000, debug=True)