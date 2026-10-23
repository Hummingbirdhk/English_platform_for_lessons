import { Alert, Card, Typography } from 'antd';
import type { ExerciseDefinition, LessonSection, Material } from '../../content/types';
import { MaterialRenderer } from '../material/MaterialRenderer';
import {
  getFeatureRenderer,
  isExerciseCompatible,
} from '../../features/registry/featureRegistry';

export function renderLessonSection(
  section: LessonSection,
  exercises: ExerciseDefinition[],
  materials: Material[],
) {
  if (section.type === 'intro') {
    return (
      <Card key={section.id} title={section.title} className="lesson-card">
        <Typography.Paragraph>{section.body}</Typography.Paragraph>
      </Card>
    );
  }

  if (section.type === 'material') {
    const material = materials.find((item) => item.id === section.materialId);
    return material ? (
      <Card key={section.id} className="lesson-material">
        <MaterialRenderer material={material} />
      </Card>
    ) : (
      <Alert
        key={section.id}
        type="warning"
        message="This material is temporarily unavailable."
      />
    );
  }

  const exercise = exercises.find((item) => item.id === section.exerciseId);
  const Renderer = getFeatureRenderer(section.feature);

  if (!exercise || !Renderer || !isExerciseCompatible(section.feature, exercise)) {
    return (
      <Alert key={section.id} type="warning" message="This exercise is temporarily unavailable." />
    );
  }

  return <Renderer key={section.id} exercise={exercise} />;
}
