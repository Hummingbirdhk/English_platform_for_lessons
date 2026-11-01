import { useState } from 'react';
import { FamilyPortrait } from './FamilyPortrait';
import './familyVocabulary.css';

type PersonKind =
  | 'grandpa'
  | 'mom'
  | 'dad'
  | 'grandma'
  | 'sister'
  | 'brother'
  | 'strong'
  | 'weak'
  | 'beautiful'
  | 'big'
  | 'small'
  | 'kind'
  | 'ugly'
  | 'young'
  | 'old';
type Word = { term: string; translation: string; example: string; portrait: PersonKind };
const family: Word[] = [
  { term: 'grandpa', translation: 'дедушка', example: 'This is my grandpa.', portrait: 'grandpa' },
  { term: 'mom', translation: 'мама', example: 'This is my mom.', portrait: 'mom' },
  { term: 'dad', translation: 'папа', example: 'This is my dad.', portrait: 'dad' },
  { term: 'grandma', translation: 'бабушка', example: 'This is my grandma.', portrait: 'grandma' },
  { term: 'sister', translation: 'сестра', example: 'This is my sister.', portrait: 'sister' },
  { term: 'brother', translation: 'брат', example: 'This is my brother.', portrait: 'brother' },
];
const extras: Word[] = [
  { term: 'uncle', translation: 'дядя', example: 'This is my uncle.', portrait: 'dad' },
  { term: 'aunt', translation: 'тётя', example: 'This is my aunt.', portrait: 'mom' },
  { term: 'husband', translation: 'муж', example: 'He is her husband.', portrait: 'dad' },
  { term: 'wife', translation: 'жена', example: 'She is his wife.', portrait: 'mom' },
  { term: 'parents', translation: 'родители', example: 'My parents are at home.', portrait: 'mom' },
  {
    term: 'children',
    translation: 'дети',
    example: 'The children are playing.',
    portrait: 'sister',
  },
];
const adjectives: Word[] = [
  { term: 'kind', translation: 'добрый', example: 'She is kind to her grandpa.', portrait: 'kind' },
  {
    term: 'beautiful',
    translation: 'красивый',
    example: 'She is beautiful.',
    portrait: 'beautiful',
  },
  { term: 'strong', translation: 'сильный', example: 'He is strong.', portrait: 'strong' },
  { term: 'weak', translation: 'слабый', example: 'The man feels weak today.', portrait: 'weak' },
  { term: 'big', translation: 'большой', example: 'He is a big man.', portrait: 'big' },
  { term: 'small', translation: 'маленький', example: 'The child is small.', portrait: 'small' },
  { term: 'old', translation: 'старый', example: 'My grandpa is old.', portrait: 'old' },
  { term: 'young', translation: 'молодой', example: 'My brother is young.', portrait: 'young' },
];
function pronounce(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = 'en-US';
  speech.rate = 0.85;
  window.speechSynthesis.speak(speech);
}
export function FamilyVocabulary() {
  const [selected, setSelected] = useState<Word>(family[1]);
  return (
    <article className="family-vocab">
      <header className="family-vocab__heading">
        <span className="family-vocab__eyebrow">VOCABULARY · GRADE 6</span>
        <h1>
          Family Members <span aria-hidden="true">✳</span>
        </h1>
        <p>Click, learn and speak. Choose a person or a word to see its meaning.</p>
      </header>
      <div className="family-vocab__layout">
        <div className="family-vocab__left">
          <section className="family-scene" aria-label="Family members">
            <div className="family-scene__people">
              {family.map((person) => (
                <button
                  key={person.term}
                  type="button"
                  className={`family-person${selected.term === person.term ? ' family-person--active' : ''}`}
                  aria-pressed={selected.term === person.term}
                  onClick={() => setSelected(person)}
                >
                  <FamilyPortrait kind={person.portrait} className="family-person__portrait" />
                  <span className="family-person__label">{person.term}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="family-selected" aria-live="polite">
            <div className="family-selected__word">
              <strong>{selected.term}</strong>
              <span>{selected.translation}</span>
            </div>
            <button
              type="button"
              onClick={() => pronounce(selected.term)}
              aria-label={`Listen to ${selected.term}`}
            >
              🔊 Listen
            </button>
            <p>{selected.example}</p>
          </section>
        </div>
        <section className="family-extras">
          <h2>📖 More family words</h2>
          <div className="family-extras__grid">
            {extras.map((word) => (
              <button
                key={word.term}
                type="button"
                onClick={() => setSelected(word)}
                aria-pressed={selected.term === word.term}
              >
                <strong>{word.term}</strong>
              </button>
            ))}
          </div>
          <p className="family-variant">🇬🇧 mum, mummy · 🇺🇸 mom, mommy</p>
        </section>
      </div>
      <section className="family-adjectives">
        <h2>⭐ Adjectives</h2>
        <div className="family-adjectives__grid">
          {adjectives.map((word) => (
            <button
              key={word.term}
              type="button"
              onClick={() => setSelected(word)}
              aria-pressed={selected.term === word.term}
            >
              <FamilyPortrait kind={word.portrait} className="family-adjectives__portrait" />
              <strong>{word.term}</strong>
              <span>{word.translation}</span>
            </button>
          ))}
        </div>
      </section>
    </article>
  );
}
