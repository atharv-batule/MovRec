# app/services/recommendation_service.py

from db.db import db
from app.utils.vector import cosine_similarity, genre_to_vector


def get_all_movies():
    docs = db.collection("movies").stream()
    movies = []

    for doc in docs:
        movie = doc.to_dict()
        movie["id"] = doc.id
        movies.append(movie)

    return movies


def rank_movies(user_vector, movies, threshold=0.55):
    ranked = []

    for movie in movies:
        movie_vector = genre_to_vector(movie.get("genre", ""))
        score = cosine_similarity(user_vector, movie_vector)

        if score >= threshold:
            movie["score"] = score
            ranked.append(movie)

    ranked.sort(key=lambda x: x["score"], reverse=True)
    return ranked