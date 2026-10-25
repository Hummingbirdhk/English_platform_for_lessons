import { useEffect, useState } from 'react';
import { cloudClient } from '../../shared/config/cloud';

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
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

  return (
    <article className="teacher-panel">
      <div className="teacher-panel__heading">
        <h2>Домашка ученика</h2>
        <button type="button" onClick={() => setRefresh((value) => value + 1)}>
          Обновить
        </button>
      </div>
      {error ? <p role="alert">{error}</p> : null}
      {loading ? <p>Загружаю домашние задания…</p> : null}
      {entries.length === 0 && !error && !loading ? <p>Ученик ещё не заполнил домашнюю работу.</p> : null}
      <div className="teacher-history">
        {entries.map((entry) => (
          <div className="teacher-history-row" key={entry.lesson_date}>
            <strong>{entry.lesson_date.split('-').reverse().join('.')}</strong>
            <div>
              {entry.workbook ? <span>Рабочая тетрадь: {entry.workbook}</span> : null}
              {entry.textbook ? <span>Учебник: {entry.textbook}</span> : null}
              {entry.extra_task ? <span>Дополнительно: {entry.extra_task}</span> : null}
            </div>
            <em>Изменено: {new Date(entry.updated_at).toLocaleString('ru-RU')}</em>
          </div>
        ))}
      </div>
    </article>
  );
}
