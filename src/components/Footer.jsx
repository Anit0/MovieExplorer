import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpIcon, LogoIcon } from './icons';

export default function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link className="brand" to="/" aria-label="Movie Explorer home">
            <span className="brand__mark" aria-hidden="true">
              <LogoIcon />
            </span>
            <span className="brand__text">
              Movie<span>Explorer</span>
            </span>
          </Link>
          <p className="footer__tagline">
            Discover, collect and share the films you love. Built with React, React Router and the
            Context API.
          </p>
        </div>

        <nav className="footer__col" aria-label="Discover">
          <h3>Discover</h3>
          <Link to="/">Home</Link>
          <Link to="/browse">Browse movies</Link>
          <Link to="/browse?genre=Sci-Fi">Sci-Fi picks</Link>
        </nav>

        <nav className="footer__col" aria-label="Your library">
          <h3>Your library</h3>
          <Link to="/favorites">Favorites</Link>
          <Link to="/watchlist">Watchlist</Link>
        </nav>

        <button type="button" className="btn btn--outline footer__top" onClick={scrollToTop}>
          <ArrowUpIcon width={16} height={16} />
          Back to top
        </button>
      </div>

      <div className="container footer__bottom">
        <p>Movie Explorer · Demo data only · No API keys required</p>
        <p>Built for practising hooks, routing and context.</p>
      </div>
    </footer>
  );
}
