type P = { className?: string };

export const ArrowRight = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Close = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const External = ({ className }: P) => (
  <svg className={className} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M6.5 3.5H12.5V9.5M12.5 3.5L6 10M4 6v6.5h6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Dot = ({ className }: P) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <circle cx="7" cy="7" r="2.6" fill="currentColor" />
  </svg>
);

export const Drag = ({ className }: P) => (
  <svg className={className} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 2.5v11M2.5 8h11M8 2.5L6 4.5M8 2.5l2 2M8 13.5l-2-2M8 13.5l2-2M2.5 8l2-2M2.5 8l2 2M13.5 8l-2-2M13.5 8l-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
