# app/routes/user.py

from flask import Blueprint, jsonify
from db.db import db

user_bp = Blueprint("user", __name__, url_prefix="/user")


@user_bp.route("/<user_id>", methods=["GET"])
def get_user(user_id):
    user_ref = db.collection("users").document(user_id)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return jsonify({"error": "User not found"}), 404

    data = user_doc.to_dict()

    user_data = {
        "id": user_id,
        "name": data.get("name", ""),
        "preferences": data.get("prefrences", []),   # matches your firestore field name
        "watchlist": data.get("watchlist", [])
    }

    return jsonify(user_data), 200