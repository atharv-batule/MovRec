from db.db import db


def update_user_preferences(user_id, movie_id, movie_vector, liked=True):
    user_ref = db.collection("Users").document(user_id)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return {
            "preferences": [0.2, 0.2, 0.2, 0.2, 0.2],
            "liked": [],
            "disliked": [],
            "seen": [],
            "watchlist": []
        }

    user = user_doc.to_dict()

    preferences = user.get("prefrences", [0.2, 0.2, 0.2, 0.2, 0.2])
    liked_movies = user.get("liked", [])
    disliked_movies = user.get("disliked", [])
    seen_movies = user.get("seen", [])
    watchlist = user.get("watchlist", [])

    movie_id = str(movie_id)

    # Prevent duplicate feedback
    if liked and movie_id in liked_movies:
        return {
            "preferences": preferences,
            "liked": liked_movies,
            "disliked": disliked_movies,
            "seen": seen_movies,
            "watchlist": watchlist
        }

    if not liked and movie_id in disliked_movies:
        return {
            "preferences": preferences,
            "liked": liked_movies,
            "disliked": disliked_movies,
            "seen": seen_movies,
            "watchlist": watchlist
        }

    alpha = 0.1 if liked else -0.1

    updated = []
    for p, mv in zip(preferences, movie_vector):
        value = p + (alpha * mv)
        updated.append(max(0.0, value))

    total = sum(updated)
    if total > 0:
        updated = [v / total for v in updated]

    # Update interaction state
    if liked:
        liked_movies.append(movie_id)
        if movie_id in disliked_movies:
            disliked_movies.remove(movie_id)
    else:
        disliked_movies.append(movie_id)
        if movie_id in liked_movies:
            liked_movies.remove(movie_id)

    if movie_id not in seen_movies:
        seen_movies.append(movie_id)

    user_ref.update({
        "prefrences": updated,
        "liked": liked_movies,
        "disliked": disliked_movies,
        "seen": seen_movies
    })

    return {
        "preferences": updated,
        "liked": liked_movies,
        "disliked": disliked_movies,
        "seen": seen_movies,
        "watchlist": watchlist
    }


def toggle_watchlist(user_id, movie_id):
    user_ref = db.collection("Users").document(user_id)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return []

    user = user_doc.to_dict()
    watchlist = user.get("watchlist", [])
    movie_id = str(movie_id)

    if movie_id in watchlist:
        watchlist.remove(movie_id)
    else:
        watchlist.append(movie_id)

    user_ref.update({"watchlist": watchlist})
    return watchlist


def get_watchlist(user_id):
    user_ref = db.collection("Users").document(user_id)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return []

    user = user_doc.to_dict()
    watchlist_ids = user.get("watchlist", [])

    movies = []
    for movie_id in watchlist_ids:
        movie_doc = db.collection("movies").document(str(movie_id)).get()
        if movie_doc.exists:
            movie = movie_doc.to_dict()
            movie["id"] = movie_doc.id
            movies.append(movie)

    return movies