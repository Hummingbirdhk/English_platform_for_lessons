import { useCallback, useEffect, useSyncExternalStore } from 'react';
import type { StudentProfile } from '../../content/types';
import { useTeacherAuth } from '../teacher-auth/teacherAuthStore';
import { fetchCloudWorkspace, persistCloudWorkspace } from './studentWorkspaceCloud';

export type StudentFocus = {
  main: string;
  practice: string;
  revision: string;
};

export type LessonHistoryItem = {
  id: string;
  date: string;
  title: string;
  detail: string;
  homework: string;
};

export type StudentWorkspace = {
  profileTags: string[];
  focus: StudentFocus;
  notes: string;
  assignedMaterialIds: string[];
  assignedLessonIds: string[];
  preparationNote: string;
  lessonHistory: LessonHistoryItem[];
  currentHomework: string;
};

const STORAGE_PREFIX = 'english-platform:student-workspace:';
const WORKSPACE_EVENT = 'english-platform:student-workspace-change';
const cloudCache = new Map<string, StudentWorkspace>();
const cloudLoaded = new Set<string>();
const cloudLoading = new Set<string>();

const defaultTeacherData: Record<
  string,
  Pick<StudentWorkspace, 'notes' | 'lessonHistory' | 'currentHomework'>
> = {
  'student-zlata': {
    notes:
      'Хорошо понимает правила, но торопится в заданиях и пропускает окончания -s / -es. На следующем уроке повторить daily routine и дать больше коротких устных вопросов.',
    lessonHistory: [
      {
        id: 'zlata-24-10',
        date: '24.10',
        title: 'Reading + speaking',
        detail: 'A Day in Tom’s Life',
        homework: 'WB: p.23, ex. 2–3',
      },
      {
        id: 'zlata-10-10',
        date: '10.10',
        title: 'Daily routine',
        detail: 'Vocabulary + speaking',
        homework: '5 предложений о своём дне',
      },
      {
        id: 'zlata-03-10',
        date: '03.10',
        title: 'Present Simple',
        detail: 'Questions + 3rd person',
        homework: 'WB: p.24, ex. 3',
      },
    ],
    currentHomework: 'WB: p.23, ex. 2–3',
  },
  'student-artem': {
    notes:
      'Быстро запоминает лексику, но пока путает формы неправильных глаголов. Лучше работает через короткие игровые задания и визуальные подсказки.',
    lessonHistory: [
      {
        id: 'artem-23-10',
        date: '23.10',
        title: 'Speaking practice',
        detail: 'Yesterday / last weekend',
        homework: '8 устных вопросов',
      },
      {
        id: 'artem-09-10',
        date: '09.10',
        title: 'Irregular verbs',
        detail: 'go / have / see / make / take',
        homework: 'карточки + WB',
      },
      {
        id: 'artem-02-10',
        date: '02.10',
        title: 'Past Simple',
        detail: 'was / were',
        homework: 'WB: p.41, ex. 1–2',
      },
    ],
    currentHomework: '8 устных вопросов',
  },
};

function makeDefaultWorkspace(student: StudentProfile): StudentWorkspace {
  const teacherData = defaultTeacherData[student.id];
  const focusItems = [...student.currentFocus];

  return {
    profileTags: focusItems,
    focus: {
      main: focusItems[0] ?? '',
      practice: focusItems[1] ?? '',
      revision: focusItems[2] ?? '',
    },
    notes: teacherData?.notes ?? '',
    assignedMaterialIds: [...student.assignedMaterialIds],
    assignedLessonIds: [...student.assignedLessonIds],
    preparationNote: '',
    lessonHistory: teacherData?.lessonHistory ?? [],
    currentHomework: teacherData?.currentHomework ?? '',
  };
}

function storageKey(studentId: string) {
  return `${STORAGE_PREFIX}${studentId}`;
}

function mergeStoredWorkspace(student: StudentProfile, stored: string | null): StudentWorkspace {
  const fallback = makeDefaultWorkspace(student);
  if (!stored) return fallback;

  try {
    const parsed = JSON.parse(stored) as Partial<StudentWorkspace>;
    return {
      ...fallback,
      ...parsed,
      focus: { ...fallback.focus, ...(parsed.focus ?? {}) },
      profileTags: parsed.profileTags ?? fallback.profileTags,
      assignedMaterialIds: parsed.assignedMaterialIds ?? fallback.assignedMaterialIds,
      assignedLessonIds: parsed.assignedLessonIds ?? fallback.assignedLessonIds,
      lessonHistory: parsed.lessonHistory ?? fallback.lessonHistory,
    };
  } catch {
    return fallback;
  }
}

export function readStudentWorkspace(student: StudentProfile): StudentWorkspace {
  const cached = cloudCache.get(student.id);
  if (cached) return cached;
  if (typeof window === 'undefined') return makeDefaultWorkspace(student);
  return mergeStoredWorkspace(student, window.localStorage.getItem(storageKey(student.id)));
}

export function writeStudentWorkspace(studentId: string, workspace: StudentWorkspace) {
  cloudCache.set(studentId, workspace);
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(storageKey(studentId), JSON.stringify(workspace));
  window.dispatchEvent(new CustomEvent(WORKSPACE_EVENT, { detail: { studentId } }));
}

export function saveStudentWorkspace(student: StudentProfile, workspace: StudentWorkspace) {
  writeStudentWorkspace(student.id, workspace);
  void persistCloudWorkspace(student, workspace).catch(() => undefined);
}

async function hydrateStudentWorkspace(student: StudentProfile) {
  if (cloudLoaded.has(student.id) || cloudLoading.has(student.id)) return;
  cloudLoading.add(student.id);

  try {
    const fallback = readStudentWorkspace(student);
    const remoteWorkspace = await fetchCloudWorkspace(student, fallback);
    if (remoteWorkspace) {
      cloudLoaded.add(student.id);
      writeStudentWorkspace(student.id, remoteWorkspace);
    }
  } finally {
    cloudLoading.delete(student.id);
  }
}

export function resetStudentWorkspace(studentId: string) {
  cloudCache.delete(studentId);
  cloudLoaded.delete(studentId);
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(storageKey(studentId));
  window.dispatchEvent(new CustomEvent(WORKSPACE_EVENT, { detail: { studentId } }));
}

export function useStudentWorkspace(student: StudentProfile | undefined) {
  const studentId = student?.id ?? '';
  const auth = useTeacherAuth();

  useEffect(() => {
    if (!student || auth.status !== 'authenticated') return;
    void hydrateStudentWorkspace(student);
  }, [student, auth.status]);

  const subscribe = useCallback(
    (notify: () => void) => {
      if (!studentId || typeof window === 'undefined') return () => undefined;

      const handleWorkspaceChange = (event: Event) => {
        const detail = (event as CustomEvent<{ studentId?: string }>).detail;
        if (!detail?.studentId || detail.studentId === studentId) notify();
      };

      const handleStorage = (event: StorageEvent) => {
        if (!event.key || event.key === storageKey(studentId)) notify();
      };

      window.addEventListener(WORKSPACE_EVENT, handleWorkspaceChange);
      window.addEventListener('storage', handleStorage);
      return () => {
        window.removeEventListener(WORKSPACE_EVENT, handleWorkspaceChange);
        window.removeEventListener('storage', handleStorage);
      };
    },
    [studentId],
  );

  const getSnapshot = useCallback(() => {
    if (!studentId) return '';
    const cached = cloudCache.get(studentId);
    if (cached) return JSON.stringify(cached);
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem(storageKey(studentId)) ?? '';
  }, [studentId]);

  const stored = useSyncExternalStore(subscribe, getSnapshot, () => '');
  const workspace = student ? mergeStoredWorkspace(student, stored || null) : null;

  function save(next: StudentWorkspace) {
    if (!student) return;
    saveStudentWorkspace(student, next);
  }

  function patch(patchValue: Partial<StudentWorkspace>) {
    if (!student || !workspace) return;
    save({ ...workspace, ...patchValue });
  }

  return { workspace, save, patch };
}
