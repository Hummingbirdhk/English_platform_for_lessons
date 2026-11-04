import { useState } from 'react';
import './IrregularVerbsLesson.css';

const classify = [
  { verb: 'travel', kind: 'regular' },
  { verb: 'choose', kind: 'irregular' },
  { verb: 'arrive', kind: 'regular' },
  { verb: 'teach', kind: 'irregular' },
  { verb: 'decide', kind: 'regular' },
  { verb: 'bring', kind: 'irregular' },
  { verb: 'enjoy', kind: 'regular' },
  { verb: 'catch', kind: 'irregular' },
];
const gaps = [
  {
    before: 'Although the museum was crowded, we',
    after: 'a quiet room where we could study the paintings.',
    verb: 'find',
    answer: 'found',
  },
  {
    before: 'My brother',
    after: 'his ticket, so we had to return to the hotel before the concert began.',
    verb: 'forget',
    answer: 'forgot',
  },
  {
    before: 'When the lights went out, the guide',
    after: 'a torch above her head so everyone could see the steps.',
    verb: 'hold',
    answer: 'held',
  },
  {
    before: 'Our classmates',
    after: 'the longer route because it offered a better view of the mountains.',
    verb: 'choose',
    answer: 'chose',
  },
  {
    before: 'I',
    after: 'a short review after I got home, even though I was exhausted.',
    verb: 'write',
    answer: 'wrote',
  },
];
const ordering = [
  {
    tokens: ['we', 'terrible,', 'hiking', 'Although', 'went', 'the weather', 'anyway.', 'was'],
    answer: [3, 5, 7, 1, 0, 4, 2, 6],
  },
  {
    tokens: ['because', 'She', 'cost', 'the jacket', 'didn’t', 'too much.', 'buy', 'it'],
    answer: [1, 4, 6, 3, 0, 7, 2, 5],
  },
  {
    tokens: ['the map', 'did', 'yesterday?', 'Where', 'that', 'you', 'lost', 'find', 'we'],
    answer: [3, 1, 5, 7, 0, 4, 8, 6, 2],
  },
  {
    tokens: ['after', 'We', 'the train', 'the guide', 'left', 'met', 'had', 'the station.'],
    answer: [1, 5, 3, 0, 2, 6, 4, 7],
  },
  {
    tokens: ['the truth', 'because', 'I', 'me.', 'told', 'she', 'trusted', 'her'],
    answer: [2, 4, 7, 0, 1, 5, 6, 3],
  },
];
const storyVerbs = [
  { base: 'go', answer: 'went' },
  { base: 'take', answer: 'took' },
  { base: 'meet', answer: 'met' },
  { base: 'tell', answer: 'told' },
  { base: 'lose', answer: 'lost' },
  { base: 'find', answer: 'found' },
  { base: 'see', answer: 'saw' },
  { base: 'spend', answer: 'spent' },
];
const trueFalse = [
  { text: 'The narrator travelled with a cousin.', answer: 'true' },
  { text: 'They expected an adventurous trip from the beginning.', answer: 'false' },
  { text: 'A photographer told them about a hidden beach.', answer: 'true' },
  { text: 'The phone was found near the lighthouse.', answer: 'false' },
  { text: 'The narrator regretted taking the detour.', answer: 'false' },
];
const matching = [
  { base: 'begin', past: 'began' },
  { base: 'bring', past: 'brought' },
  { base: 'catch', past: 'caught' },
  { base: 'choose', past: 'chose' },
  { base: 'feel', past: 'felt' },
  { base: 'leave', past: 'left' },
  { base: 'teach', past: 'taught' },
  { base: 'write', past: 'wrote' },
];
const matchOptions = ['wrote', 'left', 'caught', 'began', 'taught', 'felt', 'chose', 'brought'];
const exercises = [
  {
    title: 'Regular or irregular?',
    group: '01 · WARM-UP',
    instruction:
      'Sort the verbs into two categories. Regular verbs add -ed or -d; irregular verbs have special Past Simple forms.',
    amount: 8,
  },
  {
    title: 'Complete the sentences',
    group: '02 · GRAMMAR',
    instruction:
      'Write the Past Simple form of each verb in brackets. Read the whole sentence before answering.',
    amount: 5,
  },
  {
    title: 'Build the sentence',
    group: '03 · WORD ORDER',
    instruction:
      'Click the words in the correct order. Click a word in your answer to undo that word and everything after it.',
    amount: 5,
  },
  {
    title: 'My unexpected holiday',
    group: '04 · READING',
    instruction:
      'Read the story and complete eight gaps. Use the Past Simple form of each verb from the bank once.',
    amount: 8,
  },
  {
    title: 'True or False?',
    group: '05 · COMPREHENSION',
    instruction: 'Read the holiday story carefully. Decide if each statement is true or false.',
    amount: 5,
  },
  {
    title: 'Match the verb forms',
    group: '06 · REVISION',
    instruction: 'Match each base verb with its Past Simple form.',
    amount: 8,
  },
];
const story = [
  'Last autumn, I ',
  ' to a small coastal town with my cousin. We expected a quiet break, but the trip quickly became an adventure. On our first morning, we ',
  ' a bus to an old lighthouse, where we ',
  ' a local photographer. She ',
  ' us about a hidden beach and gave us a rough map. We followed the path through the forest, but halfway there I ',
  ' my phone. Luckily, my cousin ',
  ' it under a fallen tree. When we finally reached the beach, we ',
  ' dozens of colourful stones and ',
  ' almost an hour taking photographs. Although we returned home exhausted, I felt that the unexpected detour made our holiday unforgettable.',
];
const normalise = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase('en-US')
    .replace(/[.!?]+$/, '');
const getKey = (step: number, index: number) => `${step}-${index}`;

export function IrregularVerbsLesson() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [arrangements, setArrangements] = useState<number[][]>(ordering.map(() => []));
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const exercise = exercises[step];
  const answer = (index: number) => answers[getKey(step, index)] ?? '';
  const update = (index: number, value: string) => {
    setAnswers((current) => ({ ...current, [getKey(step, index)]: value }));
    setChecked((current) => ({ ...current, [step]: false }));
  };
  const setOrder = (index: number, next: number[]) => {
    setArrangements((current) => current.map((row, i) => (i === index ? next : row)));
    setChecked((current) => ({ ...current, [step]: false }));
  };
  const solution = (index: number) => {
    if (step === 0) return classify[index].kind;
    if (step === 1) return gaps[index].answer;
    if (step === 2) return ordering[index].answer.join(',');
    if (step === 3) return storyVerbs[index].answer;
    if (step === 4) return trueFalse[index].answer;
    return matching[index].past;
  };
  const actual = (index: number) =>
    step === 2 ? arrangements[index].join(',') : normalise(answer(index));
  const correct = (index: number) => actual(index) === solution(index);
  const score = Array.from({ length: exercise.amount }, (_, i) => correct(i)).filter(
    Boolean,
  ).length;
  const feedback = (index: number) => {
    if (!checked[step]) return null;
    return (
      <p
        className={
          correct(index) ? 'irv-feedback irv-feedback--correct' : 'irv-feedback irv-feedback--wrong'
        }
        role="status"
      >
        {correct(index)
          ? '✓ Correct!'
          : `Try again · Answer: ${step === 2 ? ordering[index].answer.map((i) => ordering[index].tokens[i]).join(' ') : solution(index)}`}
      </p>
    );
  };

  return (
    <main className="page-shell irv-page">
      <header className="irv-hero">
        <div className="irv-hero__copy">
          <span className="irv-pill">GRAMMAR PRACTICE · A2–B1</span>
          <h1>
            Past Simple:
            <br />
            Irregular Verbs
          </h1>
          <p>The Holiday That Didn’t Go to Plan</p>
          <div className="irv-hero__meta">
            <span>6 exercises</span>
            <span>35–45 min</span>
            <span>Past Simple only</span>
          </div>
        </div>
        <div className="irv-hero__asterisk" aria-hidden="true">
          ✳
        </div>
      </header>

      <section className="irv-reminder" aria-label="Grammar reminder">
        <div>
          <strong>Remember</strong>
          <p>
            Regular verbs: <b>travel → travelled</b> · Irregular verbs: <b>take → took</b>
          </p>
        </div>
        <p>
          After <strong>did</strong> and <strong>didn’t</strong>, use the base form:{' '}
          <i>Did you go?</i> · <i>I didn’t go.</i> We only use the first and second forms in this
          lesson.
        </p>
      </section>

      <section className="irv-workspace">
        <div className="irv-workspace__topline">
          <span>Exercise {step + 1} of 6</span>
          <strong>{Math.round(((step + 1) / 6) * 100)}%</strong>
        </div>
        <div className="irv-progress" aria-label="Lesson progress">
          {exercises.map((item, i) => (
            <span key={item.group} className={i <= step ? 'is-done' : ''} />
          ))}
        </div>
        <nav className="irv-tabs" aria-label="Choose exercise">
          {exercises.map((item, i) => (
            <button
              type="button"
              key={item.group}
              aria-current={i === step ? 'step' : undefined}
              className={i === step ? 'is-active' : ''}
              onClick={() => setStep(i)}
            >
              {i + 1}
            </button>
          ))}
        </nav>
        <span className="irv-eyebrow">{exercise.group}</span>
        <h2>{exercise.title}</h2>
        <p className="irv-instruction">{exercise.instruction}</p>

        {step === 0 && (
          <div className="irv-grid irv-grid--two">
            {classify.map((item, i) => (
              <label className="irv-answer-card" key={item.verb}>
                <strong>{item.verb}</strong>
                <select
                  value={answer(i)}
                  onChange={(e) => update(i, e.target.value)}
                  aria-label={`Verb type for ${item.verb}`}
                >
                  <option value="">Choose a type…</option>
                  <option value="regular">Regular</option>
                  <option value="irregular">Irregular</option>
                </select>
                {feedback(i)}
              </label>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="irv-column">
            {gaps.map((item, i) => (
              <label className="irv-answer-card" key={item.verb}>
                <small>SENTENCE {i + 1}</small>
                <span>
                  {item.before} <b>_____</b> {item.after} <em>({item.verb})</em>
                </span>
                <input
                  type="text"
                  value={answer(i)}
                  placeholder="Past Simple form…"
                  onChange={(e) => update(i, e.target.value)}
                  autoComplete="off"
                />
                {feedback(i)}
              </label>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="irv-column">
            {ordering.map((item, i) => (
              <div className="irv-answer-card irv-order" key={i}>
                <div className="irv-row">
                  <small>SENTENCE {i + 1}</small>
                  <button type="button" className="irv-reset" onClick={() => setOrder(i, [])}>
                    ↺ Reset
                  </button>
                </div>
                <div className="irv-assembled" aria-label={`Answer for sentence ${i + 1}`}>
                  {arrangements[i].length ? (
                    arrangements[i].map((tokenIndex, position) => (
                      <button
                        type="button"
                        key={tokenIndex}
                        title="Remove this and following words"
                        onClick={() => setOrder(i, arrangements[i].slice(0, position))}
                      >
                        {item.tokens[tokenIndex]}
                      </button>
                    ))
                  ) : (
                    <span>Click the words below to build your sentence…</span>
                  )}
                </div>
                <div className="irv-word-bank">
                  {item.tokens.map((token, index) => (
                    <button
                      type="button"
                      key={index}
                      disabled={arrangements[i].includes(index)}
                      onClick={() => setOrder(i, [...arrangements[i], index])}
                    >
                      {token}
                    </button>
                  ))}
                </div>
                {feedback(i)}
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="irv-column">
            <div className="irv-verb-bank">
              <strong>Verb bank · use each verb once</strong>
              <div>
                {storyVerbs.map((item) => (
                  <span key={item.base}>{item.base}</span>
                ))}
              </div>
            </div>
            <div className="irv-story">
              {story.map((piece, index) => (
                <span key={index}>
                  {piece}
                  {index < 8 ? <strong className="irv-blank">___ ({index + 1})</strong> : null}
                </span>
              ))}
            </div>
            <p className="irv-instruction">Complete gaps 1–8 with the correct Past Simple forms.</p>
            <div className="irv-grid irv-grid--two">
              {storyVerbs.map((item, i) => (
                <label key={item.base} className="irv-answer-card">
                  <small>
                    GAP {i + 1} · {item.base}
                  </small>
                  <input
                    value={answer(i)}
                    onChange={(e) => update(i, e.target.value)}
                    placeholder="Past Simple form…"
                    autoComplete="off"
                  />
                  {feedback(i)}
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="irv-column">
            <div className="irv-story irv-story--compact">
              <strong>Holiday story</strong>
              <p>{story.map((piece, i) => piece + (i < 8 ? storyVerbs[i].answer : '')).join('')}</p>
            </div>
            {trueFalse.map((item, i) => (
              <fieldset className="irv-answer-card" key={i}>
                <legend>
                  {i + 1}. {item.text}
                </legend>
                <div className="irv-choice-row">
                  <label>
                    <input
                      type="radio"
                      name={`tf-${i}`}
                      checked={answer(i) === 'true'}
                      onChange={() => update(i, 'true')}
                    />{' '}
                    True
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`tf-${i}`}
                      checked={answer(i) === 'false'}
                      onChange={() => update(i, 'false')}
                    />{' '}
                    False
                  </label>
                </div>
                {feedback(i)}
              </fieldset>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="irv-grid irv-grid--two">
            {matching.map((item, i) => (
              <label className="irv-answer-card" key={item.base}>
                <strong>{item.base} →</strong>
                <select
                  value={answer(i)}
                  onChange={(e) => update(i, e.target.value)}
                  aria-label={`Past Simple of ${item.base}`}
                >
                  <option value="">Choose the Past Simple form…</option>
                  {matchOptions.map((value) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {feedback(i)}
              </label>
            ))}
          </div>
        )}

        {checked[step] && (
          <div className="irv-result" role="status">
            <span>Your result</span>
            <strong>
              {score} / {exercise.amount}
            </strong>
            <span>
              {score === exercise.amount
                ? 'Excellent! All correct.'
                : 'Review your answers and try again.'}
            </span>
          </div>
        )}
        <div className="irv-controls">
          <button type="button" disabled={step === 0} onClick={() => setStep((n) => n - 1)}>
            ← Previous
          </button>
          <button
            type="button"
            className="irv-check"
            onClick={() => setChecked((current) => ({ ...current, [step]: true }))}
          >
            Check answers
          </button>
          <button type="button" disabled={step === 5} onClick={() => setStep((n) => n + 1)}>
            Next →
          </button>
        </div>
      </section>
    </main>
  );
}
