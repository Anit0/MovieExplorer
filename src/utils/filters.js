export function getGenres(movies = []) {
  const set = new Set();
  movies.forEach((movie) => movie.genres.forEach((genre) => set.add(genre)));
  return ['All', ...Array.from(set).sort()];
}

export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'year', label: 'Newest' },
  { value: 'title', label: 'A - Z' },
];

const collator = new Intl.Collator(undefined, { sensitivity: 'base' });

export function filterMovies(movies = [], { query = '', genre = 'All', sort = 'popular' } = {}) {
  const needle = query.trim().toLowerCase();

  const result = movies.filter((movie) => {
    const matchesGenre = genre === 'All' || movie.genres.includes(genre);
    if (!matchesGenre) return false;
    if (!needle) return true;

    return (
      movie.title.toLowerCase().includes(needle) ||
      movie.overview.toLowerCase().includes(needle) ||
      movie.director.toLowerCase().includes(needle) ||
      movie.genres.some((item) => item.toLowerCase().includes(needle)) ||
      movie.cast.some((name) => name.toLowerCase().includes(needle))
    );
  });

  return result.sort((a, b) => {
    switch (sort) {
      case 'rating':
        return b.rating - a.rating;
      case 'year':
        return b.year - a.year;
      case 'title':
        return collator.compare(a.title, b.title);
      default:
        return b.popularity - a.popularity;
    }
  });
}
