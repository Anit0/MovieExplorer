const stroke = {
  viewBox: '0 0 24 24',
  width: 20,
  height: 20,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function SearchIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-3.6-3.6" />
    </svg>
  );
}

export function HeartIcon({ filled = false, ...props }) {
  return (
    <svg {...stroke} fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d="M19.8 5.2a5 5 0 0 0-7.1 0l-.7.7-.7-.7a5 5 0 1 0-7.1 7.1l.7.7L12 20.8l7.1-7.8.7-.7a5 5 0 0 0 0-7.1Z" />
    </svg>
  );
}

export function BookmarkIcon({ filled = false, ...props }) {
  return (
    <svg {...stroke} fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d="M6 3.5h12a1 1 0 0 1 1 1v16l-7-4.2-7 4.2v-16a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function SunIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
    </svg>
  );
}

export function MoonIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <path d="M20.5 14.4A8.5 8.5 0 0 1 9.6 3.5a8.5 8.5 0 1 0 10.9 10.9Z" />
    </svg>
  );
}

export function MenuIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PlayIcon(props) {
  return (
    <svg {...stroke} fill="currentColor" {...props}>
      <path d="M7.5 5.2a1 1 0 0 1 1.5-.9l9 6.2a1 1 0 0 1 0 1.7l-9 6.2a1 1 0 0 1-1.5-.9Z" />
    </svg>
  );
}

export function StarIcon({ filled = true, ...props }) {
  return (
    <svg {...stroke} fill={filled ? 'currentColor' : 'none'} {...props}>
      <path d="m12 3.4 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.6l1-5.9-4.3-4.1 5.9-.8Z" />
    </svg>
  );
}

export function ChevronLeftIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </svg>
  );
}

export function ArrowUpIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
    </svg>
  );
}

export function TrashIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function CalendarIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function SparklesIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8ZM18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8ZM5.5 14l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6Z" />
    </svg>
  );
}

export function FilmIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M8 4v16M16 4v16M3.5 9.3H8M3.5 14.7H8M16 9.3h4.5M16 14.7h4.5" />
    </svg>
  );
}

export function CompassIcon(props) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </svg>
  );
}

export function LogoIcon(props) {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" {...props}>
      <rect width="32" height="32" rx="9" fill="currentColor" opacity="0.14" />
      <rect
        x="6.5"
        y="6.5"
        width="19"
        height="19"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M11 6.5v19M21 6.5v19M6.5 11h19M6.5 21h19"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.5"
      />
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
    </svg>
  );
}
