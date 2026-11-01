import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readingTexts } from '../../content/reading/readingTexts';
import './readingLibrary.css';

export function ReadingLibraryPage() {
  const { readingId } = useParams();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Все форматы');
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const current = readingTexts.find((item) => item.id === readingId);
  const genres = ['Все форматы', ...new Set(readingTexts.map((item) => item.genre))];
  const filtered = readingTexts.filter(
    (item) =>
      (genre === 'Все форматы' || item.genre === genre) &&
      (item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.genre.toLowerCase().includes(search.toLowerCase())),
  );

  if (readingId && !current) {
    return (
      <main className="page-shell reading-library">
        <Link to="/reading">← Библиотека текстов</Link>
        <h1>Текст не найден</h1>
      </main>
    );
  }

  if (current) {
    return (
      <main className="page-shell reading-library">
        <Link className="reading-back" to="/reading">
          ← Все тексты
        </Link>
        <section className="reading-detail-heading">
          <span className="reading-eyebrow">
            {current.genre} · A2–B1 · {current.paragraphs.join(' ').split(/\s+/).length} слов
          </span>
          <h1>{current.title}</h1>
          <p>Прочитай текст в своём темпе. Незнакомые слова можно найти в словаре.</p>
          <Link className="reading-dictionary-link" to="/dictionary">
            Открыть словарь ↗
          </Link>
        </section>
        <article className="reading-paper" lang="en">
          {current.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
        <section className="reading-practice">
          <div>
            <span className="reading-eyebrow">AFTER READING</span>
            <h2>Проверь понимание</h2>
            <p>Ответь своими словами на английском. Ответы пока не оцениваются автоматически.</p>
          </div>
          <button type="button" onClick={() => setShowQuestions((value) => !value)}>
            {showQuestions ? 'Скрыть вопросы' : 'Перейти к вопросам'}
          </button>
          {showQuestions &&
            current.questions.map((question, index) => (
              <label className="reading-question" key={question}>
                <span>
                  {index + 1}. {question}
                </span>
                <textarea
                  aria-label={question}
                  rows={3}
                  value={answers[index] ?? ''}
                  onChange={(event) =>
                    setAnswers((previous) => ({ ...previous, [index]: event.target.value }))
                  }
                  placeholder="Write your answer here..."
                />
              </label>
            ))}
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell reading-library">
      <section className="reading-library-hero">
        <span className="reading-eyebrow">ENGLISH READING LIBRARY</span>
        <h1>Давай читать!</h1>
        <p>
          Истории, статьи и другие тексты на английском. Выбирай интересную тему, читай, переводи
          незнакомые слова и проверяй себя.
        </p>
      </section>
      <section className="reading-library-toolbar" aria-label="Поиск текстов">
        <input
          aria-label="Поиск текстов"
          placeholder="Найти текст по названию или формату"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          aria-label="Формат текста"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        >
          {genres.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </section>
      <section className="reading-library-grid" aria-label="Библиотека текстов">
        {filtered.map((item) => (
          <Link className="reading-tile" to={`/reading/${item.id}`} key={item.id}>
            <span className="reading-tile-number">
              {String(readingTexts.indexOf(item) + 1).padStart(2, '0')} / 20
            </span>
            <span className="reading-tile-type">{item.genre}</span>
            <h2>{item.title}</h2>
            <span className="reading-tile-footer">
              A2–B1 <span>Читать ↗</span>
            </span>
          </Link>
        ))}
      </section>
      {filtered.length === 0 ? <p>По этому запросу текстов нет.</p> : null}
    </main>
  );
}
