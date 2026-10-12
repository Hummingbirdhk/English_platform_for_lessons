import type { ContentBundle, ExerciseDefinition, Lesson } from './types';
const lessonModules = import.meta.glob('./lessons/**/*.json', { eager: true, import: 'default' }) as Record<string, Lesson>;
const exerciseModules = import.meta.glob('./exercises/**/*.json', { eager: true, import: 'default' }) as Record<string, ExerciseDefinition>;
export function loadAllContent(): ContentBundle { return { lessons: Object.values(lessonModules), exercises: Object.values(exerciseModules) }; }
export function findLessonById(id: string): Lesson | undefined { return loadAllContent().lessons.find((lesson) => lesson.id === id); }
