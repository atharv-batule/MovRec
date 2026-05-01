const BASE_URL = 'https://dull-bees-speak.loca.lt';

export async function fetchRecommendations(userId: string) {
  const res = await fetch(`${BASE_URL}/user/${userId}/recommendations`);
  return res.json();
}

export async function sendFeedback(
  userId: string,
  movieId: string,
  liked: boolean
) {
  const res = await fetch(`${BASE_URL}/user/${userId}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      movie_id: movieId,
      liked,
    }),
  });

  return res.json();
}

export async function fetchWatchlist(userId: string) {
  const res = await fetch(`${BASE_URL}/user/${userId}/watchlist`);
  return res.json();
}

export async function toggleWatchlist(userId: string, movieId: string) {
  const res = await fetch(`${BASE_URL}/user/${userId}/watchlist/${movieId}`, {
    method: 'POST',
  });

  return res.json();
}