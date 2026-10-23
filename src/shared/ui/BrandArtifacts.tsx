type BrandArtifactProps = {
  kind: 'spark' | 'fire' | 'smile';
  className?: string;
};

export function BrandArtifact({ kind, className = '' }: BrandArtifactProps) {
  const classes = `brand-artifact brand-artifact--${kind} ${className}`.trim();

  if (kind === 'spark') {
    return (
      <span className={classes} aria-hidden="true">
        <svg viewBox="0 0 64 64" role="presentation">
          <path d="M32 0C34.8 21.2 42.8 29.2 64 32C42.8 34.8 34.8 42.8 32 64C29.2 42.8 21.2 34.8 0 32C21.2 29.2 29.2 21.2 32 0Z" />
        </svg>
      </span>
    );
  }

  if (kind === 'fire') {
    return (
      <span className={classes} aria-hidden="true">
        <svg viewBox="0 0 64 80" role="presentation">
          <path
            className="brand-artifact__fire-shell"
            d="M35 2C39 18 55 24 55 43C55 62 44 76 31 76C16 76 6 64 8 49C10 36 20 31 23 18C28 24 31 27 33 32C37 24 38 14 35 2Z"
          />
          <path
            className="brand-artifact__fire-core"
            d="M33 41C35 49 42 53 42 61C42 68 37 72 31 72C25 72 21 68 21 62C21 56 25 53 27 48C29 51 31 53 32 56C34 52 35 47 33 41Z"
          />
        </svg>
      </span>
    );
  }

  return (
    <span className={classes} aria-hidden="true">
      <svg viewBox="0 0 112 82" role="presentation">
        <rect width="112" height="82" rx="41" />
        <circle cx="42" cy="33" r="5" className="brand-artifact__smile-detail" />
        <circle cx="70" cy="33" r="5" className="brand-artifact__smile-detail" />
        <path
          d="M31 48C36 63 47 68 56 68C65 68 76 63 81 48"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          className="brand-artifact__smile-line"
        />
      </svg>
    </span>
  );
}
