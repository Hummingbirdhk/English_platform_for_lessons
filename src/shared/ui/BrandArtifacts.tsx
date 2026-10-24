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
