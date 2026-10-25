import type { StudentProfile } from '../../content/types';
import { cloudClient, isCloudConfigured } from '../../shared/config/cloud';

type StudentWorkspace = {
  profileTags: string[];
  focus: {
    main: string;
    practice: string;
    revision: string;
  };
  notes: string;
  assignedMaterialIds: string[];
  assignedLessonIds: string[];
  preparationNote: string;
  lessonHistory: Array<{
    id: string;
    date: string;
    title: string;
    detail: string;
    homework: string;
  }>;
  currentHomework: string;
};

export type CloudWorkspaceField = keyof StudentWorkspace;

type ProfileRow = {
  student_id: string;
  profile_tags: string[] | null;
  focus_main: string | null;
  focus_practice: string | null;
  focus_revision: string | null;
  current_homework: string | null;
};

type NoteRow = {
  student_id: string;
  notes: string | null;
};

type PreparationRow = {
  student_id: string;
  note: string | null;
};

type MaterialRow = {
  material_id: string;
};

type LessonRow = {
  lesson_id: string;
};

type HistoryRow = {
  id: string;
  lesson_date: string;
  title: string;
  detail: string | null;
  homework: string | null;
};

function formatHistoryDate(value: string) {
  const [year, month, day] = value.split('-');
  if (!year || !month || !day) return value;
  return `${day}.${month}`;
}

function toIsoDate(value: string) {
  const [day, month] = value.split('.');
  const year = new Date().getFullYear();
  if (!day || !month) return new Date().toISOString().slice(0, 10);
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export async function fetchCloudWorkspace(
  student: StudentProfile,
  fallback: StudentWorkspace,
): Promise<StudentWorkspace | null> {
  if (!isCloudConfigured || !cloudClient.getSession()) return null;

  const studentId = encodeURIComponent(student.id);

  const [profileRows, noteRows, preparationRows, materialRows, lessonRows, historyRows] =
    await Promise.all([
      cloudClient.select<ProfileRow[]>(
        'student_profile_state',
        `select=student_id,profile_tags,focus_main,focus_practice,focus_revision,current_homework&student_id=eq.${studentId}&limit=1`,
      ),
      cloudClient.select<NoteRow[]>(
        'teacher_notes',
        `select=student_id,notes&student_id=eq.${studentId}&limit=1`,
      ),
      cloudClient.select<PreparationRow[]>(
        'lesson_preparation',
        `select=student_id,note&student_id=eq.${studentId}&limit=1`,
      ),
      cloudClient.select<MaterialRow[]>(
        'assigned_materials',
        `select=material_id&student_id=eq.${studentId}&order=created_at.asc`,
      ),
      cloudClient.select<LessonRow[]>(
        'assigned_lessons',
        `select=lesson_id&student_id=eq.${studentId}&order=created_at.asc`,
      ),
      cloudClient.select<HistoryRow[]>(
        'lesson_history',
        `select=id,lesson_date,title,detail,homework&student_id=eq.${studentId}&order=lesson_date.desc,created_at.desc`,
      ),
    ]);

  const profile = profileRows[0];
  if (!profile) {
    await persistCloudWorkspace(student, fallback);
    return fallback;
  }

  return {
    profileTags: profile.profile_tags ?? fallback.profileTags,
    focus: {
      main: profile.focus_main ?? fallback.focus.main,
      practice: profile.focus_practice ?? fallback.focus.practice,
      revision: profile.focus_revision ?? fallback.focus.revision,
    },
    notes: noteRows[0]?.notes ?? fallback.notes,
    assignedMaterialIds: materialRows.map((row) => row.material_id),
    assignedLessonIds: lessonRows.map((row) => row.lesson_id),
    preparationNote: preparationRows[0]?.note ?? fallback.preparationNote,
    lessonHistory: historyRows.map((row) => ({
      id: row.id,
      date: formatHistoryDate(row.lesson_date),
      title: row.title,
      detail: row.detail ?? '',
      homework: row.homework ?? '',
    })),
    currentHomework: profile.current_homework ?? fallback.currentHomework,
  };
}

export async function persistCloudWorkspace(
  student: StudentProfile,
  workspace: StudentWorkspace,
  fields?: readonly CloudWorkspaceField[],
): Promise<void> {
  if (!isCloudConfigured || !cloudClient.getSession()) return;

  const fieldSet = fields ? new Set(fields) : null;
  const shouldPersist = (field: CloudWorkspaceField) => !fieldSet || fieldSet.has(field);

  await cloudClient.upsert('students', 'on_conflict=id', {
    id: student.id,
    display_name: student.displayName,
    grade: student.grade,
    level: student.level,
    curriculum: student.curriculum,
    updated_at: new Date().toISOString(),
  });

  const scalarWrites: Array<Promise<unknown>> = [];

  if (
    shouldPersist('profileTags') ||
    shouldPersist('focus') ||
    shouldPersist('currentHomework')
  ) {
    scalarWrites.push(
      cloudClient.upsert('student_profile_state', 'on_conflict=student_id', {
        student_id: student.id,
        profile_tags: workspace.profileTags,
        focus_main: workspace.focus.main,
        focus_practice: workspace.focus.practice,
        focus_revision: workspace.focus.revision,
        current_homework: workspace.currentHomework,
        updated_at: new Date().toISOString(),
      }),
    );
  }

  if (shouldPersist('notes')) {
    scalarWrites.push(
      cloudClient.upsert('teacher_notes', 'on_conflict=student_id', {
        student_id: student.id,
        notes: workspace.notes,
        updated_at: new Date().toISOString(),
      }),
    );
  }

  if (shouldPersist('preparationNote')) {
    scalarWrites.push(
      cloudClient.upsert('lesson_preparation', 'on_conflict=student_id', {
        student_id: student.id,
        note: workspace.preparationNote,
        updated_at: new Date().toISOString(),
      }),
    );
  }

  await Promise.all(scalarWrites);

  const studentFilter = `student_id=eq.${encodeURIComponent(student.id)}`;

  if (shouldPersist('assignedMaterialIds')) {
    await cloudClient.remove('assigned_materials', studentFilter);
    if (workspace.assignedMaterialIds.length > 0) {
      await cloudClient.insert(
        'assigned_materials',
        workspace.assignedMaterialIds.map((materialId) => ({
          student_id: student.id,
          material_id: materialId,
        })),
      );
    }
  }

  if (shouldPersist('assignedLessonIds')) {
    await cloudClient.remove('assigned_lessons', studentFilter);
    if (workspace.assignedLessonIds.length > 0) {
      await cloudClient.insert(
        'assigned_lessons',
        workspace.assignedLessonIds.map((lessonId) => ({
          student_id: student.id,
          lesson_id: lessonId,
        })),
      );
    }
  }

  if (shouldPersist('lessonHistory')) {
    await cloudClient.remove('lesson_history', studentFilter);
    if (workspace.lessonHistory.length > 0) {
      await cloudClient.insert(
        'lesson_history',
        workspace.lessonHistory.map((item) => ({
          student_id: student.id,
          lesson_date: toIsoDate(item.date),
          title: item.title,
          detail: item.detail,
          homework: item.homework,
        })),
      );
    }
  }
}
