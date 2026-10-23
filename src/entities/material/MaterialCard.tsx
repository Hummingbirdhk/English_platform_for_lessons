import { Link } from 'react-router-dom';
import type { Material } from '../../content/types';

const typeLabels: Record<Material['type'], string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  video: 'Video',
};

export function MaterialCard({ material }: { material: Material }) {
  return (
    <Link
      to={`/materials/${material.id}`}
      className={`material-tile material-tile--${material.type}`}
    >
      <div className="material-tile__top">
        <span className="material-type-chip">{typeLabels[material.type]}</span>
        <span className="level-chip">{material.level}</span>
      </div>

      <h3>{material.title}</h3>
      <p>{material.topic}</p>

      <div className="material-tile__bottom">
        <span>{material.summary}</span>
        <span className="material-tile__arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </Link>
  );
}
