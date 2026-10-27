import { useMemo, useState } from 'react';
import { loadAllContent } from '../../content/loadContent';
import './DictionaryPage.css';

const partNames: Record<string, string> = {
  noun: 'существительное',
  verb: 'глагол',
  adjective: 'прилагательное',
  adverb: 'наречие',
  phrase: 'фраза',
  'phrasal verb': 'фразовый глагол',
  phrasal_verb: 'фразовый глагол',
  idiom: 'идиома',
  preposition: 'предлог',
  pronoun: 'местоимение',
  conjunction: 'союз',
};
const categoryIcons = ['⌂', '✦', '▣', '◈', '✿', '◎', '♧', '◇'];
const categoryColors = ['pink', 'yellow', 'blue', 'green', 'orange', 'lavender'];

export function DictionaryPage() {
  const collections = useMemo(
    () =>
      loadAllContent()
        .materials.filter(
          (item) => item.type === 'vocabulary' && item.tags.includes('excel-import'),
        )
        .sort((a, b) => a.title.localeCompare(b.title, 'ru')),
    [],
  );
  const entries = useMemo(
    () =>
      collections.flatMap((collection) =>
        collection.type === 'vocabulary'
          ? collection.items.map((word, index) => ({
              ...word,
              id: collection.id + ':' + index,
              topic: collection.title,
              collectionId: collection.id,
            }))
          : [],
      ),
    [collections],
  );
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('all');
  const [part, setPart] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('english-dictionary-favorites') || '[]') as string[];
    } catch {
      return [];
    }
  });
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const visible = useMemo(
    () =>
      entries.filter((entry) => {
        const q = search.trim().toLocaleLowerCase();
        return (
          (topic === 'all' || entry.collectionId === topic) &&
          (part === 'all' || entry.partOfSpeech === part) &&
          (!onlyFavorites || favorites.includes(entry.id)) &&
          (!q ||
            [entry.term, entry.translation, entry.topic].some((v) =>
              v.toLocaleLowerCase().includes(q),
            ))
        );
      }),
    [entries, search, topic, part, onlyFavorites, favorites],
  );
  const focused = visible.find((item) => item.id === selected) ?? visible[0];
  const currentIndex = focused ? visible.findIndex((item) => item.id === focused.id) : -1;
  const types = Array.from(
    new Set(entries.map((entry) => entry.partOfSpeech).filter((x): x is string => !!x)),
  ).sort();
  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      localStorage.setItem('english-dictionary-favorites', JSON.stringify(next));
      return next;
    });
  }
  function speak(word: string) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-GB';
      window.speechSynthesis.speak(utterance);
    }
  }
  return (
    <main className="page-shell dictionary-page">
      <section className="dictionary-hero">
        <div>
          <span className="dictionary-kicker">СЛОВАРЬ</span>
          <h1>
            Английские слова
            <br />
            по темам
          </h1>
          <p>
            Находи, изучай и сохраняй новые слова.
            <br />
            Весь словарь всегда под рукой.
          </p>
        </div>
        <div className="dictionary-hero-art" aria-hidden="true">
          <span>ABC</span>
          <span>✳</span>
        </div>
      </section>
      <div className="dictionary-layout">
        <section className="dictionary-catalog" aria-label="Поиск слов">
          <div className="dictionary-controls">
            <input
              aria-label="Поиск по словарю"
              type="search"
              placeholder="Найти слово, перевод или тему…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelected(null);
              }}
            />
            <select
              aria-label="Часть речи"
              value={part}
              onChange={(e) => {
                setPart(e.target.value);
                setSelected(null);
              }}
            >
              <option value="all">Все части речи</option>
              {types.map((value) => (
                <option key={value} value={value}>
                  {partNames[value] ?? value}
                </option>
              ))}
            </select>
            <button
              className={onlyFavorites ? 'dictionary-filter active' : 'dictionary-filter'}
              type="button"
              onClick={() => setOnlyFavorites((v) => !v)}
            >
              ★ Избранное
            </button>
          </div>
          <div className="dictionary-section-heading">
            <h2>Темы словаря</h2>
            <span>{collections.length} разделов</span>
          </div>
          <div className="dictionary-topics">
            <button
              type="button"
              className={topic === 'all' ? 'dictionary-topic selected' : 'dictionary-topic'}
              onClick={() => {
                setTopic('all');
                setSelected(null);
              }}
            >
              <span className="dictionary-topic-icon">◎</span>
              <strong>Все темы</strong>
              <small>{entries.length} слов и выражений</small>
            </button>
            {collections.slice(0, showAllTopics ? undefined : 7).map((collection, index) => (
              <button
                type="button"
                key={collection.id}
                className={`dictionary-topic ${categoryColors[index % categoryColors.length]} ${topic === collection.id ? 'selected' : ''}`}
                onClick={() => {
                  setTopic(collection.id);
                  setSelected(null);
                }}
              >
                <span className="dictionary-topic-icon">
                  {categoryIcons[index % categoryIcons.length]}
                </span>
                <strong>{collection.title}</strong>
                <small>{collection.type === 'vocabulary' ? collection.items.length : 0} слов</small>
              </button>
            ))}
            {collections.length > 7 && (
              <button
                type="button"
                className="dictionary-topic dictionary-more"
                onClick={() => setShowAllTopics((v) => !v)}
              >
                <span className="dictionary-topic-icon">•••</span>
                <strong>{showAllTopics ? 'Свернуть' : 'Остальные темы'}</strong>
                <small>
                  {showAllTopics ? 'Скрыть темы' : `Ещё ${collections.length - 7} разделов`}
                </small>
              </button>
            )}
          </div>
          <div className="dictionary-section-heading">
            <h2>Слова и выражения</h2>
            <span>{visible.length} записей</span>
          </div>
          {visible.length ? (
            <div className="dictionary-word-list">
              {visible.slice(0, 120).map((entry) => (
                <button
                  type="button"
                  key={entry.id}
                  className={
                    focused?.id === entry.id ? 'dictionary-word active' : 'dictionary-word'
                  }
                  onClick={() => setSelected(entry.id)}
                >
                  <span className="dictionary-word-main">
                    <strong>{entry.term}</strong>
                    <span>{entry.translation}</span>
                  </span>
                  <small>{entry.topic}</small>
                  <span aria-hidden="true">›</span>
                </button>
              ))}
              {visible.length > 120 && (
                <p className="dictionary-list-note">
                  Показаны первые 120 слов. Уточни поиск или выбери тему, чтобы найти остальные.
                </p>
              )}
            </div>
          ) : (
            <p className="dictionary-empty">Ничего не найдено. Попробуй другой запрос или тему.</p>
          )}
        </section>
        <aside className="dictionary-detail" aria-label="Карточка слова">
          {focused ? (
            <>
              <div className="dictionary-detail-top">
                <span>
                  Слово {currentIndex + 1} из {visible.length}
                </span>
                <div>
                  <button
                    type="button"
                    disabled={currentIndex <= 0}
                    onClick={() => setSelected(visible[currentIndex - 1].id)}
                    aria-label="Предыдущее слово"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    disabled={currentIndex >= visible.length - 1}
                    onClick={() => setSelected(visible[currentIndex + 1].id)}
                    aria-label="Следующее слово"
                  >
                    ›
                  </button>
                </div>
              </div>
              <div className="dictionary-detail-title">
                <h2>{focused.term}</h2>
                <button
                  type="button"
                  aria-label="Прослушать слово"
                  onClick={() => speak(focused.term)}
                >
                  ◖))
                </button>
                <button
                  type="button"
                  aria-label="Добавить в избранное"
                  className={favorites.includes(focused.id) ? 'saved' : ''}
                  onClick={() => toggleFavorite(focused.id)}
                >
                  {favorites.includes(focused.id) ? '★' : '☆'}
                </button>
              </div>
              <div className="dictionary-tags">
                <span>
                  {partNames[focused.partOfSpeech ?? ''] ?? focused.partOfSpeech ?? 'выражение'}
                </span>
                <span>{focused.topic}</span>
              </div>
              {focused.pronunciation && (
                <p className="dictionary-pronunciation">{focused.pronunciation}</p>
              )}
              <p className="dictionary-translation">{focused.translation}</p>
              {focused.example ? (
                <section className="dictionary-examples">
                  <h3>Пример употребления</h3>
                  <div>
                    <strong>{focused.example.en}</strong>
                    <p>{focused.example.ru}</p>
                  </div>
                </section>
              ) : (
                <p className="dictionary-source-note">
                  В исходной выгрузке пример для этого слова не указан.
                </p>
              )}
              {focused.collocations?.length ? (
                <section className="dictionary-collocations">
                  <h3>Устойчивые сочетания</h3>
                  {focused.collocations.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </section>
              ) : null}
              <div className="dictionary-detail-actions">
                <button type="button" onClick={() => toggleFavorite(focused.id)}>
                  {favorites.includes(focused.id) ? '★ В избранном' : '☆ Сохранить слово'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (currentIndex < visible.length - 1)
                      setSelected(visible[currentIndex + 1].id);
                  }}
                  disabled={currentIndex >= visible.length - 1}
                >
                  Следующее слово →
                </button>
              </div>
            </>
          ) : (
            <p>Выбери слово, чтобы увидеть перевод и информацию о нём.</p>
          )}
        </aside>
      </div>
    </main>
  );
}
