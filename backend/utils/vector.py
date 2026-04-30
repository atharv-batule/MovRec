# app/utils/vector.py

import math

GENRES = ["Action", "Comedy", "Drama", "Thriller", "Sci-Fi"]


def normalize(vec):
    total = sum(vec)
    if total == 0:
        return vec
    return [v / total for v in vec]


def cosine_similarity(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(y * y for y in b))

    if norm_a == 0 or norm_b == 0:
        return 0.0

    return dot / (norm_a * norm_b)


def genre_to_vector(genre_string):
    movie_genres = [g.strip() for g in genre_string.split(",")]
    vec = [1.0 if genre in movie_genres else 0.0 for genre in GENRES]
    return normalize(vec)