import { useState } from 'react';
import { useParams } from 'react-router-dom';
import a from '../../content/lesson-packs/practice-01.json';
import b from '../../content/lesson-packs/practice-02.json';
import c from '../../content/lesson-packs/practice-03.json';
import d from '../../content/lesson-packs/practice-04.json';
import e from '../../content/lesson-packs/practice-05.json';
import f from '../../content/lesson-packs/practice-06.json';
import g from '../../content/lesson-packs/practice-07.json';
import h from '../../content/lesson-packs/practice-08.json';
import i from '../../content/lesson-packs/practice-09.json';
import j from '../../content/lesson-packs/practice-10.json';
import './PracticeLesson.css';

type Exercise = (typeof a.exercises)[number];
const lessons = [a, b, c, d, e, f, g, h, i, j];
export function PracticeLesson() {
  const { lessonId } = useParams();
  const lesson = lessons.find((item) => item.id === lessonId);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);
  if (!lesson) return <main className="page-shell">Урок не найден.</main>;
  const exercise = lesson.exercises[step] as Exercise;
  const value = (key: string) => answers[key] ?? '';
  const save = (key: string, answer: string) => setAnswers((old) => ({ ...old, [key]: answer }));
  const next = () => {
    setStep((n) => Math.min(lesson.exercises.length - 1, n + 1));
    setRevealed(false);
    setAnswers({});
  };
  const previous = () => {
    setStep((n) => Math.max(0, n - 1));
    setRevealed(false);
    setAnswers({});
  };
  const speak = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      'script' in exercise ? String(exercise.script) : '',
    );
    utterance.lang = 'en-GB';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };
  return (
    <main className="page-shell practice-lesson">
      <header className="practice-hero">
        <span className="sticker sticker--white">УРОК · {lesson.level} · 40 МИН</span>
        <h1>{lesson.title}</h1>
        <p>{lesson.grammar}</p>
      </header>
      <nav className="practice-steps" aria-label="Части урока">
        {lesson.exercises.map((entry, index) => (
          <button
            key={entry.id}
            type="button"
            className={index === step ? 'active' : ''}
            onClick={() => {
              setStep(index);
              setAnswers({});
              setRevealed(false);
            }}
          >
            {index + 1}. {entry.section}
          </button>
        ))}
      </nav>
      <article className="practice-card">
        <div className="practice-card-top">
          <span>Упражнение {step + 1} из 6</span>
          <span>{exercise.minutes} минут</span>
        </div>
        <h2>{exercise.section}</h2>
        <p>{exercise.instructions ?? ''}</p>
        {exercise.type === 'matching' && (
          <div className="practice-fields">
            {exercise.pairs.map((pair, index) => (
              <label key={pair.word}>
                <strong>{pair.word}</strong>
                <select
                  value={value('match' + index)}
                  onChange={(event) => save('match' + index, event.target.value)}
                >
                  <option value="">Выбери перевод</option>
                  {[...exercise.pairs].reverse().map((option) => (
                    <option key={option.word} value={option.meaning}>
                      {option.meaning}
                    </option>
                  ))}
                </select>
                {revealed && (
                  <small>
                    {value('match' + index) === pair.meaning ? 'Верно' : 'Ответ: ' + pair.meaning}
                  </small>
                )}
              </label>
            ))}
          </div>
        )}
        {exercise.type === 'production' && (
          <>
            <p>Используй: {exercise.required_terms.join(', ')}</p>
            <textarea
              aria-label="Твои предложения"
              rows={7}
              value={value('text')}
              onChange={(event) => save('text', event.target.value)}
            />
            {revealed && <p className="practice-feedback">{exercise.evaluation}</p>}
          </>
        )}
        {exercise.type === 'fill_gap' && (
          <div className="practice-fields">
            {exercise.questions.map((q, index) => (
              <label key={index}>
                <strong>
                  {index + 1}. {q.text}
                </strong>
                <input
                  value={value('gap' + index)}
                  onChange={(event) => save('gap' + index, event.target.value)}
                  placeholder="Напиши ответ"
                />
                {revealed && <small>Ответ: {q.answer}</small>}
              </label>
            ))}
          </div>
        )}
        {exercise.type === 'teacher_checked' && (
          <>
            <textarea
              aria-label="Твой ответ"
              rows={7}
              value={value('text')}
              onChange={(event) => save('text', event.target.value)}
            />
            {revealed && <p className="practice-feedback">{exercise.answer_guidance}</p>}
          </>
        )}
        {exercise.type === 'reading_comprehension' && (
          <>
            <div className="practice-text">{exercise.passage}</div>
            <div className="practice-fields">
              {exercise.questions.map((q, index) => (
                <label key={index}>
                  <strong>{q.question}</strong>
                  <textarea
                    rows={2}
                    value={value('read' + index)}
                    onChange={(event) => save('read' + index, event.target.value)}
                  />
                  {revealed && <small>Ответ: {q.answer}</small>}
                </label>
              ))}
            </div>
          </>
        )}
        {exercise.type === 'listening_comprehension' && (
          <>
            <button type="button" className="practice-listen" onClick={speak}>
              ▶ Прослушать диалог
            </button>
            <p className="practice-muted">
              Озвучка средствами браузера. Если звук недоступен, преподаватель может прочитать
              текст.
            </p>
            {revealed && <div className="practice-text">{exercise.script}</div>}
            <div className="practice-fields">
              {exercise.questions.map((q, index) => (
                <label key={index}>
                  <strong>{q.question}</strong>
                  <textarea
                    rows={2}
                    value={value('listen' + index)}
                    onChange={(event) => save('listen' + index, event.target.value)}
                  />
                  {revealed && <small>Ответ: {q.answer}</small>}
                </label>
              ))}
            </div>
          </>
        )}
        <div className="practice-actions">
          <button type="button" disabled={step === 0} onClick={previous}>
            ← Назад
          </button>
          <button type="button" onClick={() => setRevealed((v) => !v)}>
            {revealed ? 'Скрыть ответы' : 'Проверить / показать ответы'}
          </button>
          <button type="button" disabled={step === 5} onClick={next}>
            Следующее →
          </button>
        </div>
      </article>
    </main>
  );
}
