import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import movieApi from '../data/movieApi';
import { useMovies } from '../hooks/useMovies';
import { getBackdropPhoto, getBackdropUrl, getPosterPhoto, getPosterUrl } from '../utils/poster';
import { formatRuntime } from '../utils/format';
import Rating from '../components/Rating';
import Modal from '../components/Modal';
import MovieGrid from '../components/MovieGrid';
import MediaImage from '../components/MediaImage';
import FavoriteButton from '../components/FavoriteButton';
import WatchlistButton from '../components/WatchlistButton';
import Loading, { ErrorState } from '../components/Loading';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ClockIcon,
  FilmIcon,
  PlayIcon,
} from '../components/icons';
import NotFound from './NotFound';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies } = useMovies();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    movieApi
      .getMovieById(id)
      .then((data) => {
        if (active) setMovie(data);
      })
      .catch(() => {
        if (active) setError('We could not load this movie. Please try again.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id, reloadKey]);

  const related = useMemo(() => {
    if (!movie) return [];
    return movies
      .filter(
        (item) => item.id !== movie.id && item.genres.some((genre) => movie.genres.includes(genre)),
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }, [movie, movies]);

  const retry = useCallback(() => setReloadKey((key) => key + 1), []);
  const goBack = useCallback(() => navigate(-1), [navigate]);
  const openTrailer = useCallback(() => setTrailerOpen(true), []);
  const closeTrailer = useCallback(() => setTrailerOpen(false), []);

  if (loading) {
    return <Loading fullPage label="Loading movie…" />;
  }

  if (error) {
    return (
      <div className="container page">
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  if (!movie) {
    return (
      <NotFound
        code="404"
        title="Movie not found"
        message="The title you are looking for is not in the collection. It may have been removed or the link is incorrect."
        actionLabel="Back to browse"
        actionTo="/browse"
      />
    );
  }

  return (
    <article className="details">
      <section className="details__hero">
        <div className="details__hero-media" aria-hidden="true">
          <MediaImage
            className="details__hero-bg"
            src={getBackdropPhoto(movie)}
            fallback={getBackdropUrl(movie)}
            alt=""
            eager
          />
          <span
            className="details__hero-tint"
            style={{ '--tint-from': movie.colorFrom, '--tint-to': movie.colorTo }}
          />
          <span className="details__hero-overlay" />
        </div>
        <div className="container details__hero-inner">
          <button type="button" className="link-btn details__back" onClick={goBack}>
            <ChevronLeftIcon width={16} height={16} aria-hidden="true" />
            Back
          </button>

          <div className="details__layout">
            <div
              className="details__poster"
              style={{ '--tint-from': movie.colorFrom, '--tint-to': movie.colorTo }}
            >
              <MediaImage
                className="details__poster-img"
                src={getPosterPhoto(movie)}
                fallback={getPosterUrl(movie)}
                alt={`${movie.title} poster`}
                width="400"
                height="600"
              />
              <span className="details__poster-tint" aria-hidden="true" />
            </div>

            <div className="details__info">
              <h1 className="details__title">{movie.title}</h1>
              {movie.tagline ? <p className="details__tagline">{movie.tagline}</p> : null}

              <div className="details__meta">
                <Rating value={movie.rating} size={16} />
                <span className="dot" aria-hidden="true" />
                <span className="details__meta-item">
                  <CalendarIcon width={15} height={15} aria-hidden="true" />
                  {movie.year}
                </span>
                <span className="details__meta-item">
                  <ClockIcon width={15} height={15} aria-hidden="true" />
                  {formatRuntime(movie.runtime)}
                </span>
              </div>

              <div className="details__genres">
                {movie.genres.map((genre) => (
                  <Link
                    key={genre}
                    className="tag tag--link"
                    to={`/browse?genre=${encodeURIComponent(genre)}`}
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <p className="details__overview">{movie.overview}</p>

              <dl className="details__facts">
                <div>
                  <dt>Director</dt>
                  <dd>{movie.director}</dd>
                </div>
                <div>
                  <dt>Release year</dt>
                  <dd>{movie.year}</dd>
                </div>
                <div>
                  <dt>Runtime</dt>
                  <dd>{formatRuntime(movie.runtime)}</dd>
                </div>
                <div>
                  <dt>Rating</dt>
                  <dd>{movie.rating.toFixed(1)} / 10</dd>
                </div>
              </dl>

              <div className="details__actions">
                <button type="button" className="btn btn--primary" onClick={openTrailer}>
                  <PlayIcon width={16} height={16} aria-hidden="true" />
                  Watch trailer
                </button>
                <FavoriteButton movieId={movie.id} variant="button" />
                <WatchlistButton movieId={movie.id} variant="button" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container details__columns">
          <div className="details__cast">
            <h2 className="section__title section__title--sm">Top cast</h2>
            <ul className="cast-list">
              {movie.cast.map((name) => (
                <li className="cast-list__item" key={name}>
                  <span className="cast-list__avatar" aria-hidden="true">
                    {name.charAt(0)}
                  </span>
                  <span className="cast-list__name">{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="details__aside">
            <h2 className="section__title section__title--sm">Storyline</h2>
            <p>{movie.overview}</p>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section section--alt">
          <div className="container">
            <header className="section__header">
              <div>
                <h2 className="section__title">More like this</h2>
                <p className="section__subtitle">Because you looked at {movie.title}.</p>
              </div>
            </header>
            <MovieGrid movies={related} />
          </div>
        </section>
      ) : null}

      <Modal isOpen={trailerOpen} onClose={closeTrailer} title={`${movie.title} — Trailer`} size="lg">
        <div className="trailer">
          <span className="trailer__play" aria-hidden="true">
            <PlayIcon width={30} height={30} />
          </span>
          <p className="trailer__title">{movie.tagline || movie.title}</p>
          <p className="trailer__note">
            This is a local demo. Plug a real movie API into <code>src/data/movieApi.js</code> to
            stream trailers here.
          </p>
          <span className="trailer__film" aria-hidden="true">
            <FilmIcon width={64} height={64} />
          </span>
        </div>
      </Modal>
    </article>
  );
}
