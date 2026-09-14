import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LibraryContext = createContext(null);

const FAVORITES_KEY = 'movie-explorer:favorites';
const WATCHLIST_KEY = 'movie-explorer:watchlist';

function toggleId(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

export function LibraryProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage(FAVORITES_KEY, []);
  const [watchlist, setWatchlist] = useLocalStorage(WATCHLIST_KEY, []);

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((current) => toggleId(current, id));
    },
    [setFavorites],
  );

  const toggleWatchlist = useCallback(
    (id) => {
      setWatchlist((current) => toggleId(current, id));
    },
    [setWatchlist],
  );

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);
  const isInWatchlist = useCallback((id) => watchlist.includes(id), [watchlist]);

  const removeFavorite = useCallback(
    (id) => setFavorites((current) => current.filter((item) => item !== id)),
    [setFavorites],
  );

  const removeFromWatchlist = useCallback(
    (id) => setWatchlist((current) => current.filter((item) => item !== id)),
    [setWatchlist],
  );

  const clearFavorites = useCallback(() => setFavorites([]), [setFavorites]);
  const clearWatchlist = useCallback(() => setWatchlist([]), [setWatchlist]);

  const value = useMemo(
    () => ({
      favorites,
      watchlist,
      favoritesCount: favorites.length,
      watchlistCount: watchlist.length,
      toggleFavorite,
      toggleWatchlist,
      isFavorite,
      isInWatchlist,
      removeFavorite,
      removeFromWatchlist,
      clearFavorites,
      clearWatchlist,
    }),
    [
      favorites,
      watchlist,
      toggleFavorite,
      toggleWatchlist,
      isFavorite,
      isInWatchlist,
      removeFavorite,
      removeFromWatchlist,
      clearFavorites,
      clearWatchlist,
    ],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}

export default LibraryContext;
