import { Link } from 'react-router-dom';
import { CompassIcon } from '../components/icons';

export default function NotFound({
  code = '404',
  title = 'This scene was cut',
  message = 'The page you are looking for does not exist. It may have been moved or the link is broken.',
  actionLabel = 'Back to home',
  actionTo = '/',
}) {
  return (
    <div className="container not-found">
      <p className="not-found__code" aria-hidden="true">
        {code}
      </p>
      <h1 className="not-found__title">{title}</h1>
      <p className="not-found__message">{message}</p>
      <div className="not-found__actions">
        <Link className="btn btn--primary" to={actionTo}>
          <CompassIcon width={16} height={16} aria-hidden="true" />
          {actionLabel}
        </Link>
        <Link className="btn btn--ghost" to="/browse">
          Browse movies
        </Link>
      </div>
    </div>
  );
}
