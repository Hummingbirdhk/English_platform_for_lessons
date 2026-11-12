import { Result } from 'antd';
import { useParams } from 'react-router-dom';
import { loadAllContent } from '../../content/loadContent';
import { LessonRenderer } from '../../entities/lesson/LessonRenderer';
import { StudentAssignmentBar } from '../../features/student-workspace/StudentAssignmentBar';
import { PracticeLesson } from './PracticeLesson';
import { IrregularVerbsLesson } from './IrregularVerbsLesson';
import { HotWheelsLesson } from './HotWheelsLesson';
import { PastSimpleDetectiveLesson } from './PastSimpleDetectiveLesson';

export function LessonPage() {
  const { lessonId } = useParams();
  const content = loadAllContent();
  const lesson = content.lessons.find((item) => item.id === lessonId);

  if (lessonId?.startsWith('practice-')) return <PracticeLesson />;
  if (lessonId === 'irregular-verbs-mascot-mystery')
    return (
      <>
        <main className="page-shell lesson-assignment-shell">
          <StudentAssignmentBar mode="lesson" itemId={lessonId} />
        </main>
        <PastSimpleDetectiveLesson />
      </>
    );
  if (lessonId === 'spotlight-6-module-3c-hot-wheels')
    return (
      <>
        <main className="page-shell lesson-assignment-shell">
          <StudentAssignmentBar mode="lesson" itemId={lessonId} />
        </main>
        <HotWheelsLesson />
      </>
    );
  if (lessonId === 'irregular-verbs-holiday')
    return (
      <>
        <main className="page-shell lesson-assignment-shell">
          <StudentAssignmentBar mode="lesson" itemId={lessonId} />
        </main>
        <IrregularVerbsLesson />
      </>
    );

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
