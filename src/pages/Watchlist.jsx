import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { useLibrary } from '../context/LibraryContext';
import MovieGrid from '../components/MovieGrid';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import { BookmarkIcon, TrashIcon } from '../components/icons';

export default function Watchlist() {
  const { movies, loading } = useMovies();
  const { watchlist, clearWatchlist } = useLibrary();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const saved = useMemo(() => {
    const order = new Map(watchlist.map((id, index) => [id, index]));
    return movies
      .filter((movie) => order.has(movie.id))
      .sort((a, b) => order.get(a.id) - order.get(b.id));
  }, [movies, watchlist]);

  const openConfirm = useCallback(() => setConfirmOpen(true), []);
  const closeConfirm = useCallback(() => setConfirmOpen(false), []);
  const handleClear = useCallback(() => {
    clearWatchlist();
    setConfirmOpen(false);
  }, [clearWatchlist]);

  return (
    <div className="container page">
      <header className="page__header page__header--split">
        <div>
          <h1 className="page__title">
            <BookmarkIcon filled width={23} height={23} aria-hidden="true" />
            Your watchlist
          </h1>
          <p className="page__subtitle">
            {watchlist.length
              ? `${watchlist.length} film${watchlist.length === 1 ? '' : 's'} queued up to watch.`
              : 'Save films with the bookmark button to build your watchlist.'}
          </p>
        </div>
        {watchlist.length ? (
          <button type="button" className="btn btn--outline" onClick={openConfirm}>
            <TrashIcon width={16} height={16} aria-hidden="true" />
            Clear all
          </button>
        ) : null}
      </header>

      {loading ? (
        <Loading label="Loading your watchlist…" />
      ) : (
        <MovieGrid
          movies={saved}
          emptyTitle="Your watchlist is empty"
          emptyMessage="Add films you plan to watch and they will show up right here."
          emptyAction={
            <Link className="btn btn--primary" to="/browse">
              Find something to watch
            </Link>
          }
        />
      )}

      <Modal
        isOpen={confirmOpen}
        onClose={closeConfirm}
        title="Clear watchlist?"
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
          This removes all {watchlist.length} film{watchlist.length === 1 ? '' : 's'} from your
          watchlist. This cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
