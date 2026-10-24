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
      <BrandArtifact kind="fire" className="wall-pattern__item wall-pattern__fire-left" />
      <BrandArtifact kind="spark" className="wall-pattern__item wall-pattern__star-left" />
      <BrandArtifact kind="blob-alt" className="wall-pattern__item wall-pattern__blob-top" />
      <BrandArtifact kind="spark" className="wall-pattern__item wall-pattern__star-top" />
      <BrandArtifact kind="fire" className="wall-pattern__item wall-pattern__fire-right" />
      <BrandArtifact kind="spark" className="wall-pattern__item wall-pattern__star-center" />
      <BrandArtifact kind="smile" className="wall-pattern__item wall-pattern__blob-right" />
    </span>
  );
}
