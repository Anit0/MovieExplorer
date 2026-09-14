import { memo } from 'react';
import { Link } from 'react-router-dom';
import { getPosterPhoto, getPosterUrl } from '../utils/poster';
import { formatRuntime } from '../utils/format';
import Rating from './Rating';
import FavoriteButton from './FavoriteButton';
import WatchlistButton from './WatchlistButton';
import MediaImage from './MediaImage';
import { ClockIcon } from './icons';

function MovieCard({ movie, index = 0 }) {
  return (
    <article className="movie-card" style={{ '--reveal-delay': `${Math.min(index, 12) * 35}ms` }}>
      <div
        className="movie-card__media"
        style={{
          '--tint-from': movie.colorFrom,
          '--tint-to': movie.colorTo,
          backgroundImage: `url("${getPosterUrl(movie)}")`,
        }}
      >
        <Link
          className="movie-card__link"
          to={`/movie/${movie.id}`}
          aria-label={`View details for ${movie.title}`}
        >
          <MediaImage
            className="movie-card__poster"
            src={getPosterPhoto(movie)}
            fallback={getPosterUrl(movie)}
            alt={`${movie.title} poster`}
            width="400"
            height="600"
          />
          <span className="movie-card__tint" aria-hidden="true" />
          <span className="movie-card__scrim" aria-hidden="true" />
          <span className="movie-card__cta" aria-hidden="true">View details</span>
        </Link>

        <span className="movie-card__rating-badge">
          <Rating value={movie.rating} size={12} showValue={false} />
          <span className="movie-card__rating-value">{movie.rating.toFixed(1)}</span>
        </span>

        <div className="movie-card__actions">
          <FavoriteButton movieId={movie.id} />
          <WatchlistButton movieId={movie.id} />
        </div>
      </div>

      <div className="movie-card__body">
        <h3 className="movie-card__title">
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h3>
        <div className="movie-card__meta">
          <span>{movie.year}</span>
          <span className="dot" aria-hidden="true" />
          <span className="movie-card__runtime">
            <ClockIcon width={13} height={13} aria-hidden="true" />
            {formatRuntime(movie.runtime)}
          </span>
        </div>
        <div className="movie-card__genres">
          {movie.genres.slice(0, 2).map((genre) => (
            <span className="tag" key={genre}>
              {genre}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default memo(MovieCard);
