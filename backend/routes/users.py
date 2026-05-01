from flask import Blueprint, jsonify, request
from db.db import db

from services.user_service import (
    update_user_preferences,
    toggle_watchlist,
    get_watchlist,
)
from services.recommendation_service import get_all_movies, rank_movies
from utils.vector import genre_to_vector

user_bp = Blueprint("user", __name__, url_prefix="/user")


@user_bp.route("/<user_id>", methods=["GET"])
def get_user(user_id):
    user_ref = db.collection("users").document(user_id)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return jsonify({"error": "User not found"}), 404

    data = user_doc.to_dict()

    return jsonify({
        "id": user_id,
        "name": data.get("name", ""),
        "preferences": data.get("prefrences", []),
        "liked": data.get("liked", []),
        "disliked": data.get("disliked", []),
        "seen": data.get("seen", []),
        "watchlist": data.get("watchlist", [])
    }), 200


@user_bp.route("/<user_id>/recommendations", methods=["GET"])
def get_recommendations(user_id):
    user_ref = db.collection("users").document(user_id)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return jsonify({"error": "User not found"}), 404

    user = user_doc.to_dict()

    user_vector = user.get("prefrences", [0.2, 0.2, 0.2, 0.2, 0.2])
    seen = user.get("seen", [])
    liked = user.get("liked", [])
    disliked = user.get("disliked", [])

    movies = get_all_movies()
    recommendations = rank_movies(
        user_vector,
        movies,
        seen=seen,
        liked=liked,
        disliked=disliked
    )

    return jsonify({"recommendations": recommendations}), 200


@user_bp.route("/<user_id>/feedback", methods=["POST"])
def update_feedback(user_id):
    body = request.json

    movie_id = body.get("movie_id")
    liked = body.get("liked", True)

    if not movie_id:
        return jsonify({"error": "movie_id required"}), 400

    movie_doc = db.collection("movies").document(str(movie_id)).get()

    if not movie_doc.exists:
        return jsonify({"error": "Movie not found"}), 404

    movie = movie_doc.to_dict()
    movie_vector = genre_to_vector(movie.get("genre", ""))

    updated_user = update_user_preferences(user_id, movie_id, movie_vector, liked)

    movies = get_all_movies()
    recommendations = rank_movies(
        updated_user["preferences"],
        movies,
        seen=updated_user["seen"],
        liked=updated_user["liked"],
        disliked=updated_user["disliked"]
    )

    return jsonify({
        "preferences": updated_user["preferences"],
        "recommendations": recommendations
    }), 200


@user_bp.route("/<user_id>/watchlist", methods=["GET"])
def fetch_watchlist(user_id):
    movies = get_watchlist(user_id)
    return jsonify({"watchlist": movies}), 200


@user_bp.route("/<user_id>/watchlist/<movie_id>", methods=["POST"])
def update_watchlist(user_id, movie_id):
    watchlist = toggle_watchlist(user_id, movie_id)
    return jsonify({"watchlist": watchlist}), 200


@user_bp.route("/debug/users", methods=["GET"])
def debug_users():
    docs = db.collection("users").stream()
    users = []

    for doc in docs:
        users.append({
            "doc_id": doc.id,
            "data": doc.to_dict()
        })

    return jsonify(users), 200