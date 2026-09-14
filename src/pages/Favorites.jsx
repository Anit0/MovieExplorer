import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { useLibrary } from '../context/LibraryContext';
import MovieGrid from '../components/MovieGrid';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import { HeartIcon, TrashIcon } from '../components/icons';

export default function Favorites() {
  const { movies, loading } = useMovies();
  const { favorites, clearFavorites } = useLibrary();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const saved = useMemo(() => {
    const order = new Map(favorites.map((id, index) => [id, index]));
    return movies
      .filter((movie) => order.has(movie.id))
      .sort((a, b) => order.get(a.id) - order.get(b.id));
  }, [movies, favorites]);

  const openConfirm = useCallback(() => setConfirmOpen(true), []);
  const closeConfirm = useCallback(() => setConfirmOpen(false), []);
  const handleClear = useCallback(() => {
    clearFavorites();
    setConfirmOpen(false);
  }, [clearFavorites]);

  return (
    <div className="container page">
      <header className="page__header page__header--split">
        <div>
          <h1 className="page__title">
            <HeartIcon filled width={24} height={24} aria-hidden="true" />
            Your favorites
          </h1>
          <p className="page__subtitle">
            {favorites.length
              ? `${favorites.length} film${favorites.length === 1 ? '' : 's'} you loved.`
              : 'Films you mark with a heart will be saved here.'}
          </p>
        </div>
        {favorites.length ? (
          <button type="button" className="btn btn--outline" onClick={openConfirm}>
            <TrashIcon width={16} height={16} aria-hidden="true" />
            Clear all
          </button>
        ) : null}
      </header>

      {loading ? (
        <Loading label="Loading your favorites…" />
      ) : (
        <MovieGrid
          movies={saved}
          emptyTitle="No favorites yet"
          emptyMessage="Browse the collection and tap the heart on any poster to save it here."
          emptyAction={
            <Link className="btn btn--primary" to="/browse">
              Browse movies
            </Link>
          }
        />
      )}

      <Modal
        isOpen={confirmOpen}
        onClose={closeConfirm}
        title="Clear all favorites?"
        size="sm"
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={closeConfirm}>
              Cancel
            </button>
            <button type="button" className="btn btn--primary" onClick={handleClear}>
              Yes, clear all
            </button>
          </>
        }
      >
        <p>
          This removes all {favorites.length} film{favorites.length === 1 ? '' : 's'} from your
          favorites. This cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
