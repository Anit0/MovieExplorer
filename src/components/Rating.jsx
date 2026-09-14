import { StarIcon } from './icons';
import { formatRating } from '../utils/format';

const STARS = [0, 1, 2, 3, 4];

export default function Rating({ value = 0, max = 10, size = 16, showValue = true, className = '' }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div
      className={`rating ${className}`}
      style={{ '--star-size': `${size}px` }}
      aria-label={`Rated ${formatRating(value)} out of ${max}`}
      role="img"
    >
      <span className="rating__stars" aria-hidden="true">
        <span className="rating__layer">
          {STARS.map((index) => (
            <StarIcon key={index} filled={false} width={size} height={size} />
          ))}
        </span>
        <span className="rating__layer rating__layer--full" style={{ width: `${percent}%` }}>
          {STARS.map((index) => (
            <StarIcon key={index} filled width={size} height={size} />
          ))}
        </span>
      </span>
      {showValue && <span className="rating__value">{formatRating(value)}</span>}
    </div>
  );
}
