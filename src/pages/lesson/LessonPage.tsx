import { Result } from 'antd';
import { useParams } from 'react-router-dom';
import { loadAllContent } from '../../content/loadContent';
import { LessonRenderer } from '../../entities/lesson/LessonRenderer';
import { StudentAssignmentBar } from '../../features/student-workspace/StudentAssignmentBar';
import { PracticeLesson } from './PracticeLesson';

export function LessonPage() {
  const { lessonId } = useParams();
  const content = loadAllContent();
  const lesson = content.lessons.find((item) => item.id === lessonId);

  if (lessonId?.startsWith('practice-')) return <PracticeLesson />;

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
    <>
      <main className="page-shell lesson-assignment-shell">
        <StudentAssignmentBar mode="lesson" itemId={lesson.id} />
      </main>
      <LessonRenderer lesson={lesson} exercises={content.exercises} materials={content.materials} />
    </>
  );
}
