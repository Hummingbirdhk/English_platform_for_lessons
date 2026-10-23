import { Result } from 'antd';
import { useParams } from 'react-router-dom';
import { loadAllContent } from '../../content/loadContent';
import { LessonRenderer } from '../../entities/lesson/LessonRenderer';

export function LessonPage() {
  const { lessonId } = useParams();
  const content = loadAllContent();
  const lesson = content.lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    return (
      <main className="page-shell">
        <Result
          status="404"
          title="Lesson not found"
          subTitle="Please return to the lesson list."
        />
      </main>
    );
  }

  return (
    <LessonRenderer
      lesson={lesson}
      exercises={content.exercises}
      materials={content.materials}
    />
  );
}
