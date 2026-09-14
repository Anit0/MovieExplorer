import { useCallback } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { HeartIcon } from './icons';

export default function FavoriteButton({ movieId, variant = 'icon', size = 18, className = '' }) {
  const { isFavorite, toggleFavorite } = useLibrary();
  const active = isFavorite(movieId);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleFavorite(movieId);
    },
    [movieId, toggleFavorite],
  );

  if (variant === 'button') {
    return (
      <button
        type="button"
        className={`btn ${active ? 'btn--primary' : 'btn--outline'} ${className}`}
        onClick={handleClick}
        aria-pressed={active}
      >
        <HeartIcon filled={active} width={18} height={18} />
        <span>{active ? 'In Favorites' : 'Add to Favorites'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`icon-btn icon-btn--overlay ${active ? 'is-active is-favorite' : ''} ${className}`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <HeartIcon filled={active} width={size} height={size} />
    </button>
  );
}
