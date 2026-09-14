import MovieCard from './MovieCard';
import { FilmIcon } from './icons';

export default function MovieGrid({
  movies = [],
  emptyTitle = 'No movies found',
  emptyMessage = 'Try a different search term or genre.',
  emptyAction = null,
  className = '',
}) {
  if (!movies.length) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon" aria-hidden="true">
          <FilmIcon width={28} height={28} />
        </span>
        <h3>{emptyTitle}</h3>
        <p>{emptyMessage}</p>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className={`movie-grid ${className}`}>
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} index={index} />
      ))}
    </div>
  );
}
