import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { useDebounce } from '../hooks/useDebounce';
import { filterMovies, getGenres, SORT_OPTIONS } from '../utils/filters';
import { pluralize } from '../utils/format';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import MovieGrid from '../components/MovieGrid';
import { ErrorState, SkeletonGrid } from '../components/Loading';

export default function Browse() {
  const { movies, loading, error, reload } = useMovies();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [genre, setGenre] = useState(() => searchParams.get('genre') || 'All');
  const [sort, setSort] = useState('popular');

  const searchRef = useRef(null);
  const resultsRef = useRef(null);
  const isFirstRender = useRef(true);
  const lastParamsRef = useRef(searchParams.toString());

  const debouncedQuery = useDebounce(query, 250);

  const genres = useMemo(() => getGenres(movies), [movies]);
  const results = useMemo(
    () => filterMovies(movies, { query: debouncedQuery, genre, sort }),
    [movies, debouncedQuery, genre, sort],
  );

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [debouncedQuery, genre, sort]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedQuery.trim()) next.set('q', debouncedQuery.trim());
    if (genre !== 'All') next.set('genre', genre);
    const serialized = next.toString();
    if (serialized === lastParamsRef.current) return;
    lastParamsRef.current = serialized;
    setSearchParams(serialized, { replace: true });
  }, [debouncedQuery, genre, setSearchParams]);

  const handleQueryChange = useCallback((value) => setQuery(value), []);
  const handleGenreChange = useCallback((value) => setGenre(value), []);
  const handleSortChange = useCallback((event) => setSort(event.target.value), []);
  const resetFilters = useCallback(() => {
    setQuery('');
    setGenre('All');
    setSort('popular');
    searchRef.current?.focus();
  }, []);

  const hasFilters = query || genre !== 'All' || sort !== 'popular';

  return (
    <div className="container page">
      <header className="page__header">
        <div>
          <h1 className="page__title">Browse movies</h1>
          <p className="page__subtitle">
            Search the whole collection and narrow it down with genres and sorting.
          </p>
        </div>
      </header>

      <div className="browse-controls">
        <SearchBar ref={searchRef} value={query} onChange={handleQueryChange} />

        <div className="browse-controls__row">
          <GenreFilter genres={genres} value={genre} onChange={handleGenreChange} />

          <label className="select">
            <span className="select__label">Sort by</span>
            <select value={sort} onChange={handleSortChange} aria-label="Sort movies">
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="results-bar" ref={resultsRef}>
        <p className="results-bar__count">
          {loading
            ? 'Loading…'
            : `${results.length} ${pluralize(results.length, 'movie')} found`}
          {debouncedQuery ? (
            <>
              {' '}
              for <strong>“{debouncedQuery}”</strong>
            </>
          ) : null}
          {genre !== 'All' ? (
            <>
              {' '}
              in <strong>{genre}</strong>
            </>
          ) : null}
        </p>
        {hasFilters ? (
          <button type="button" className="link-btn" onClick={resetFilters}>
            Reset filters
          </button>
        ) : null}
      </div>

      {error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : loading ? (
        <SkeletonGrid count={10} />
      ) : (
        <MovieGrid
          movies={results}
          emptyTitle="No movies match your filters"
          emptyMessage="Try clearing the search or picking a different genre."
          emptyAction={
            <button type="button" className="btn btn--primary" onClick={resetFilters}>
              Reset filters
            </button>
          }
        />
      )}
    </div>
  );
}
