const XML_ESCAPES = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
};

function escapeXml(value = '') {
  return String(value).replace(/[<>&'"]/g, (char) => XML_ESCAPES[char]);
}

function wrapText(text, maxChars, maxLines) {
  const words = String(text).trim().split(/\s+/);
  const lines = [];
  let current = '';

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) lines.push(current);

  if (lines.length > maxLines) {
    const trimmed = lines.slice(0, maxLines);
    trimmed[maxLines - 1] = `${trimmed[maxLines - 1].replace(/[.,;:]$/, '')}…`;
    return trimmed;
  }

  return lines;
}

function posterSvg(movie, width, height) {
  const from = movie.colorFrom || '#1f2937';
  const to = movie.colorTo || '#0f172a';
  const titleLines = wrapText(movie.title, 16, 3);
  const lineHeight = 40;
  const lastBaseline = height - 72;
  const startY = lastBaseline - (titleLines.length - 1) * lineHeight;
  const tspans = titleLines
    .map((line, index) => `<tspan x="32" y="${startY + index * lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');
  const monogram = escapeXml((movie.title || '?').trim().charAt(0).toUpperCase());
  const firstGenre = escapeXml((movie.genres || [])[0] || '');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs>
<linearGradient id="p-base" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="${from}"/>
<stop offset="100%" stop-color="${to}"/>
</linearGradient>
<radialGradient id="p-glow" cx="0.74" cy="0.16" r="0.9">
<stop offset="0%" stop-color="#ffffff" stop-opacity="0.32"/>
<stop offset="55%" stop-color="#ffffff" stop-opacity="0.04"/>
<stop offset="100%" stop-color="#000000" stop-opacity="0.28"/>
</radialGradient>
<linearGradient id="p-fade" x1="0" y1="0" x2="0" y2="1">
<stop offset="40%" stop-color="#000000" stop-opacity="0"/>
<stop offset="100%" stop-color="#000000" stop-opacity="0.85"/>
</linearGradient>
</defs>
<rect width="${width}" height="${height}" fill="url(#p-base)"/>
<rect width="${width}" height="${height}" fill="url(#p-glow)"/>
<text x="${width / 2}" y="${height / 2}" text-anchor="middle" dominant-baseline="central" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(height * 0.52)}" font-weight="700" fill="#ffffff" fill-opacity="0.1">${monogram}</text>
<circle cx="${width * 0.78}" cy="${height * 0.2}" r="${width * 0.23}" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="2"/>
<circle cx="${width * 0.78}" cy="${height * 0.2}" r="${width * 0.34}" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="2"/>
<rect width="${width}" height="${height}" fill="url(#p-fade)"/>
<rect x="32" y="${startY - 46}" width="46" height="4" rx="2" fill="#ffffff" fill-opacity="0.9"/>
<text font-family="Georgia, 'Times New Roman', serif" font-size="34" font-weight="700" fill="#ffffff">${tspans}</text>
<text x="32" y="${height - 36}" font-family="Helvetica, Arial, sans-serif" font-size="15" fill="#ffffff" fill-opacity="0.72" letter-spacing="2">${escapeXml(movie.year)} · ${firstGenre}</text>
</svg>`;
}

function backdropSvg(movie, width, height) {
  const from = movie.colorFrom || '#111827';
  const to = movie.colorTo || '#0f172a';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<defs>
<linearGradient id="b-base" x1="0" y1="0" x2="1" y2="1">
<stop offset="0%" stop-color="${from}"/>
<stop offset="100%" stop-color="${to}"/>
</linearGradient>
<radialGradient id="b-glow" cx="0.72" cy="0.28" r="0.9">
<stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"/>
<stop offset="60%" stop-color="#ffffff" stop-opacity="0.03"/>
<stop offset="100%" stop-color="#000000" stop-opacity="0.4"/>
</radialGradient>
</defs>
<rect width="${width}" height="${height}" fill="url(#b-base)"/>
<rect width="${width}" height="${height}" fill="url(#b-glow)"/>
<circle cx="${width * 0.8}" cy="${height * 0.3}" r="${height * 0.42}" fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="3"/>
<circle cx="${width * 0.8}" cy="${height * 0.3}" r="${height * 0.6}" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="3"/>
</svg>`;
}

function toDataUri(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const cache = new Map();

export function getPosterUrl(movie) {
  if (!movie) return '';
  if (movie.poster) return movie.poster;
  const key = `poster:${movie.id}`;
  if (!cache.has(key)) cache.set(key, toDataUri(posterSvg(movie, 400, 600)));
  return cache.get(key);
}

export function getBackdropUrl(movie) {
  if (!movie) return '';
  if (movie.backdrop) return movie.backdrop;
  const key = `backdrop:${movie.id}`;
  if (!cache.has(key)) cache.set(key, toDataUri(backdropSvg(movie, 1600, 900)));
  return cache.get(key);
}

function picsum(seed, width, height) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

export function getPosterPhoto(movie) {
  if (!movie) return '';
  return movie.poster || picsum(`${movie.id}-poster`, 400, 600);
}

export function getBackdropPhoto(movie) {
  if (!movie) return '';
  return movie.backdrop || picsum(`${movie.id}-scene`, 1600, 900);
}
