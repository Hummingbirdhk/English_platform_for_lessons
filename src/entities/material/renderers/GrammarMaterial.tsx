import { useState } from 'react';
import { getGrammarPresentation } from '../../../content/grammar/grammarPresentations';
import type { Material } from '../../../content/types';

type GrammarMaterialData = Extract<Material, { type: 'grammar' }>;

const formLabelTranslations: Record<string, string> = {
  Positive: 'Утверждение',
  Negative: 'Отрицание',
  Questions: 'Вопросы',
  Question: 'Вопрос',
  Present: 'Настоящее',
  Past: 'Прошедшее',
  'Past tense': 'Прошедшее',
  'Third person spelling': 'He / she / it: окончание',
  Spelling: 'Правописание',
  'Irregular verbs': 'Неправильные глаголы',
  'Was / were': 'Was / were',
  'Questions & negatives': 'Вопросы и отрицания',
  Routine: 'Регулярно',
  Now: 'Сейчас',
  'State verbs': 'Глаголы состояния',
  'Interrupted action': 'Прерванное действие',
  'Two actions in progress': 'Два процесса',
  Experience: 'Опыт',
  'Recent result': 'Недавний результат',
  'Common markers': 'Маркеры',
  Arrangement: 'Договорённость',
  Ability: 'Умение',
  Permission: 'Разрешение',
  'Other tenses': 'Другие времена',
  Advice: 'Совет',
  'Negative advice': 'Не стоит',
  Obligation: 'Обязанность',
  Prohibition: 'Запрет',
  Rule: 'Правило',
  Necessity: 'Необходимость',
  'No necessity': 'Необязательно',
  "Needn't": 'Needn’t',
  At: 'AT',
  On: 'ON',
  In: 'IN',
  Place: 'Место',
  Movement: 'Движение',
  'In / into': 'In / into',
  Countable: 'Исчисляемые',
  Uncountable: 'Неисчисляемые',
  Both: 'Для обеих групп',
  'A / an': 'A / an',
  The: 'The',
  'Zero article': 'Без артикля (Ø)',
  Comparative: 'Сравнительная степень',
  Superlative: 'Превосходная степень',
  'Equal comparison': 'Одинаковая степень',
  Irregular: 'Исключения',
  People: 'Люди',
  Things: 'Предметы',
  Places: 'Места',
  Possession: 'Принадлежность',
  'After a verb': 'После глагола',
  'After a preposition': 'После предлога',
  'Reflexive pronouns': 'Возвратные местоимения',
  'Most nouns': 'Большинство слов',
  '-es': 'Окончание -es',
  '-y / -f': 'Окончания -y / -f',
};

function getFormLabel(label: string) {
  return formLabelTranslations[label] ?? label;
}

function getMistakeNote(note: string | undefined, right: string) {
  if (note && /[А-Яа-яЁё]/.test(note)) return note;
  return `Правильная конструкция: ${right}`;
}

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
      <header className={`grammar-studio__hero grammar-studio__hero--${presentation.accent}`}>
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

      {presentation.tenseGuide ? (
        <section className="grammar-studio__section tense-guide">
          <div className="grammar-studio__section-heading">
            <div>
              <span className="grammar-studio__kicker">02 · КАК РАБОТАЕТ ВРЕМЯ</span>
              <h2>Разбираем подробнее</h2>
            </div>
            <p>{presentation.tenseGuide.intro}</p>
          </div>

          <div className="tense-guide__uses">
            {presentation.tenseGuide.uses.map((use, index) => (
              <article className="tense-use-card" key={use.title}>
                <span className="tense-use-card__number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{use.title}</h3>
                <p>{use.text}</p>
                <div className="grammar-example">
                  <strong>{use.exampleEn}</strong>
                  <span>{use.exampleRu}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="tense-guide__split">
            <article className="tense-marker-card">
              <div className="tense-guide__mini-heading">
                <span className="grammar-studio__kicker">МАРКЕРЫ</span>
                <h3>Слова-подсказки</h3>
              </div>
              <div className="tense-marker-list">
                {presentation.tenseGuide.markers.map((item) => (
                  <div className="tense-marker-row" key={item.marker}>
                    <strong>{item.marker}</strong>
                    <span>{item.meaning}</span>
                    <em>{item.example}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className="tense-build-card">
              <div className="tense-guide__mini-heading">
                <span className="grammar-studio__kicker">ФОРМА</span>
                <h3>Как строится</h3>
              </div>
              <div className="tense-build-list">
                {presentation.tenseGuide.build.map((item) => (
                  <div className="tense-build-row" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.rule}</strong>
                    <div>
                      <b>{item.exampleEn}</b>
                      <small>{item.exampleRu}</small>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {presentation.tenseGuide.specialCases?.length ? (
            <details className="grammar-reference tense-special-cases">
              <summary>
                <span>
                  <small>ВАЖНЫЕ ДЕТАЛИ</small>
                  <strong>Особые случаи и ловушки</strong>
                </span>
                <b>+</b>
              </summary>
              <div className="tense-special-cases__body">
                {presentation.tenseGuide.specialCases.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="grammar-example">
                      <strong>{item.exampleEn}</strong>
                      <span>{item.exampleRu}</span>
                    </div>
                  </article>
                ))}
              </div>
            </details>
          ) : null}

          {presentation.tenseGuide.contrast ? (
            <article className="tense-contrast">
              <div className="tense-guide__mini-heading">
                <span className="grammar-studio__kicker">СРАВНЕНИЕ</span>
                <h3>{presentation.tenseGuide.contrast.title}</h3>
              </div>
              <div className="tense-contrast__header">
                <strong>{presentation.tenseGuide.contrast.leftTitle}</strong>
                <strong>{presentation.tenseGuide.contrast.rightTitle}</strong>
                <span>Логика</span>
              </div>
              <div className="tense-contrast__rows">
                {presentation.tenseGuide.contrast.rows.map((row) => (
                  <div className="tense-contrast__row" key={row.left + row.right}>
                    <div>{row.left}</div>
                    <div>{row.right}</div>
                    <span>{row.note}</span>
                  </div>
                ))}
              </div>
            </article>
          ) : null}
        </section>
      ) : null}

      {presentation.quantityGuide ? (
        <>
          <section className="grammar-studio__section quantity-guide">
            <div className="grammar-studio__section-heading">
              <div>
                <span className="grammar-studio__kicker">02 · COUNT OR AMOUNT?</span>
                <h2>Сначала определяем тип существительного</h2>
              </div>
              <p>{presentation.quantityGuide.intro}</p>
            </div>

            <div className="quantity-guide__noun-groups">
              {presentation.quantityGuide.nounGroups.map((group) => (
                <article className="quantity-noun-group" key={group.title}>
                  <div className="quantity-noun-group__heading">
                    <div>
                      <span>{group.subtitle}</span>
                      <h3>{group.title}</h3>
                    </div>
                  </div>

                  <p className="quantity-noun-group__description">{group.description}</p>

                  <div className="quantity-picture-grid">
                    {group.items.map((item) => (
                      <div className="quantity-picture-card" key={item.word}>
                        <span className="quantity-picture-card__icon" aria-hidden="true">
                          {item.icon}
                        </span>
                        <strong>{item.word}</strong>
                        <small>{item.note}</small>
                      </div>
                    ))}
                  </div>

                  <ul className="quantity-noun-group__rules">
                    {group.rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="quantity-some-bridge">
            <div>
              <span className="grammar-studio__kicker">SOME · РАБОТАЕТ С ОБЕИМИ ГРУППАМИ</span>
              <h2>{presentation.quantityGuide.someBridge.title}</h2>
              <p>{presentation.quantityGuide.someBridge.text}</p>
            </div>

            <div className="quantity-some-bridge__branches">
              <div>
                <span>COUNTABLE PLURAL</span>
                {presentation.quantityGuide.someBridge.countable.map((item) => (
                  <strong key={item}>{item}</strong>
                ))}
              </div>
              <div>
                <span>UNCOUNTABLE</span>
                {presentation.quantityGuide.someBridge.uncountable.map((item) => (
                  <strong key={item}>{item}</strong>
                ))}
              </div>
            </div>

            <div className="quantity-some-bridge__examples">
              {presentation.quantityGuide.someBridge.examples.map((example) => (
                <div className="grammar-example grammar-example--large" key={example.en}>
                  <strong>{example.en}</strong>
                  <span>{example.ru}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grammar-studio__section">
            <details className="quantity-quantifiers">
              <summary>
                <div>
                  <span className="grammar-studio__kicker">БОЛЬШАЯ КАРТОЧКА · QUANTIFIERS</span>
                  <h2>Как выбрать слово количества?</h2>
                  <p>Some / any · much / many / a lot of · a few / a little</p>
                </div>
                <b>+</b>
              </summary>

              <div className="quantity-quantifiers__body">
                {presentation.quantityGuide.sections.map((section) => (
                  <article className="quantity-quantifier-section" key={section.title}>
                    <div className="quantity-quantifier-section__heading">
                      <h3>{section.title}</h3>
                      <p>{section.subtitle}</p>
                    </div>

                    <div className="quantity-quantifier-rows">
                      {section.rows.map((row) => (
                        <div className="quantity-quantifier-row" key={row.word}>
                          <div className="quantity-quantifier-row__word">{row.word}</div>
                          <div className="quantity-quantifier-row__with">{row.with}</div>
                          <div className="quantity-quantifier-row__meaning">{row.meaning}</div>
                          <div className="quantity-quantifier-row__examples">
                            {row.examples.map((example) => (
                              <div key={example.en}>
                                <strong>{example.en}</strong>
                                <span>{example.ru}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="quantity-quantifier-section__tip">{section.tip}</div>
                  </article>
                ))}

                <div className="quantity-chooser">
                  <div className="quantity-chooser__column">
                    <span>COUNTABLE</span>
                    <h3>Если можно посчитать штуками</h3>
                    <div>
                      {presentation.quantityGuide.chooser.countable.map((item) => (
                        <strong key={item}>{item}</strong>
                      ))}
                    </div>
                  </div>
                  <div className="quantity-chooser__arrow" aria-hidden="true">
                    ↔
                  </div>
                  <div className="quantity-chooser__column">
                    <span>UNCOUNTABLE</span>
                    <h3>Если говорим о количестве</h3>
                    <div>
                      {presentation.quantityGuide.chooser.uncountable.map((item) => (
                        <strong key={item}>{item}</strong>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </section>
        </>
      ) : null}

      <section className="grammar-studio__section grammar-form-lab">
        <div className="grammar-studio__section-heading">
          <div>
            <span className="grammar-studio__kicker">
              {presentation.tenseGuide || presentation.quantityGuide
                ? '03 · МЕХАНИКА'
                : '02 · МЕХАНИКА'}
            </span>
            <h2>Разбери конструкцию</h2>
          </div>
          <p>Переключай формы: формула и примеры меняются прямо в карточке.</p>
        </div>

        <div className="grammar-form-lab__layout">
          <div className="grammar-form-tabs" role="tablist" aria-label="Формы конструкции">
            {material.forms.map((form, index) => (
              <button
                key={getFormLabel(form.label)}
                type="button"
                className={
                  index === activeForm
                    ? 'grammar-form-tab grammar-form-tab--active'
                    : 'grammar-form-tab'
                }
                onClick={() => setActiveForm(index)}
              >
                {getFormLabel(form.label)}
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
                <p>{getMistakeNote(mistake.note, mistake.right)}</p>
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
