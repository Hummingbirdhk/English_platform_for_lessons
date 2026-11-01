import { useEffect, useState } from 'react';
import { cloudClient } from '../../shared/config/cloud';
import './studentHomeworkReview.css';
import {
  getSubmissions,
  getSubmissionFiles,
  reviewHomework,
  openHomeworkFile,
  downloadHomeworkFile,
  type Submission,
  type SubmissionFile,
} from '../../shared/lib/homeworkSubmissions';

type Entry = {
  student_id: string;
  lesson_date: string;
  workbook: string;
  textbook: string;
  extra_task: string;
  updated_at: string;
};

export function StudentHomeworkReview({ studentId }: { studentId: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [files, setFiles] = useState<Record<string, SubmissionFile[]>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [reviewError, setReviewError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    void cloudClient
      .select<Entry[]>(
        'student_homework_entries',
        `select=student_id,lesson_date,workbook,textbook,extra_task,updated_at&student_id=eq.${encodeURIComponent(studentId)}&order=lesson_date.desc&limit=8`,
      )
      .then((rows) => {
        if (active) {
          setEntries(rows);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setError('Не удалось загрузить домашние задания ученика.');
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [studentId, refresh]);

  useEffect(() => {
    let active = true;
    void getSubmissions(studentId)
      .then(async (rows) => {
        if (!active) return;
        setSubmissions(rows);
        const grouped = await Promise.all(
          rows.map(async (row) => [row.id, await getSubmissionFiles(row.id)] as const),
        );
        if (active) setFiles(Object.fromEntries(grouped));
      })
      .catch(() => {
        if (active)
          setReviewError('Не удалось загрузить отправленные работы. Проверь настройки Supabase.');
      });
    return () => {
      active = false;
    };
  }, [studentId, refresh]);
  async function saveReview(id: string, status: 'reviewed' | 'revision') {
    try {
      await reviewHomework(id, status, comments[id] ?? '');
      setRefresh((value) => value + 1);
    } catch {
      setReviewError('Не удалось сохранить проверку.');
    }
  }
  return (
    <article className="teacher-panel teacher-homework-review">
      <div className="teacher-panel__heading">
        <h2>Домашка ученика</h2>
        <button
          type="button"
          className="teacher-homework-review__refresh"
          onClick={() => setRefresh((value) => value + 1)}
        >
          Обновить
        </button>
      </div>
      {error ? <p role="alert">{error}</p> : null}
      {loading ? <p>Загружаю домашние задания…</p> : null}
      {entries.length === 0 && !error && !loading ? (
        <p>Ученик ещё не заполнил домашнюю работу.</p>
      ) : null}
      <div className="teacher-submitted-works">
        <h3>Отправленные работы</h3>
        {reviewError ? <p role="alert">{reviewError}</p> : null}
        {submissions.length === 0 ? <p>Пока нет отправленных файлов.</p> : null}
        {submissions.map((submission) => (
          <section className="teacher-submitted-work" key={submission.id}>
            <strong>
              {submission.lesson_date.split('-').reverse().join('.')} ·{' '}
              {submission.status === 'submitted'
                ? 'На проверке'
                : submission.status === 'reviewed'
                  ? 'Проверено'
                  : 'На доработке'}
            </strong>
            {(files[submission.id] ?? []).map((file) => (
              <div className="teacher-submitted-work__file" key={file.id}>
                <span>{file.original_name}</span>
                <button type="button" onClick={() => void openHomeworkFile(file.storage_path)}>Открыть</button>
                <button type="button" onClick={() => void downloadHomeworkFile(file.storage_path, file.original_name).catch(() => setReviewError('Не удалось скачать файл.'))}>Скачать</button>
              </div>
            ))}
            <textarea
              aria-label="Комментарий преподавателя"
              placeholder="Комментарий к работе"
              value={comments[submission.id] ?? submission.teacher_comment}
              onChange={(event) =>
                setComments({ ...comments, [submission.id]: event.target.value })
              }
            />
            <div className="teacher-submitted-work__actions">
              <button type="button" onClick={() => void saveReview(submission.id, 'reviewed')}>
                Проверено
              </button>
              <button type="button" onClick={() => void saveReview(submission.id, 'revision')}>
                На доработку
              </button>
            </div>
          </section>
        ))}
      </div>
      <div className="teacher-homework-review__entries">
        {entries.map((entry) => (
          <section className="teacher-homework-review__entry" key={entry.lesson_date}>
            <div className="teacher-homework-review__date">
              <span>Занятие</span>
              <strong>{entry.lesson_date.split('-').reverse().join('.')}</strong>
            </div>
            <div className="teacher-homework-review__content">
              {entry.workbook ? (
                <p>
                  <strong>Рабочая тетрадь</strong>
                  <span>{entry.workbook}</span>
                </p>
              ) : null}
              {entry.textbook ? (
                <p>
                  <strong>Учебник</strong>
                  <span>{entry.textbook}</span>
                </p>
              ) : null}
              {entry.extra_task ? (
                <p>
                  <strong>Дополнительное задание</strong>
                  <span>{entry.extra_task}</span>
                </p>
              ) : null}
              {!entry.workbook && !entry.textbook && !entry.extra_task ? (
                <p>Задания пока не заполнены.</p>
              ) : null}
            </div>
            <div className="teacher-homework-review__updated">
              Изменено {new Date(entry.updated_at).toLocaleString('ru-RU')}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
