import { useState } from 'react';
import './familyVocabulary.css';

type Word = {
  term: string;
  translation: string;
  example: string;
  portrait: string;
  pronunciation?: string;
};
const family: Word[] = [
  { term: 'grandpa', translation: 'дедушка', example: 'This is my grandpa.', portrait: '👴' },
  { term: 'mom', translation: 'мама', example: 'This is my mom.', portrait: '👩' },
  { term: 'dad', translation: 'папа', example: 'This is my dad.', portrait: '👨' },
  { term: 'grandma', translation: 'бабушка', example: 'This is my grandma.', portrait: '👵' },
  { term: 'sister', translation: 'сестра', example: 'This is my sister.', portrait: '👧' },
  { term: 'brother', translation: 'брат', example: 'This is my brother.', portrait: '👦' },
];
const extras: Word[] = [
  { term: 'mother', translation: 'мама', example: 'My mother is kind.', portrait: '👩' },
  { term: 'father', translation: 'папа', example: 'My father is tall.', portrait: '👨' },
  { term: 'uncle', translation: 'дядя', example: 'My uncle lives nearby.', portrait: '👨' },
  { term: 'aunt', translation: 'тётя', example: 'My aunt is a teacher.', portrait: '👩' },
  { term: 'husband', translation: 'муж', example: 'Her husband is a doctor.', portrait: '👨' },
  { term: 'wife', translation: 'жена', example: 'His wife is a musician.', portrait: '👩' },
  { term: 'parents', translation: 'родители', example: 'My parents are at home.', portrait: '👪' },
  { term: 'children', translation: 'дети', example: 'The children are playing.', portrait: '🧒' },
];
const adjectives: Word[] = [
  { term: 'old', translation: 'старый', example: 'My grandpa is old.', portrait: '👴' },
  { term: 'young', translation: 'молодой', example: 'My brother is young.', portrait: '👦' },
  { term: 'strong', translation: 'сильный', example: 'He is strong.', portrait: '💪' },
  { term: 'weak', translation: 'слабый', example: 'The man feels weak today.', portrait: '😮‍💨' },
  {
    term: 'beautiful',
    translation: 'красивый',
    example: 'She has a beautiful smile.',
    portrait: '👩',
  },
  { term: 'big', translation: 'большой', example: 'He is a big man.', portrait: '🧔' },
  { term: 'small', translation: 'маленький', example: 'The child is small.', portrait: '🧒' },
  { term: 'kind', translation: 'добрый', example: 'My grandma is kind.', portrait: '👩‍🦳' },
  {
    term: 'ugly',
    translation: 'некрасивый',
    example: 'The witch in the story is ugly.',
    portrait: '🧙‍♀️',
  },
];
function pronounce(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
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
        <p>Click on a person or a word to see its meaning and an example.</p>
      </header>
      <div className="family-vocab__top">
        <section className="family-scene" aria-label="Choose a family member">
          <div className="family-scene__sky" aria-hidden="true" />
          <div className="family-scene__people">
            {family.map((person) => (
              <button
                key={person.term}
                type="button"
                className={`family-person${selected.term === person.term ? ' family-person--active' : ''}`}
                onClick={() => setSelected(person)}
                aria-pressed={selected.term === person.term}
              >
                <span className="family-person__portrait" aria-hidden="true">
                  {person.portrait}
                </span>
                <span className="family-person__label">{person.term}</span>
              </button>
            ))}
          </div>
        </section>
        <section className="family-detail" aria-live="polite">
          <span className="family-vocab__eyebrow">WORD CARD</span>
          <div className="family-detail__word">
            <h2>{selected.term}</h2>
            <button
              type="button"
              aria-label={`Listen to ${selected.term}`}
              onClick={() => pronounce(selected.term)}
            >
              🔊
            </button>
          </div>
          <p className="family-detail__translation">{selected.translation}</p>
          <button
            className="family-detail__example"
            type="button"
            onClick={() => pronounce(selected.example)}
          >
            <span aria-hidden="true">🔊</span> {selected.example}
          </button>
        </section>
      </div>
      <div className="family-vocab__bottom">
        <section className="family-extras">
          <h2>📖 More family words</h2>
          <div className="family-extras__grid">
            {extras.map((word) => (
              <button
                type="button"
                key={word.term}
                onClick={() => setSelected(word)}
                aria-pressed={selected.term === word.term}
              >
                <strong>{word.term}</strong>
                <span> — {word.translation}</span>
              </button>
            ))}
          </div>
          <p className="family-variant">
            🇬🇧 mum, mummy <span>·</span> 🇺🇸 mom, mommy
          </p>
        </section>
        <section className="family-adjectives">
          <h2>⭐ Adjectives</h2>
          <p>Words to describe people.</p>
          <div className="family-adjectives__grid">
            {adjectives.map((word) => (
              <button
                type="button"
                key={word.term}
                onClick={() => setSelected(word)}
                aria-pressed={selected.term === word.term}
              >
                <span className="family-adjectives__portrait" aria-hidden="true">
                  {word.portrait}
                </span>
                <strong>{word.term}</strong>
                <span>{word.translation}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
