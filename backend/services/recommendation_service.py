# app/services/recommendation_service.py

from db.db import db
from utils.vector import cosine_similarity, genre_to_vector


def get_all_movies():
    docs = db.collection("movies").stream()
    movies = []

    for doc in docs:
        movie = doc.to_dict()
        movie["id"] = doc.id
        movies.append(movie)

    return movies


def rank_movies(user_vector, movies, seen=None, liked=None, disliked=None, threshold=0.55):
    ranked = []

    seen = set(str(x) for x in (seen or []))
    liked = set(str(x) for x in (liked or []))
    disliked = set(str(x) for x in (disliked or []))

    excluded = seen | liked | disliked

    for movie in movies:
        movie_id = str(movie.get("id"))

        # Skip already consumed content
        if movie_id in excluded:
            continue

        movie_vector = genre_to_vector(movie.get("genre", ""))
        score = cosine_similarity(user_vector, movie_vector)

        if score >= threshold:
            movie["score"] = score
            ranked.append(movie)

    ranked.sort(key=lambda x: x["score"], reverse=True)
    return ranked