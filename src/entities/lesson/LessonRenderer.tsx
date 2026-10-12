import { Space, Typography } from 'antd';
import type { ExerciseDefinition, Lesson } from '../../content/types';
import { renderLessonSection } from './sectionRenderers';
export function LessonRenderer({lesson,exercises}:{lesson:Lesson;exercises:ExerciseDefinition[]}){return <main className="page-shell"><Space direction="vertical" size="large" style={{width:'100%'}}><div><Typography.Title level={1}>{lesson.title}</Typography.Title><Typography.Text type="secondary">Grade {lesson.grade} · {lesson.level} · {lesson.topic}</Typography.Text></div>{lesson.sections.map((section)=>renderLessonSection(section,exercises))}</Space></main>}
