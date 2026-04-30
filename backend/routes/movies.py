from flask import Blueprint, request, jsonify
from flask_cors import CORS
from db.db import db  
movies_bp = Blueprint("movies", __name__)


@movies_bp.route("/")
def home():
    return "Server running"

@movies_bp.route("/movies", methods=["GET"])
def get_movies():
    docs = db.collection("Movies").stream()
    print(docs)
    movies = []
    for doc in docs:
        movie = doc.to_dict()
        movie["id"] = doc.id
        movies.append(movie)
    return jsonify(movies)
