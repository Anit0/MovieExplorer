export default function Loading({ label = 'Loading movies…', fullPage = false }) {
  return (
    <div className={`loading ${fullPage ? 'loading--page' : ''}`} role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p className="loading__label">{label}</p>
    </div>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content. Please try again.',
  onRetry,
  retryLabel = 'Try again',
}) {
  return (
    <div className="empty-state empty-state--error" role="alert">
      <h3>{title}</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          {retryLabel}
        </button>
      )}
    </div>
  );
}

export function SkeletonGrid({ count = 10 }) {
  return (
    <div className="movie-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton skeleton--poster" />
          <div className="skeleton skeleton--line" />
          <div className="skeleton skeleton--line skeleton--short" />
        </div>
      ))}
    </div>
  );
}
