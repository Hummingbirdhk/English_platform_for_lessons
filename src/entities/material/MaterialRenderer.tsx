import type { Material } from '../../content/types';
import { GrammarMaterial } from './renderers/GrammarMaterial';
import { ReadingMaterial } from './renderers/ReadingMaterial';
import { VideoMaterial } from './renderers/VideoMaterial';
import { VocabularyMaterial } from './renderers/VocabularyMaterial';
import { FamilyVocabulary } from './renderers/FamilyVocabulary';

export function MaterialRenderer({ material }: { material: Material }) {
  switch (material.type) {
    case 'grammar':
      return <GrammarMaterial material={material} />;
    case 'vocabulary':
      return material.id === 'vocabulary-01-family-people' ? (
        <FamilyVocabulary />
      ) : (
        <VocabularyMaterial material={material} />
      );
    case 'reading':
      return <ReadingMaterial material={material} />;
    case 'video':
      return <VideoMaterial material={material} />;
  }
}
