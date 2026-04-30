from db.db import db


def update_user_preferences(user_id, movie_vector, liked=True):
    user_ref = db.collection("Users").document(user_id)
    user_doc = user_ref.get()

    if not user_doc.exists:
        return [0.2, 0.2, 0.2, 0.2, 0.2]

    user = user_doc.to_dict()
    preferences = user.get("prefrences", [0.2, 0.2, 0.2, 0.2, 0.2])

    alpha = 0.1 if liked else -0.1

    updated = []
    for p, mv in zip(preferences, movie_vector):
        value = p + (alpha * mv)
        updated.append(max(0.0, value))

    total = sum(updated)
    if total > 0:
        updated = [v / total for v in updated]

    user_ref.update({"prefrences": updated})

    return updated