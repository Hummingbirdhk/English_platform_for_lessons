import smileBlob from '../../assets/artifacts/smile-blob.webp';
import smileBlobAlt from '../../assets/artifacts/smile-blob-alt.webp';
import smileFire from '../../assets/artifacts/smile-fire.webp';
import smileHeart from '../../assets/artifacts/smile-heart.webp';
import smileStar from '../../assets/artifacts/smile-star.webp';

type BrandArtifactKind = 'spark' | 'fire' | 'smile' | 'heart' | 'blob-alt';

type BrandArtifactProps = {
  kind: BrandArtifactKind;
  className?: string;
};

const artifactSources: Record<BrandArtifactKind, string> = {
  spark: smileStar,
  fire: smileFire,
  smile: smileBlob,
  heart: smileHeart,
  'blob-alt': smileBlobAlt,
};

export function BrandArtifact({ kind, className = '' }: BrandArtifactProps) {
  const classes = `brand-artifact brand-artifact--${kind} ${className}`.trim();

  return (
    <span className={classes} data-design-artifact={kind} aria-hidden="true">
      <img src={artifactSources[kind]} alt="" draggable={false} />
    </span>
  );
}

export function WallPattern({ className = '' }: { className?: string }) {
  return (
    <span
      className={`wall-pattern ${className}`.trim()}
      data-design-artifact="wall-pattern"
      aria-hidden="true"
    >
      <svg
        className="wall-pattern__artwork"
        viewBox="0 0 1176 777"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <image href={smileFire} x="22" y="440" width="270" height="270" />
        <image href={smileStar} x="205" y="150" width="320" height="320" />
        <image href={smileBlobAlt} x="485" y="-45" width="335" height="335" />
        <image href={smileStar} x="735" y="155" width="345" height="345" />
        <image href={smileFire} x="890" y="315" width="285" height="285" />
        <image href={smileStar} x="455" y="430" width="325" height="325" />
        <image href={smileBlob} x="865" y="500" width="315" height="315" />
      </svg>
    </span>
  );
}
