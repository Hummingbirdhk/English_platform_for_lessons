import { useState } from 'react';
import { getGrammarPresentation } from '../../../content/grammar/grammarPresentations';
import type { Material } from '../../../content/types';

type GrammarMaterialData = Extract<Material, { type: 'grammar' }>;

export function GrammarMaterial({ material }: { material: GrammarMaterialData }) {
  const presentation = getGrammarPresentation(material.id);
  const [activeForm, setActiveForm] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (!presentation) {
    return (
      <article className="grammar-studio">
        <header className="grammar-studio__hero grammar-studio__hero--purple">
          <span className="grammar-studio__eyebrow">A2 · GRAMMAR</span>
          <h1>{material.title}</h1>
          <p>{material.explanation.ru}</p>
        </header>
      </article>
    );
  }

  const currentForm = material.forms[activeForm] ?? material.forms[0];
  const isCorrect = selectedAnswer === presentation.practice.answer;

  return (
    <article className="grammar-studio">
      <header
        className={`grammar-studio__hero grammar-studio__hero--${presentation.accent}`}
      >
        <span className="grammar-studio__eyebrow">{presentation.eyebrow}</span>
        <h1>{presentation.displayTitle}</h1>
        <p>{presentation.hero}</p>
        <div className="grammar-studio__hero-note">{presentation.memoryTip}</div>
      </header>

      <section className="grammar-studio__section">
        <div className="grammar-studio__section-heading">
          <div>
            <span className="grammar-studio__kicker">01 · СМЫСЛ</span>
            <h2>Когда это нужно?</h2>
          </div>
          <p>{presentation.rule}</p>
        </div>

        <div
          className={`grammar-visual grammar-visual--${presentation.visual} grammar-visual--${presentation.accent}`}
        >
          {presentation.cues.map((cue, index) => (
            <article className="grammar-cue" key={`${cue.title}-${cue.label}`}>
              <span className="grammar-cue__label">{cue.label}</span>
              <h3>{cue.title}</h3>
              <p>{cue.text}</p>
              <div className="grammar-example">
                <strong>{cue.exampleEn}</strong>
                <span>{cue.exampleRu}</span>
              </div>
              {presentation.visual === 'scale' ? (
                <span className="grammar-cue__scale-index">{index + 1}</span>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="grammar-studio__section grammar-form-lab">
        <div className="grammar-studio__section-heading">
          <div>
            <span className="grammar-studio__kicker">02 · МЕХАНИКА</span>
            <h2>Разбери конструкцию</h2>
          </div>
          <p>Переключай формы: формула и примеры меняются прямо в карточке.</p>
        </div>

        <div className="grammar-form-lab__layout">
          <div className="grammar-form-tabs" role="tablist" aria-label="Формы конструкции">
            {material.forms.map((form, index) => (
              <button
                key={form.label}
                type="button"
                className={
                  index === activeForm
                    ? 'grammar-form-tab grammar-form-tab--active'
                    : 'grammar-form-tab'
                }
                onClick={() => setActiveForm(index)}
              >
                {form.label}
              </button>
            ))}
          </div>

          <div className="grammar-form-output">
            <span className="grammar-studio__kicker">ФОРМУЛА</span>
            <div className="grammar-formula">{currentForm.pattern}</div>
            <div className="grammar-form-examples">
              {currentForm.examples.map((example) => (
                <div className="grammar-example grammar-example--large" key={example.en}>
                  <strong>{example.en}</strong>
                  <span>{example.ru}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grammar-memory-card">
        <span className="grammar-studio__kicker">ЗАПОМНИ</span>
        <p>{presentation.memoryTip}</p>
      </section>

      {presentation.accordion ? (
        <section className="grammar-studio__section">
          <details className="grammar-reference">
            <summary>
              <span>
                <small>СПРАВОЧНИК</small>
                <strong>{presentation.accordion.title}</strong>
              </span>
              <b>+</b>
            </summary>
            <div className="grammar-reference__body">
              <p>{presentation.accordion.intro}</p>
              <div className="grammar-reference__table-wrap">
                <table className="grammar-reference__table">
                  <thead>
                    <tr>
                      {presentation.accordion.headers.map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {presentation.accordion.rows.map((row) => (
                      <tr key={row.join('|')}>
                        {row.map((cell, index) => (
                          <td key={`${row[0]}-${index}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </details>
        </section>
      ) : null}

      {material.commonMistakes.length > 0 ? (
        <section className="grammar-studio__section">
          <div className="grammar-studio__section-heading">
            <div>
              <span className="grammar-studio__kicker">03 · ЛОВУШКИ</span>
              <h2>Частые ошибки</h2>
            </div>
            <p>Сравни неправильную и правильную конструкцию — так правило запоминается быстрее.</p>
          </div>
          <div className="grammar-mistakes">
            {material.commonMistakes.map((mistake) => (
              <article className="grammar-mistake" key={mistake.wrong}>
                <div className="grammar-mistake__wrong">× {mistake.wrong}</div>
                <div className="grammar-mistake__right">✓ {mistake.right}</div>
                {mistake.note ? <p>{mistake.note}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grammar-check">
        <span className="grammar-studio__kicker">30-SECOND CHECK</span>
        <h2>{presentation.practice.prompt}</h2>
        <div className="grammar-check__answers">
          {presentation.practice.options.map((option) => {
            const state =
              selectedAnswer === option
                ? option === presentation.practice.answer
                  ? ' grammar-check__answer--good'
                  : ' grammar-check__answer--bad'
                : '';
            return (
              <button
                key={option}
                type="button"
                className={`grammar-check__answer${state}`}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
        <div className="grammar-check__feedback" aria-live="polite">
          {selectedAnswer
            ? isCorrect
              ? `Да. ${presentation.practice.feedback}`
              : presentation.practice.feedback
            : 'Выбери ответ — проверка появится здесь.'}
        </div>
      </section>
    </article>
  );
}
