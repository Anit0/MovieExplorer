import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { CloseIcon, SearchIcon } from './icons';

const SearchBar = forwardRef(function SearchBar(
  {
    value,
    onChange,
    onSubmit,
    placeholder = 'Search by title, genre, cast or director…',
    autoFocus = false,
    id = 'movie-search',
    className = '',
  },
  forwardedRef,
) {
  const inputRef = useRef(null);
  useImperativeHandle(forwardedRef, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    get element() {
      return inputRef.current;
    },
  }), []);

  const handleChange = useCallback((event) => onChange(event.target.value), [onChange]);

  const handleClear = useCallback(() => {
    onChange('');
    inputRef.current?.focus();
  }, [onChange]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit?.(value);
      inputRef.current?.blur();
    },
    [onSubmit, value],
  );

  return (
    <form className={`searchbar ${className}`} role="search" onSubmit={handleSubmit}>
      <SearchIcon className="searchbar__icon" width={19} height={19} aria-hidden="true" />
      <input
        id={id}
        ref={inputRef}
        className="searchbar__input"
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={autoFocus}
        aria-label="Search movies"
      />
      {value ? (
        <button
          type="button"
          className="searchbar__clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <CloseIcon width={16} height={16} />
        </button>
      ) : null}
    </form>
  );
});

export default SearchBar;
