import { useState } from 'react';
import './IrregularVerbsLesson.css';
import './HotWheelsLesson.css';

const vocabulary = [
  { definition: 'A special hat that protects your head.', word: 'helmet' },
  { definition: 'A closed track where cars compete.', word: 'circuit' },
  { definition: 'One complete trip around a racing track.', word: 'lap' },
  { definition: 'A person who controls a vehicle.', word: 'driver' },
  { definition: 'A person who checks and repairs engines.', word: 'mechanic' },
  { definition: 'A competition made up of several races.', word: 'championship' },
  { definition: 'An informal name that friends or supporters use.', word: 'nickname' },
  { definition: 'People who admire and support a sports star.', word: 'fans' },
];
const vocabularyOptions = [...vocabulary.map((item) => item.word)].sort();

const grammar = [
  { sentence: 'A racing driver ___ wins a championship trains hard.', answers: ['who', 'that'] },
  { sentence: 'The helmet ___ Mia wears is blue.', answers: ['which', 'that'] },
  { sentence: 'Leo is a driver ___ father repairs engines.', answers: ['whose'] },
  { sentence: 'The programme ___ explains racing rules is for beginners.', answers: ['which', 'that'] },
  { sentence: 'Those are the fans ___ wait near the finish line.', answers: ['who', 'that'] },
  { sentence: 'This is a club ___ members practise every Saturday.', answers: ['whose'] },
  { sentence: 'The car ___ won the race is in the museum.', answers: ['which', 'that'] },
];
const pronouns = ['who', 'which', 'that', 'whose'];

const combine = [
  {
    prompt: 'Mia met an instructor. He works at the karting club.',
    options: [
      'Mia met an instructor which works at the karting club.',
      'Mia met an instructor who works at the karting club.',
      'Mia met an instructor whose works at the karting club.',
    ],
    answer: 1,
  },
  {
    prompt: 'We borrowed a helmet. It was yellow.',
    options: [
      'We borrowed a helmet that was yellow.',
      'We borrowed a helmet who was yellow.',
      'We borrowed a helmet whose was yellow.',
    ],
    answer: 0,
  },
  {
    prompt: 'The boy is Leo. His sister is a racer.',
    options: [
      'The boy which sister is a racer is Leo.',
      'The boy who sister is a racer is Leo.',
      'The boy whose sister is a racer is Leo.',
    ],
    answer: 2,
  },
  {
    prompt: 'I watched a race. The race lasted twenty minutes.',
    options: [
      'I watched a race whose lasted twenty minutes.',
      'I watched a race which lasted twenty minutes.',
      'I watched a race who lasted twenty minutes.',
    ],
    answer: 1,
  },
  {
    prompt: 'The spectators cheered for a driver. He came from Finland.',
    options: [
      'The spectators cheered for a driver who came from Finland.',
      'The spectators cheered for a driver which came from Finland.',
      'The spectators cheered for a driver whose came from Finland.',
    ],
    answer: 0,
  },
];

export const readingParagraphs = [
  'On Saturday, sixteen-year-old Mia visited a karting club that opened near her town last spring. She arrived with her brother Leo, who loves watching Formula 1 races, but she had never driven a kart before. Their instructor was Mr Reed, whose job was to teach drivers how to stay safe. He showed them helmets, which protected their heads, and explained the rules of the track.',
  'Mia felt nervous when she put on her helmet. However, the instructor reminded her that speed was less important than control. During her lap, she drove slowly and followed every sign. Leo, who had more experience, finished before her, but he was impressed by her progress.',
  'After the race, the club gave each driver a certificate. Mia discovered that karting was not only exciting but also a sport that required concentration, patience and respect for other people. She wanted to return the weekend.',
];
export const readingWordCount = readingParagraphs.join(' ').trim().split(/\s+/).length;

const readingQuestions = [
  { prompt: 'Who went to the karting club with Mia?', options: ['Her teacher', 'Her brother Leo', 'Her classmates'], answer: 1 },
  { prompt: 'What was Mr Reed’s job?', options: ['To teach young drivers to stay safe', 'To sell racing cars', 'To organise a concert'], answer: 0 },
  { prompt: 'What did Mia learn about speed?', options: ['Speed was everything', 'Speed was more important than signs', 'Control was more important than speed'], answer: 2 },
  { prompt: 'Why did Leo finish before Mia?', options: ['He had more experience', 'He ignored the rules', 'Mia broke her kart'], answer: 0 },
  { prompt: 'What does the final paragraph suggest?', options: ['Mia disliked karting', 'Karting requires patience and respect', 'Mia wanted to stop racing forever'], answer: 1 },
];
const factFile = [
  ['Name', 'Sofia Reed'],
  ['Age', '17'],
  ['Country', 'the UK'],
  ['Sport', 'karting'],
  ['Team', 'Silver Track Juniors'],
  ['First race', '2022'],
  ['Hobbies', 'cycling and photography'],
  ['Goal', 'help younger children learn road safety'],
];
const factQuestions = [
  { prompt: 'Which country does Sofia come from?', options: ['Finland', 'the UK', 'Italy'], answer: 1 },
  { prompt: 'When did Sofia take part in her first race?', options: ['2022', '2025', '2018'], answer: 0 },
  { prompt: 'Which activities does she enjoy?', options: ['Singing and skating', 'Swimming and sailing', 'Cycling and photography'], answer: 2 },
  { prompt: 'What does Sofia want to do?', options: ['Open a museum', 'Teach younger children about road safety', 'Become a mechanic'], answer: 1 },
];

const steps = [
  { eyebrow: '01 · VOCABULARY', title: 'Racing words', instruction: 'Choose the word that matches each definition.', amount: vocabulary.length },
  { eyebrow: '02 · GRAMMAR', title: 'Who, which, that or whose?', instruction: 'Select ALL the relative pronouns that work in each sentence. Sometimes TWO answers are correct.', amount: grammar.length },
  { eyebrow: '03 · GRAMMAR IN CONTEXT', title: 'Join the sentences', instruction: 'Choose the correctly combined sentence. Pay attention to the relative clause.', amount: combine.length },
  { eyebrow: '04 · READING', title: 'A day at the karting track', instruction: 'Read the original 150-word story and answer the comprehension questions.', amount: readingQuestions.length },
  { eyebrow: '05 · FACT FILE & WRITING', title: 'Meet a young racing driver', instruction: 'Study Sofia’s fact file, check the details and write a short profile using relative clauses.', amount: factQuestions.length },
];
const sameSet = (a: string[], b: string[]) => a.length === b.length && a.every((word) => b.includes(word));

export function HotWheelsLesson() {
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [vocabAnswers, setVocabAnswers] = useState<Record<number, string>>({});
  const [pronounAnswers, setPronounAnswers] = useState<Record<number, string[]>>({});
  const [combineAnswers, setCombineAnswers] = useState<Record<number, number>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<number, number>>({});
  const [factAnswers, setFactAnswers] = useState<Record<number, number>>({});
  const [profile, setProfile] = useState('');
  const [showWritingFeedback, setShowWritingFeedback] = useState(false);
  const [showModel, setShowModel] = useState(false);

  const changeAnswer = (nextStep: number, callback: () => void) => {
    callback();
    setChecked((previous) => ({ ...previous, [nextStep]: false }));
  };
  const current = steps[step];
  const counts = [
    vocabulary.filter((entry, i) => vocabAnswers[i] === entry.word).length,
    grammar.filter((entry, i) => sameSet(pronounAnswers[i] ?? [], entry.answers)).length,
    combine.filter((entry, i) => combineAnswers[i] === entry.answer).length,
    readingQuestions.filter((entry, i) => readingAnswers[i] === entry.answer).length,
    factQuestions.filter((entry, i) => factAnswers[i] === entry.answer).length,
  ];
  const isCorrect = (i: number) =>
    step === 0 ? vocabAnswers[i] === vocabulary[i].word
      : step === 1 ? sameSet(pronounAnswers[i] ?? [], grammar[i].answers)
      : step === 2 ? combineAnswers[i] === combine[i].answer
      : step === 3 ? readingAnswers[i] === readingQuestions[i].answer
      : factAnswers[i] === factQuestions[i].answer;
  const solution = (i: number) =>
    step === 0 ? vocabulary[i].word
      : step === 1 ? grammar[i].answers.join(' / ')
      : step === 2 ? combine[i].options[combine[i].answer]
      : step === 3 ? readingQuestions[i].options[readingQuestions[i].answer]
      : factQuestions[i].options[factQuestions[i].answer];
  const feedback = (i: number) => checked[step] ? (
    <p className={isCorrect(i) ? 'irv-feedback irv-feedback--correct' : 'irv-feedback irv-feedback--wrong'} role="status">
      {isCorrect(i) ? '✓ Correct!' : `Review: ${solution(i)}`}
    </p>
  ) : null;

  const profileWords = profile.trim() ? profile.trim().split(/\s+/).length : 0;
  const clauseMatches = profile.match(/\b(who|which|that|whose)\b/gi) ?? [];
  const promptModel =
    'Sofia Reed is a seventeen-year-old karting driver who comes from the UK. She belongs to Silver Track Juniors, which helps young athletes practise safely. Sofia, whose first race was in 2022, enjoys cycling and photography. She works hard because she hopes to help younger children understand road safety. Her team believes that a successful driver must be patient, careful and respectful.';

  return (
    <main className="page-shell irv-page hot-wheels-page">
      <header className="irv-hero hot-wheels-hero">
        <div className="irv-hero__copy">
          <span className="irv-pill">SPOTLIGHT 6 · MODULE 3C · A2–B1</span>
          <h1>Hot Wheels</h1>
          <p>Racing, people and relative clauses</p>
          <div className="irv-hero__meta">
            <span>5 exercises</span><span>35–45 min</span><span>150-word reading</span>
          </div>
        </div>
        <div className="hot-wheels-hero__flag" aria-hidden="true">🏁</div>
      </header>
      <section className="hot-wheels-reminder" aria-label="Lesson grammar reminder">
        <div>
          <strong>People</strong>
          <p><b>who / that</b> — a driver <em>who</em> trains every day</p>
        </div>
        <div>
          <strong>Things</strong>
          <p><b>which / that</b> — a helmet <em>that</em> protects your head</p>
        </div>
        <div>
          <strong>Possession</strong>
          <p><b>whose</b> — a racer <em>whose</em> father is a mechanic</p>
        </div>
      </section>
      <section className="irv-workspace hot-wheels-workspace" aria-label="Hot Wheels exercises">
        <div className="irv-workspace__topline"><span>Exercise {step + 1} of 5</span><strong>{Math.round((step + 1) / 5 * 100)}%</strong></div>
        <div className="irv-progress hot-wheels-progress" aria-label="Lesson progress">
          {steps.map((entry, i) => <span key={entry.eyebrow} className={i <= step ? 'is-done' : ''} />)}
        </div>
        <nav className="irv-tabs" aria-label="Choose exercise">
          {steps.map((entry, i) => (
            <button key={entry.eyebrow} type="button" aria-current={i === step ? 'step' : undefined} className={i === step ? 'is-active' : ''} onClick={() => setStep(i)}>{i + 1}</button>
          ))}
        </nav>
        <span className="irv-eyebrow">{current.eyebrow}</span>
        <h2>{current.title}</h2>
        <p className="irv-instruction">{current.instruction}</p>

        {step === 0 && (
          <div className="irv-grid irv-grid--two">
            {vocabulary.map((entry, i) => (
              <label key={entry.word} className="irv-answer-card">
                <small>WORD {i + 1}</small>
                <span>{entry.definition}</span>
                <select aria-label={`Vocabulary answer ${i + 1}`} value={vocabAnswers[i] ?? ''} onChange={(event) => changeAnswer(0, () => setVocabAnswers((old) => ({ ...old, [i]: event.target.value })))}>
                  <option value="">Choose a racing word…</option>
                  {vocabularyOptions.map((word) => <option key={word} value={word}>{word}</option>)}
                </select>{feedback(i)}
              </label>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="irv-column">
            {grammar.map((entry, i) => (
              <fieldset key={i} className="irv-answer-card hot-wheels-grammar">
                <legend><small>SENTENCE {i + 1}</small> {entry.sentence}</legend>
                <div className="hot-wheels-choices">
                  {pronouns.map((word) => (
                    <label key={word} className="hot-wheels-choice">
                      <input type="checkbox" aria-label={`Sentence ${i + 1}: ${word}`} checked={(pronounAnswers[i] ?? []).includes(word)} onChange={(event) => changeAnswer(1, () => setPronounAnswers((old) => {
                        const active = old[i] ?? [];
                        return { ...old, [i]: event.target.checked ? [...active, word] : active.filter((value) => value !== word) };
                      }))} />
                      <span>{word}</span>
                    </label>
                  ))}
                </div>{feedback(i)}
              </fieldset>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="irv-column">
            {combine.map((entry, i) => (
              <fieldset className="irv-answer-card" key={i}>
                <legend><small>PAIR {i + 1}</small> {entry.prompt}</legend>
                <div className="hot-wheels-options">
                  {entry.options.map((option, j) => (
                    <label className="hot-wheels-option" key={option}>
                      <input type="radio" name={`combine-${i}`} checked={combineAnswers[i] === j} onChange={() => changeAnswer(2, () => setCombineAnswers((old) => ({ ...old, [i]: j }))} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>{feedback(i)}
              </fieldset>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="irv-column">
            <article className="hot-wheels-story" lang="en">
              <div className="hot-wheels-story__heading"><span>READING · {readingWordCount} WORDS</span><strong>A day at the karting track</strong></div>
              {readingParagraphs.map((paragraph) => <p key={paragraph.slice(0, 20)}>{paragraph}</p>)}
            </article>
            <p className="irv-instruction">Choose the correct answer for each question.</p>
            {readingQuestions.map((entry, i) => (
              <fieldset className="irv-answer-card" key={entry.prompt}>
                <legend>{i + 1}. {entry.prompt}</legend>
                <div className="hot-wheels-options">
                  {entry.options.map((option, j) => (
                    <label key={option} className="hot-wheels-option">
                      <input type="radio" name={`read-${i}`} checked={readingAnswers[i] === j} onChange={() => changeAnswer(3, () => setReadingAnswers((old) => ({ ...old, [i]: j }))} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>{feedback(i)}
              </fieldset>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="irv-column">
            <div className="hot-wheels-factfile">
              <div><small>FICTIONAL DRIVER PROFILE</small><h3>Sofia Reed</h3></div>
              <dl>{factFile.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
            </div>
            {factQuestions.map((entry, i) => (
              <fieldset key={entry.prompt} className="irv-answer-card">
                <legend>{i + 1}. {entry.prompt}</legend>
                <div className="hot-wheels-options">
                  {entry.options.map((option, j) => (
                    <label key={option} className="hot-wheels-option">
                      <input type="radio" name={`fact-${i}`} checked={factAnswers[i] === j} onChange={() => changeAnswer(4, () => setFactAnswers((old) => ({ ...old, [i]: j }))} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>{feedback(i)}
              </fieldset>
            ))}
            <section className="hot-wheels-writing" aria-label="Writing practice">
              <span className="irv-eyebrow">WRITING · YOUR TURN</span>
              <h3>Write a profile (60–80 words)</h3>
              <p>Describe Sofia using the fact file. Include at least two relative clauses with <strong>who, which, that</strong> or <strong>whose</strong>. Your writing is for teacher/self-review; it is not automatically graded for meaning.</p>
              <label htmlFor="hot-wheels-profile">Your short article</label>
              <textarea id="hot-wheels-profile" rows={6} value={profile} placeholder="Sofia Reed is a young racing driver who…" onChange={(event) => { setProfile(event.target.value); setShowWritingFeedback(false); }} />
              <div className="hot-wheels-writing__footer">
                <span>{profileWords} words · {clauseMatches.length} relative pronoun(s)</span>
                <button type="button" onClick={() => setShowWritingFeedback(true)}>Check writing requirements</button>
              </div>
              {showWritingFeedback && (
                <div role="status" className="hot-wheels-writing__feedback">
                  <p>{profileWords >= 60 && profileWords <= 80 ? '✓ Your article is 60–80 words.' : '• Aim for 60–80 words.'}</p>
                  <p>{clauseMatches.length >= 2 ? '✓ You used at least two relative pronouns.' : '• Try to use at least two relative pronouns.'}</p>
                  <p>Ask your teacher to check the grammar, meaning and natural wording.</p>
                </div>
              )}
              <button type="button" className="hot-wheels-model-toggle" onClick={() => setShowModel((old) => !old)}>
                {showModel ? 'Hide sample answer' : 'Show sample answer'}
              </button>
              {showModel && <p className="hot-wheels-model" lang="en">{promptModel}</p>}
            </section>
          </div>
        )}

        {checked[step] && (
          <div className="irv-result" role="status">
            <span>Your score</span><strong>{counts[step]} / {current.amount}</strong>
            <span>{counts[step] === current.amount ? 'Excellent! All answers are correct.' : 'Review the answers and try again.'}</span>
          </div>
        )}
        <div className="irv-controls">
          <button type="button" onClick={() => setStep((old) => old - 1)} disabled={step === 0}>← Previous</button>
          <button type="button" className="irv-check" onClick={() => setChecked((old) => ({ ...old, [step]: true }))}>Check answers</button>
          <button type="button" onClick={() => setStep((old) => old + 1)} disabled={step === steps.length - 1}>Next →</button>
        </div>
      </section>
    </main>
  );
}
