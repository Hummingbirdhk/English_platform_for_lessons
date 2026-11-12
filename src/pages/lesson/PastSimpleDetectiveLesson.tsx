import { Fragment, useState } from 'react';
import irregularVerbs from '../../content/knowledge/vocabulary/irregular-verbs.json';
import './IrregularVerbsLesson.css';
import './PastSimpleDetectiveLesson.css';

type Entry = { base: string; past: string; translation: string; level: string };
const bank = irregularVerbs.items as Entry[];
export const pastOf = (base: string): string => {
  const found = bank.find((entry) => entry.base === base);
  if (!found) throw new Error(`Missing irregular verb in vocabulary: ${base}`);
  return found.past;
};

export const starterBases = ['begin', 'break', 'bring', 'buy', 'catch', 'choose', 'come', 'go'];
const starters = starterBases.map((base, index) => {
  const entry = bank.find((verb) => verb.base === base);
  if (!entry || entry.level !== 'A2') throw new Error(`Missing A2 entry: ${base}`);
  const madeUpPast = base.endsWith('e') ? `${base}d` : `${base}ed`;
  const choices = [base, entry.past, madeUpPast];
  const order = index % 3 === 0 ? [1, 0, 2] : index % 3 === 1 ? [2, 1, 0] : [0, 2, 1];
  return { base, translation: entry.translation, answer: entry.past, choices: order.map((i) => choices[i]) };
});

const sentences = [
  { before: 'Yesterday, our class', after: 'to the gym to prepare for a school fair.', base: 'go', mode: 'past' },
  { before: 'Max', after: 'a map because nobody remembered the way to the music room.', base: 'bring', mode: 'past' },
  { before: 'I', after: 'a yellow note under the table when we looked for our mascot.', base: 'see', mode: 'past' },
  { before: 'Our teacher didn’t', after: 'where we hid the paper stars.', base: 'know', mode: 'base' },
  { before: 'Did Anna', after: 'her torch to school yesterday?', base: 'take', mode: 'base' },
  { before: 'We', after: 'a new poster after we discovered the surprise.', base: 'make', mode: 'past' },
] as const;

export const storyBases = ['go', 'find', 'bring', 'take', 'see', 'give', 'begin', 'write'];
const storyParagraphs = [
  {
    first: 0,
    parts: [
      'On Friday morning, our class ',
      ' to the gym to prepare for the school fair. Everyone was excited because our mascot, a little blue fox called Flash, was ready for the big show. But when we opened the cupboard, Flash was not there! We looked under the tables and behind the chairs. I ',
      ' a tiny yellow note on the floor. It said, “Follow the music!”',
    ],
  },
  {
    first: 2,
    parts: [
      'Max ',
      ' a map of the school, and Anna ',
      ' a torch from her bag. We ',
      ' a trail of paper stars near the music room. There, our teacher ',
      ' us another clue. We ',
      ' to laugh when we heard funny sounds from a big box.',
    ],
  },
  {
    first: 7,
    parts: [
      'Inside the box was Flash, wearing a party hat! Our teacher ',
      ' a message: “Great detectives! Now let the school fair begin.” We took a photo and showed our mascot to the parents.',
    ],
  },
];
export const storyPreview = storyParagraphs.map(({ first, parts }) =>
  parts.map((part, index) => part + (index < parts.length - 1 ? `[${first + index + 1}]` : '')).join(''),
);

const caseNotes = [
  { statement: 'The class mascot was a small blue fox.', answer: 'true', detail: 'Flash was a little blue fox.' },
  { statement: 'The children found the first clue inside a backpack.', answer: 'false', detail: 'The first clue was on the floor.' },
  { statement: 'Max brought a map, and Anna took a torch.', answer: 'true', detail: 'Both objects helped the detectives.' },
  { statement: 'The teacher gave the children another clue near the music room.', answer: 'true', detail: 'The teacher was near the music room.' },
  { statement: 'Flash was hiding under a table.', answer: 'false', detail: 'Flash was inside a big box.' },
] as const;

const fixes = [
  { before: 'Yesterday, we', wrong: 'goed', after: 'to the gym.', choices: ['goed', 'go', 'went'], answer: 'went' },
  { before: 'Max', wrong: 'bringed', after: 'the school map.', choices: ['brought', 'bring', 'bringed'], answer: 'brought' },
  { before: 'I didn’t', wrong: 'found', after: 'the clue at first.', choices: ['finded', 'found', 'find'], answer: 'find' },
  { before: 'Did Anna', wrong: 'took', after: 'her torch?', choices: ['take', 'took', 'taked'], answer: 'take' },
  { before: 'Our teacher', wrong: 'writed', after: 'a funny message.', choices: ['write', 'writed', 'wrote'], answer: 'wrote' },
  { before: 'We', wrong: 'was', after: 'very excited.', choices: ['are', 'were', 'was'], answer: 'were' },
] as const;

const steps = [
  { eyebrow: '01 · VERB LAB', title: 'Choose the correct V2', instruction: 'Every detective needs a good memory! Choose the Past Simple form for each verb.', amount: starters.length },
  { eyebrow: '02 · GRAMMAR', title: 'Yesterday at school', instruction: 'Complete the sentences. After did or didn’t, use V1 — in positive sentences, use V2.', amount: sentences.length },
  { eyebrow: '03 · STORY MYSTERY', title: 'Where is Flash?', instruction: 'Read the story and fill the eight gaps. Use each verb from the V1 bank once — change it into V2.', amount: storyBases.length },
  { eyebrow: '04 · READING', title: 'Check the clues', instruction: 'Read the story again. Decide if these statements are true or false.', amount: caseNotes.length },
  { eyebrow: '05 · GRAMMAR GAME', title: 'Fix the school newspaper!', instruction: 'Oops! Our reporter made six mistakes. Click the word that makes each sentence correct.', amount: fixes.length },
] as const;

const normalise = (value: string) => value.trim().toLocaleLowerCase('en-US').replace(/[.!?]+$/, '');

export function PastSimpleDetectiveLesson() {
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [starterAnswers, setStarterAnswers] = useState<Record<number, string>>({});
  const [sentenceAnswers, setSentenceAnswers] = useState<Record<number, string>>({});
  const [storyAnswers, setStoryAnswers] = useState<Record<number, string>>({});
  const [clueAnswers, setClueAnswers] = useState<Record<number, string>>({});
  const [fixAnswers, setFixAnswers] = useState<Record<number, string>>({});

  const updateAnswer = (callback: () => void) => {
    callback();
    setChecked((current) => ({ ...current, [step]: false }));
  };
  const solution = (index: number) => {
    if (step === 0) return starters[index].answer;
    if (step === 1) return sentences[index].mode === 'base' ? sentences[index].base : pastOf(sentences[index].base);
    if (step === 2) return pastOf(storyBases[index]);
    if (step === 3) return caseNotes[index].answer;
    return fixes[index].answer;
  };
  const response = (index: number) =>
    step === 0 ? starterAnswers[index] ?? ''
      : step === 1 ? sentenceAnswers[index] ?? ''
      : step === 2 ? storyAnswers[index] ?? ''
      : step === 3 ? clueAnswers[index] ?? ''
      : fixAnswers[index] ?? '';
  const correct = (index: number) => normalise(response(index)) === solution(index);
  const score = Array.from({ length: steps[step].amount }, (_, i) => correct(i)).filter(Boolean).length;
  const feedback = (index: number) => {
    if (!checked[step]) return null;
    return (
      <p role="status" className={correct(index) ? 'irv-feedback irv-feedback--correct' : 'irv-feedback irv-feedback--wrong'}>
        {correct(index) ? '✓ Correct! Great detective work.' : `Look again · Correct answer: ${solution(index)}`}
        {step === 3 && <span className="psd-explanation"> {caseNotes[index].detail}</span>}
      </p>
    );
  };

  return (
    <main className="page-shell irv-page psd-page">
      <header className="irv-hero psd-hero">
        <div className="irv-hero__copy">
          <span className="irv-pill">GRADE 6 · PAST SIMPLE · A2</span>
          <h1>Past Simple<br />Detective Club</h1>
          <p>The Case of the Missing Mascot</p>
          <div className="irv-hero__meta">
            <span>5 exercises</span><span>30–40 min</span><span>V1 → V2 only</span>
          </div>
        </div>
        <div className="psd-hero__symbol" aria-hidden="true">🔎</div>
      </header>

      <section className="psd-rulebook" aria-label="Past Simple grammar reminder">
        <div><small>STATEMENT</small><strong>We went to school.</strong><span>Use V2 for past actions.</span></div>
        <div><small>QUESTION</small><strong>Did you go?</strong><span>After did, use V1.</span></div>
        <div><small>NEGATIVE</small><strong>We didn’t go.</strong><span>After didn’t, use V1.</span></div>
      </section>

      <section className="irv-workspace psd-workspace" aria-label="Detective Club exercises">
        <div className="irv-workspace__topline"><span>Case file {step + 1} of 5</span><strong>{Math.round((step + 1) / 5 * 100)}%</strong></div>
        <div className="irv-progress psd-progress" aria-label="Lesson progress">
          {steps.map((item, i) => <span key={item.eyebrow} className={i <= step ? 'is-done' : ''} />)}
        </div>
        <nav className="irv-tabs" aria-label="Choose exercise">
          {steps.map((item, i) => (
            <button type="button" key={item.eyebrow} aria-current={i === step ? 'step' : undefined}
              className={i === step ? 'is-active' : ''} onClick={() => setStep(i)}>{i + 1}</button>
          ))}
        </nav>
        <span className="irv-eyebrow">{steps[step].eyebrow}</span>
        <h2>{steps[step].title}</h2>
        <p className="irv-instruction">{steps[step].instruction}</p>

        {step === 0 && <div className="irv-grid irv-grid--two">
          {starters.map((item, i) => (
            <fieldset key={item.base} className="irv-answer-card psd-verb-card">
              <legend><strong>{item.base}</strong> <span>{item.translation}</span></legend>
              <div className="psd-choices">
                {item.choices.map((option) =>
                  <label key={option} className="psd-choice">
                    <input type="radio" name={`starter-${i}`} aria-label={`V2 of ${item.base}: ${option}`}
                      checked={starterAnswers[i] === option}
                      onChange={() => updateAnswer(() => setStarterAnswers((prev) => ({ ...prev, [i]: option })))} />
                    <span>{option}</span>
                  </label>,
                )}
              </div>
              {feedback(i)}
            </fieldset>
          ))}
        </div>}

        {step === 1 && <div className="irv-column">
          {sentences.map((item, i) => (
            <label key={i} className="irv-answer-card psd-sentence">
              <small>SENTENCE {i + 1}</small>
              <span>{item.before} <b>_____</b> {item.after} <em>({item.base})</em></span>
              <input type="text" autoComplete="off" aria-label={`Sentence ${i + 1} answer`}
                placeholder="Write the correct form…" value={sentenceAnswers[i] ?? ''}
                onChange={(event) => updateAnswer(() => setSentenceAnswers((prev) => ({ ...prev, [i]: event.target.value })))} />
              {feedback(i)}
            </label>
          ))}
        </div>}

        {step === 2 && <div className="irv-column">
          <div className="psd-word-bank">
            <strong>Verb bank · V1</strong>
            <div>{storyBases.map((base) => <span key={base}>{base}</span>)}</div>
          </div>
          <article className="psd-story" lang="en">
            <div className="psd-story__heading"><small>THE SCHOOL MYSTERY</small><strong>The Case of the Missing Mascot</strong></div>
            {storyParagraphs.map((paragraph, i) => (
              <p key={i}>
                {paragraph.parts.map((part, j) => (
                  <Fragment key={j}>{part}{j < paragraph.parts.length - 1 &&
                    <strong className="psd-blank">___ ({paragraph.first + j + 1})</strong>}</Fragment>
                ))}
              </p>
            ))}
          </article>
          <div className="irv-grid irv-grid--two">
            {storyBases.map((base, i) => (
              <label key={base} className="irv-answer-card">
                <small>GAP {i + 1} · {base}</small>
                <input type="text" autoComplete="off" aria-label={`Story gap ${i + 1} — ${base}`}
                  placeholder="Past Simple form…" value={storyAnswers[i] ?? ''}
                  onChange={(event) => updateAnswer(() => setStoryAnswers((prev) => ({ ...prev, [i]: event.target.value })))} />
                {feedback(i)}
              </label>
            ))}
          </div>
        </div>}

        {step === 3 && <div className="irv-column">
          <div className="psd-story-note">Need a clue? You can return to exercise 3 to read the story again. Your answers will stay here.</div>
          {caseNotes.map((item, i) => (
            <fieldset className="irv-answer-card" key={item.statement}>
              <legend>{i + 1}. {item.statement}</legend>
              <div className="psd-choices">
                {(['true', 'false'] as const).map((option) => (
                  <label key={option} className="psd-choice">
                    <input type="radio" name={`clue-${i}`} aria-label={`Clue ${i + 1}: ${option}`}
                      checked={clueAnswers[i] === option}
                      onChange={() => updateAnswer(() => setClueAnswers((prev) => ({ ...prev, [i]: option })))} />
                    <span>{option === 'true' ? 'True' : 'False'}</span>
                  </label>
                ))}
              </div>
              {feedback(i)}
            </fieldset>
          ))}
        </div>}

        {step === 4 && <div className="irv-column">
          <div className="psd-story-note">The school newspaper needs an editor. Choose the correct word for every sentence!</div>
          {fixes.map((item, i) => (
            <fieldset className="irv-answer-card psd-fix-card" key={i}>
              <legend><small>HEADLINE {i + 1}</small> {item.before} <span className="psd-error">{item.wrong}</span> {item.after}</legend>
              <div className="psd-choices">
                {item.choices.map((option) => (
                  <label key={option} className="psd-choice">
                    <input type="radio" name={`fix-${i}`} aria-label={`Correction ${i + 1}: ${option}`}
                      checked={fixAnswers[i] === option}
                      onChange={() => updateAnswer(() => setFixAnswers((prev) => ({ ...prev, [i]: option })))} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {feedback(i)}
            </fieldset>
          ))}
          <div className="psd-conclusion">Case closed! Remember: <strong>V2</strong> in positive sentences, but <strong>V1</strong> after <strong>did / didn’t</strong>.</div>
        </div>}

        {checked[step] && <div role="status" className="irv-result">
          <span>YOUR RESULT</span><strong>{score} / {steps[step].amount}</strong>
          <span>{score === steps[step].amount ? 'Amazing! You solved this case.' : 'Review the clues and try again!'}</span>
        </div>}
        <div className="irv-controls">
          <button type="button" disabled={step === 0} onClick={() => setStep((previous) => previous - 1)}>← Previous</button>
          <button type="button" className="irv-check"
            onClick={() => setChecked((previous) => ({ ...previous, [step]: true }))}>Check answers</button>
          <button type="button" disabled={step === steps.length - 1}
            onClick={() => setStep((previous) => previous + 1)}>Next →</button>
        </div>
      </section>
    </main>
  );
}
