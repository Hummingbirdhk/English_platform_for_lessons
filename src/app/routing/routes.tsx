import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { TeacherGate } from '../../features/teacher-auth/TeacherGate';

const HomePage = lazy(() =>
  import('../../pages/home/HomePage').then((module) => ({ default: module.HomePage })),
);
const LessonPage = lazy(() =>
  import('../../pages/lesson/LessonPage').then((module) => ({ default: module.LessonPage })),
);
const LessonsPage = lazy(() =>
  import('../../pages/lessons/LessonsPage').then((module) => ({ default: module.LessonsPage })),
);
const MaterialPage = lazy(() =>
  import('../../pages/materials/MaterialPage').then((module) => ({
    default: module.MaterialPage,
  })),
);
const MaterialsPage = lazy(() =>
  import('../../pages/materials/MaterialsPage').then((module) => ({
    default: module.MaterialsPage,
  })),
);
const NotFoundPage = lazy(() =>
  import('../../pages/not-found/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
);
const StudentPage = lazy(() =>
  import('../../pages/students/StudentPage').then((module) => ({ default: module.StudentPage })),
);
const StudentsPage = lazy(() =>
  import('../../pages/students/StudentsPage').then((module) => ({
    default: module.StudentsPage,
  })),
);
const TeacherDashboardPage = lazy(() =>
  import('../../pages/teacher/TeacherDashboardPage').then((module) => ({
    default: module.TeacherDashboardPage,
  })),
);
const StudentPreparationPage = lazy(() =>
  import('../../pages/teacher/StudentPreparationPage').then((module) => ({
    default: module.StudentPreparationPage,
  })),
);
const TeacherLoginPage = lazy(() =>
  import('../../pages/teacher/TeacherLoginPage').then((module) => ({
    default: module.TeacherLoginPage,
  })),
);

function RouteFallback() {
  return <main className="page-shell">Загрузка…</main>;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/materials/:materialId" element={<MaterialPage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:studentId" element={<StudentPage />} />
        <Route path="/teacher/login" element={<TeacherLoginPage />} />
        <Route
          path="/teacher"
          element={
            <TeacherGate>
              <TeacherDashboardPage />
            </TeacherGate>
          }
        />
        <Route
          path="/teacher/students/:studentId/preparation"
          element={
            <TeacherGate>
              <StudentPreparationPage />
            </TeacherGate>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
