const API_KEY = 'ed8f5e6c3b01b09d1cf884f7315fc7de'
const BASE_URL = 'https://api.themoviedb.org/3'

export function getMovies() {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  )
}
