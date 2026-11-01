import { cloudClient } from '../config/cloud';

export type Submission = {
  id: string;
  student_id: string;
  lesson_date: string;
  status: 'submitted' | 'reviewed' | 'revision';
  teacher_comment: string;
  created_at: string;
};
export type SubmissionFile = {
  id: string;
  submission_id: string;
  storage_path: string;
  original_name: string;
  size_bytes: number;
};
const bucket = 'homework-submissions';
const allowed = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
export async function getSubmissions(studentId: string) {
  return cloudClient.select<Submission[]>(
    'homework_submissions',
    `select=*&student_id=eq.${encodeURIComponent(studentId)}&order=lesson_date.desc`,
  );
}
export async function getSubmissionFiles(submissionId: string) {
  return cloudClient.select<SubmissionFile[]>(
    'homework_submission_files',
    `select=*&submission_id=eq.${encodeURIComponent(submissionId)}`,
  );
}
export async function sendHomework(studentId: string, date: string, files: File[]) {
  if (!date || files.length === 0) throw new Error('Выбери дату и прикрепи работу.');
  if (files.some((f) => f.size > 20 * 1024 * 1024 || !allowed.includes(f.type)))
    throw new Error('Разрешены JPG, PNG, WebP, PDF и DOCX до 20 МБ.');
  const previous = await getSubmissions(studentId);
  if (previous.some((s) => s.lesson_date === date))
    throw new Error('Работа за эту дату уже отправлена.');
  const rows = await cloudClient.insert<Submission[]>('homework_submissions', {
    student_id: studentId,
    lesson_date: date,
  });
  const submission = rows[0];
  if (!submission) throw new Error('Не удалось создать отправку.');
  for (const file of files) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-90);
    const path = `${studentId}/${submission.id}/${crypto.randomUUID()}-${safeName}`;
    await cloudClient.uploadPrivateFile(bucket, path, file);
    await cloudClient.insert('homework_submission_files', {
      submission_id: submission.id,
      storage_path: path,
      original_name: file.name,
      size_bytes: file.size,
    });
  }
  return submission;
}
export async function openHomeworkFile(path: string) {
  const url = await cloudClient.getPrivateFileUrl(bucket, path);
  window.open(url, '_blank', 'noopener,noreferrer');
}
export async function reviewHomework(id: string, status: 'reviewed' | 'revision', comment: string) {
  await cloudClient.update('homework_submissions', `id=eq.${encodeURIComponent(id)}`, {
    status,
    teacher_comment: comment,
    updated_at: new Date().toISOString(),
  });
}

export async function downloadHomeworkFile(path: string, filename: string) {
  const url = await cloudClient.getPrivateFileUrl(bucket, path);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Не удалось скачать файл.');
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
}
