import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/home/HomePage';
import { LessonPage } from '../../pages/lesson/LessonPage';
import { LessonsPage } from '../../pages/lessons/LessonsPage';
import { MaterialPage } from '../../pages/materials/MaterialPage';
import { MaterialsPage } from '../../pages/materials/MaterialsPage';
import { NotFoundPage } from '../../pages/not-found/NotFoundPage';
import { StudentPage } from '../../pages/students/StudentPage';
import { StudentsPage } from '../../pages/students/StudentsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/materials" element={<MaterialsPage />} />
      <Route path="/materials/:materialId" element={<MaterialPage />} />
      <Route path="/lessons" element={<LessonsPage />} />
      <Route path="/lesson/:lessonId" element={<LessonPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/students/:studentId" element={<StudentPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
