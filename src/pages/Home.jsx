import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { getBackdropPhoto, getBackdropUrl, getPosterPhoto, getPosterUrl } from '../utils/poster';
import { getGenres } from '../utils/filters';
import { formatRuntime } from '../utils/format';
import Rating from '../components/Rating';
import MovieGrid from '../components/MovieGrid';
import WatchlistButton from '../components/WatchlistButton';
import MediaImage from '../components/MediaImage';
import Loading, { ErrorState } from '../components/Loading';
import { CalendarIcon, ClockIcon, CompassIcon, PlayIcon, SparklesIcon } from '../components/icons';

export default function Home() {
  const { movies, loading, error, reload } = useMovies();
  const trendingRef = useRef(null);
  const [heroIndex, setHeroIndex] = useState(0);

  const featured = useMemo(() => movies.filter((movie) => movie.featured), [movies]);
  const trending = useMemo(
    () => [...movies].sort((a, b) => b.popularity - a.popularity).slice(0, 10),
    [movies],
  );
  const topRated = useMemo(
    () => [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5),
    [movies],
  );
  const genres = useMemo(() => getGenres(movies).filter((genre) => genre !== 'All').slice(0, 8), [movies]);

  useEffect(() => {
    if (featured.length < 2) return undefined;
    const timer = setInterval(() => {
      setHeroIndex((current) => (current + 1) % featured.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [featured.length]);

  useEffect(() => {
    if (heroIndex >= featured.length) setHeroIndex(0);
  }, [featured.length, heroIndex]);

  const scrollToTrending = useCallback(() => {
    trendingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (loading) {
    return <Loading fullPage label="Loading the collection…" />;
  }

  if (error) {
    return (
      <div className="container section">
        <ErrorState message={error} onRetry={reload} />
      </div>
    );
  }

  const hero = featured[heroIndex] || movies[0];
  if (!hero) return null;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__media" aria-hidden="true">
          <MediaImage
            className="hero__bg"
            src={getBackdropPhoto(hero)}
            fallback={getBackdropUrl(hero)}
            alt=""
            eager
          />
          <span
            className="hero__tint"
            style={{ '--tint-from': hero.colorFrom, '--tint-to': hero.colorTo }}
          />
          <span className="hero__overlay" />
        </div>
        <div className="container hero__inner">
          <div className="hero__content" key={hero.id}>
            <span className="hero__eyebrow">
              <SparklesIcon width={15} height={15} aria-hidden="true" />
              Featured today
            </span>
            <h1 className="hero__title">{hero.title}</h1>
            <div className="hero__meta">
              <Rating value={hero.rating} size={15} />
              <span className="dot" aria-hidden="true" />
              <span className="hero__meta-item">
                <CalendarIcon width={14} height={14} aria-hidden="true" />
                {hero.year}
              </span>
              <span className="hero__meta-item">
                <ClockIcon width={14} height={14} aria-hidden="true" />
                {formatRuntime(hero.runtime)}
              </span>
            </div>
            {hero.tagline ? <p className="hero__tagline">{hero.tagline}</p> : null}
            <p className="hero__overview">{hero.overview}</p>
            <div className="hero__genres">
              {hero.genres.map((genre) => (
                <span className="tag" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
            <div className="hero__actions">
              <Link className="btn btn--primary" to={`/movie/${hero.id}`}>
                <PlayIcon width={16} height={16} aria-hidden="true" />
                View details
              </Link>
              <WatchlistButton movieId={hero.id} variant="button" />
              <button type="button" className="btn btn--ghost" onClick={scrollToTrending}>
                <CompassIcon width={16} height={16} aria-hidden="true" />
                Explore collection
              </button>
            </div>
            {featured.length > 1 ? (
              <div className="hero__dots" role="tablist" aria-label="Featured movies">
                {featured.map((movie, index) => (
                  <button
                    key={movie.id}
                    type="button"
                    role="tab"
                    aria-selected={index === heroIndex}
                    aria-label={`Show ${movie.title}`}
                    className={`hero__dot ${index === heroIndex ? 'is-active' : ''}`}
                    onClick={() => setHeroIndex(index)}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div
            className="hero__poster"
            key={hero.id}
            style={{ '--tint-from': hero.colorFrom, '--tint-to': hero.colorTo }}
          >
            <MediaImage
              className="hero__poster-img"
              src={getPosterPhoto(hero)}
              fallback={getPosterUrl(hero)}
              alt={`${hero.title} poster`}
              width="400"
              height="600"
              eager
            />
            <span className="hero__poster-tint" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="section" ref={trendingRef} id="trending">
        <div className="container">
          <header className="section__header">
            <div>
              <h2 className="section__title">Trending now</h2>
              <p className="section__subtitle">The most popular titles in the collection right now.</p>
            </div>
            <Link className="link-more" to="/browse">
              Browse all
            </Link>
          </header>
          <MovieGrid movies={trending} />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <header className="section__header">
            <div>
              <h2 className="section__title">Explore by genre</h2>
              <p className="section__subtitle">Jump straight into the mood you are looking for.</p>
            </div>
          </header>
          <div className="genre-cards">
            {genres.map((genre) => (
              <Link
                key={genre}
                className="genre-card"
                to={`/browse?genre=${encodeURIComponent(genre)}`}
              >
                <span className="genre-card__name">{genre}</span>
                <span className="genre-card__count">
                  {movies.filter((movie) => movie.genres.includes(genre)).length} titles
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <header className="section__header">
            <div>
              <h2 className="section__title">Top rated</h2>
              <p className="section__subtitle">The highest scoring films in the collection.</p>
            </div>
            <Link className="link-more" to="/browse">
              See more
            </Link>
          </header>
          <MovieGrid movies={topRated} />
        </div>
      </section>
    </div>
  );
}
