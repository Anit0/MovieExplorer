import { useEffect, useRef, useState } from 'react';
import movieApi from '../data/movieApi';

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const active = useRef(true);

  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);

  
  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieApi.getAllMovies();
      if (!active.current) return;
      setMovies(data);
    } catch (err) {
      if (!active.current) return;
      setError(err?.message || 'Unable to load movies right now.');
    } finally {
      if (active.current) setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const getMovieById = (id) => movies.find((movie) => movie.id === id) || null;

  const getMoviesByIds = (ids = []) => {
    const order = new Map(ids.map((id, index) => [id, index]));
    return movies
      .filter((movie) => order.has(movie.id))
      .sort((a, b) => order.get(a.id) - order.get(b.id));
  };

  return { movies, loading, error, reload, getMovieById, getMoviesByIds };
}

export default useMovies;
