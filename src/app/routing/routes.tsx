import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/home/HomePage';
import { LessonPage } from '../../pages/lesson/LessonPage';
import { NotFoundPage } from '../../pages/not-found/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lesson/:lessonId" element={<LessonPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
