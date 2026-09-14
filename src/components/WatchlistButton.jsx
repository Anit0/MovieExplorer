import { useCallback } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BookmarkIcon } from './icons';

export default function WatchlistButton({ movieId, variant = 'icon', size = 18, className = '' }) {
  const { isInWatchlist, toggleWatchlist } = useLibrary();
  const active = isInWatchlist(movieId);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleWatchlist(movieId);
    },
    [movieId, toggleWatchlist],
  );

  if (variant === 'button') {
    return (
      <button
        type="button"
        className={`btn ${active ? 'btn--primary' : 'btn--outline'} ${className}`}
        onClick={handleClick}
        aria-pressed={active}
      >
        <BookmarkIcon filled={active} width={18} height={18} />
        <span>{active ? 'In Watchlist' : 'Add to Watchlist'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`icon-btn icon-btn--overlay ${active ? 'is-active is-watchlist' : ''} ${className}`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? 'Remove from watchlist' : 'Add to watchlist'}
      title={active ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <BookmarkIcon filled={active} width={size} height={size} />
    </button>
  );
}
