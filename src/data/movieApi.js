import { MOVIES } from './movies';

const NETWORK_DELAY = 500;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clone(movie) {
  return { ...movie, genres: [...movie.genres], cast: [...movie.cast] };
}

export async function getAllMovies() {
  await delay(NETWORK_DELAY);
  return MOVIES.map(clone);
}

export async function getMovieById(id) {
  await delay(NETWORK_DELAY);
  const match = MOVIES.find((movie) => movie.id === id);
  return match ? clone(match) : null;
}

export async function getFeaturedMovies() {
  await delay(NETWORK_DELAY);
  return MOVIES.filter((movie) => movie.featured).map(clone);
}

export async function getMoviesByIds(ids) {
  await delay(NETWORK_DELAY);
  const order = new Map(ids.map((id, index) => [id, index]));
  return MOVIES.filter((movie) => order.has(movie.id))
    .sort((a, b) => order.get(a.id) - order.get(b.id))
    .map(clone);
}

export const movieApi = {
  getAllMovies,
  getMovieById,
  getFeaturedMovies,
  getMoviesByIds,
};

export default movieApi;
