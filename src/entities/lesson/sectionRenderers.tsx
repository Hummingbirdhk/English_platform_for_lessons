import { Alert, Card, Typography } from 'antd';
import type { ExerciseDefinition, LessonSection, Material } from '../../content/types';
import { MaterialRenderer } from '../material/MaterialRenderer';
import { getFeatureRenderer, isExerciseCompatible } from '../../features/registry/featureRegistry';

export function renderLessonSection(
  section: LessonSection,
  exercises: ExerciseDefinition[],
  materials: Material[],
) {
  if (section.type === 'intro') {
    return (
      <Card key={section.id} className="lesson-card lesson-card--intro">
        <div className="lesson-card__index">01</div>
        <div className="lesson-card__copy">
          <Typography.Title level={3}>{section.title}</Typography.Title>
          <Typography.Paragraph>{section.body}</Typography.Paragraph>
        </div>
        <span className="lesson-card__arrow" aria-hidden="true">
          →
        </span>
      </Card>
    );
  }

  if (section.type === 'material') {
    const material = materials.find((item) => item.id === section.materialId);
    return material ? (
      <Card key={section.id} className={`lesson-material lesson-material--${material.type}`}>
        <MaterialRenderer material={material} />
      </Card>
    ) : (
      <Alert key={section.id} type="warning" message="This material is temporarily unavailable." />
    );
  }

  const exercise = exercises.find((item) => item.id === section.exerciseId);
  const Renderer = getFeatureRenderer(section.feature);

  if (!exercise || !Renderer || !isExerciseCompatible(section.feature, exercise)) {
    return (
      <Alert key={section.id} type="warning" message="This exercise is temporarily unavailable." />
    );
  }

  return (
    <Card key={section.id} className="lesson-feature-card">
      <Renderer exercise={exercise} />
    </Card>
  );
}
