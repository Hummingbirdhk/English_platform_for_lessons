import { Space, Tag, Typography } from 'antd';
import type { ExerciseDefinition, Lesson, Material } from '../../content/types';
import { renderLessonSection } from './sectionRenderers';

export function LessonRenderer({
  lesson,
  exercises,
  materials,
}: {
  lesson: Lesson;
  exercises: ExerciseDefinition[];
  materials: Material[];
}) {
  return (
    <main className="page-shell">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Space wrap>
            <Tag>{lesson.level}</Tag>
            <Tag>Grade {lesson.grade}</Tag>
          </Space>
          <Typography.Title level={1}>{lesson.title}</Typography.Title>
          <Typography.Text type="secondary">{lesson.topic}</Typography.Text>
        </div>
        {lesson.sections.map((section) => renderLessonSection(section, exercises, materials))}
      </Space>
    </main>
  );
}
