import { useEffect, useState } from 'react';

export default function MediaImage({
  src,
  fallback,
  alt = '',
  className = '',
  eager = false,
  ...rest
}) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  useEffect(() => {
    setCurrentSrc(src || fallback);
  }, [src, fallback]);

  return (
    <img
      className={className}
      src={currentSrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => {
        if (fallback && currentSrc !== fallback) setCurrentSrc(fallback);
      }}
      {...rest}
    />
  );
}
