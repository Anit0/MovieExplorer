import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLibrary } from '../context/LibraryContext';
import { CloseIcon, LogoIcon, MenuIcon, MoonIcon, SunIcon } from './icons';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/browse', label: 'Browse' },
  { to: '/favorites', label: 'Favorites', count: 'favoritesCount' },
  { to: '/watchlist', label: 'Watchlist', count: 'watchlistCount' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const library = useLibrary();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} ref={headerRef}>
      <div className="container navbar__inner">
        <Link className="brand" to="/" aria-label="Movie Explorer home">
          <span className="brand__mark" aria-hidden="true">
            <LogoIcon />
          </span>
          <span className="brand__text">
            Movie<span>Explorer</span>
          </span>
        </Link>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
            >
              <span>{link.label}</span>
              {link.count && library[link.count] > 0 ? (
                <span className="nav-link__badge">{library[link.count]}</span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <SunIcon width={19} height={19} /> : <MoonIcon width={19} height={19} />}
          </button>

          <button
            type="button"
            className="icon-btn navbar__burger"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? <CloseIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}>
        <nav className="mobile-nav__inner" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={closeMenu}
              className={({ isActive }) => `mobile-nav__link ${isActive ? 'is-active' : ''}`}
            >
              <span>{link.label}</span>
              {link.count && library[link.count] > 0 ? (
                <span className="nav-link__badge">{library[link.count]}</span>
              ) : null}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
