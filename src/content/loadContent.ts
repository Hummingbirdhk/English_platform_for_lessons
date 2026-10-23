import type { ContentBundle, ExerciseDefinition, Lesson, Material, StudentProfile } from './types';

const lessonModules = import.meta.glob('./lessons/**/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Lesson>;

const exerciseModules = import.meta.glob('./exercises/**/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, ExerciseDefinition>;

const materialModules = import.meta.glob('./materials/**/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Material>;

const studentModules = import.meta.glob('./students/**/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, StudentProfile>;

export function loadAllContent(): ContentBundle {
  return {
    lessons: Object.values(lessonModules),
    exercises: Object.values(exerciseModules),
    materials: Object.values(materialModules),
    students: Object.values(studentModules),
  };
}

export function findLessonById(id: string): Lesson | undefined {
  return loadAllContent().lessons.find((lesson) => lesson.id === id);
}

export function findMaterialById(id: string): Material | undefined {
  return loadAllContent().materials.find((material) => material.id === id);
}

export function findStudentById(id: string): StudentProfile | undefined {
  return loadAllContent().students.find((student) => student.id === id);
}
