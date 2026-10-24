import { getGrammarPresentation } from '../../content/grammar/grammarPresentations';
import type { Material } from '../../content/types';
import { GlossyActionLink } from '../../shared/ui/GlossyActionButton';

const typeLabels: Record<Material['type'], string> = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading',
  video: 'Video',
};

export function MaterialCard({ material }: { material: Material }) {
  const grammarPresentation =
    material.type === 'grammar' ? getGrammarPresentation(material.id) : undefined;
  const displayTitle = grammarPresentation?.displayTitle ?? material.title;

  return (
    <article className={`material-tile material-tile--${material.type}`}>
      <div className="material-tile__top">
        <span className="material-type-chip">{typeLabels[material.type]}</span>
        <span className="level-chip">{material.level}</span>
      </div>

      <h3>{displayTitle}</h3>
      <p>{material.topic}</p>

      <div className="material-tile__bottom">
        <span>{material.summary}</span>
        <GlossyActionLink
          to={`/materials/${material.id}`}
          label={`Открыть материал: ${displayTitle}`}
          size="sm"
        />
      </div>
    </article>
  );
}
