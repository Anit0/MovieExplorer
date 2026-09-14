import { useCallback } from 'react';

export default function GenreFilter({ genres, value, onChange, className = '' }) {
  const handleSelect = useCallback((genre) => onChange(genre), [onChange]);

  return (
    <div className={`genre-filter ${className}`} role="group" aria-label="Filter movies by genre">
      {genres.map((genre) => {
        const active = genre === value;
        return (
          <button
            key={genre}
            type="button"
            className={`chip ${active ? 'chip--active' : ''}`}
            aria-pressed={active}
            onClick={() => handleSelect(genre)}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
