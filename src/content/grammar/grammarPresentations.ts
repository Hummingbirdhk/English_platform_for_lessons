export type GrammarVisual =
  'formula' | 'timeline' | 'compare' | 'scale' | 'map' | 'ladder' | 'sort' | 'cards';

export type GrammarPresentation = {
  displayTitle: string;
  eyebrow: string;
  hero: string;
  rule: string;
  visual: GrammarVisual;
  accent: 'purple' | 'orange' | 'lemon';
  searchTerms: string[];
  cues: Array<{
    label: string;
    title: string;
    text: string;
    exampleEn: string;
    exampleRu: string;
  }>;
  memoryTip: string;
  practice: {
    prompt: string;
    options: string[];
    answer: string;
    feedback: string;
  };
  accordion?: {
    title: string;
    intro: string;
    headers: string[];
    rows: string[][];
  };
  tenseGuide?: {
    intro: string;
    uses: Array<{
      title: string;
      text: string;
      exampleEn: string;
      exampleRu: string;
    }>;
    markers: Array<{
      marker: string;
      meaning: string;
      example: string;
    }>;
    build: Array<{
      label: string;
      rule: string;
      exampleEn: string;
      exampleRu: string;
    }>;
    specialCases?: Array<{
      title: string;
      text: string;
      exampleEn: string;
      exampleRu: string;
    }>;
    contrast?: {
      title: string;
      leftTitle: string;
      rightTitle: string;
      rows: Array<{
        left: string;
        right: string;
        note: string;
      }>;
    };
  };
  quantityGuide?: {
    intro: string;
    nounGroups: Array<{
      title: string;
      subtitle: string;
      description: string;
      rules: string[];
      items: Array<{ icon: string; word: string; note: string }>;
    }>;
    someBridge: {
      title: string;
      text: string;
      countable: string[];
      uncountable: string[];
      examples: Array<{ en: string; ru: string }>;
    };
    sections: Array<{
      title: string;
      subtitle: string;
      rows: Array<{
        word: string;
        with: string;
        meaning: string;
        examples: Array<{ en: string; ru: string }>;
      }>;
      tip: string;
    }>;
    chooser: {
      countable: string[];
      uncountable: string[];
    };
  };
};

export const grammarPresentations: Record<string, GrammarPresentation> = {
  'grammar-to-be': {
    displayTitle: 'Глагол to be: am / is / are',
    eyebrow: 'A2 · TO BE В НАСТОЯЩЕМ',
    hero: 'Am / is / are помогают говорить о том, кто мы, какие мы, сколько нам лет, где мы находимся и в каком мы состоянии.',
    rule: 'В настоящем времени форма to be зависит от подлежащего: I → am, he/she/it → is, you/we/they → are. В вопросе am/is/are ставится перед подлежащим. В отрицании к форме to be добавляется not.',
    visual: 'formula',
    accent: 'purple',
    searchTerms: ['глагол быть', 'to be', 'am', 'is', 'are', 'to be present', 'настоящее to be'],
    cues: [
      {
        label: 'I',
        title: 'I → am',
        text: 'Только с I используется форма am.',
        exampleEn: 'I am twelve years old.',
        exampleRu: 'Мне двенадцать лет.',
      },
      {
        label: 'HE / SHE / IT',
        title: 'he / she / it → is',
        text: 'С одним человеком или предметом используем is.',
        exampleEn: 'She is very tired.',
        exampleRu: 'Она очень устала.',
      },
      {
        label: 'YOU / WE / THEY',
        title: 'you / we / they → are',
        text: 'You всегда используется с are, независимо от одного или нескольких собеседников.',
        exampleEn: 'They are at school.',
        exampleRu: 'Они в школе.',
      },
    ],
    memoryTip: 'С to be не нужны do/does: Are you ready? — не Do you are ready?',
    practice: {
      prompt: 'My brother ___ at home now.',
      options: ['am', 'is', 'are'],
      answer: 'is',
      feedback: 'My brother = he → is.',
    },
    accordion: {
      title: 'Когда нужен am / is / are',
      intro: 'В русском языке глагол «быть» в настоящем часто пропускается, но в английском am/is/are обычно обязателен.',
      headers: ['Ситуация', 'Пример', 'Перевод'],
      rows: [
        ['кто это / профессия', 'She is a doctor.', 'Она врач.'],
        ['возраст', 'I am twelve.', 'Мне двенадцать лет.'],
        ['описание', 'The room is small.', 'Комната маленькая.'],
        ['место', 'We are at home.', 'Мы дома.'],
        ['состояние / чувство', 'He is hungry.', 'Он голоден.'],
      ],
    },
  },
  'grammar-to-be-past': {
    displayTitle: 'Глагол to be: was / were',
    eyebrow: 'A2 · TO BE В ПРОШЛОМ',
    hero: 'Was и were — формы to be для прошлого: кто где был, каким был и в каком состоянии находился.',
    rule: 'В Past Simple глагол to be имеет две формы: I/he/she/it → was, you/we/they → were. Для вопросов was/were ставятся перед подлежащим. Для отрицания используем wasn’t / weren’t.',
    visual: 'timeline',
    accent: 'orange',
    searchTerms: ['to be past', 'was', 'were', 'was were', 'глагол быть в прошлом', 'прошлое to be'],
    cues: [
      {
        label: 'I / HE / SHE / IT',
        title: 'was',
        text: 'Was используется с I, he, she, it.',
        exampleEn: 'I was at home yesterday.',
        exampleRu: 'Вчера я был дома.',
      },
      {
        label: 'YOU / WE / THEY',
        title: 'were',
        text: 'Were используется с you, we, they.',
        exampleEn: 'They were very tired.',
        exampleRu: 'Они были очень уставшими.',
      },
      {
        label: '? / −',
        title: 'Was...? / Were...? · wasn’t / weren’t',
        text: 'С was/were не используется did.',
        exampleEn: 'Were you at school? — No, I wasn’t.',
        exampleRu: 'Ты был в школе? — Нет.',
      },
    ],
    memoryTip: 'Не добавляй did к was/were: Was she tired? — не Did she was tired?',
    practice: {
      prompt: 'We ___ at the cinema last night.',
      options: ['was', 'were', 'are'],
      answer: 'were',
      feedback: 'We → were.',
    },
    accordion: {
      title: 'Was / were: формы и маркеры',
      intro: 'Was/were часто встречаются с указанием законченного прошлого времени.',
      headers: ['Ситуация / маркер', 'Пример', 'Перевод'],
      rows: [
        ['yesterday', 'She was at home yesterday.', 'Вчера она была дома.'],
        ['last night / week', 'We were busy last week.', 'На прошлой неделе мы были заняты.'],
        ['... ago', 'He was here two hours ago.', 'Он был здесь два часа назад.'],
        ['when I was...', 'When I was ten, I was very shy.', 'Когда мне было десять, я был очень застенчивым.'],
      ],
    },
  },
  'grammar-have-got': {
    displayTitle: 'Have / have got: «у меня есть»',
    eyebrow: 'A2 · HAVE / HAVE GOT',
    hero: 'Две конструкции с похожим смыслом, но разной механикой вопросов и отрицаний.',
    rule: 'Have и have got могут выражать владение, отношения, характеристики и состояния. В have got вопрос начинается с have/has; с обычным have чаще используем do/does.',
    visual: 'compare',
    accent: 'lemon',
    searchTerms: ['иметь', 'have', 'have got', 'has got', 'у меня есть'],
    cues: [
      {
        label: 'Have',
        title: 'Do you have ...?',
        text: 'Обычный have ведёт себя как смысловой глагол.',
        exampleEn: 'Do you have a bike?',
        exampleRu: 'У тебя есть велосипед?',
      },
      {
        label: 'Have got',
        title: 'Have you got ...?',
        text: 'Have/has само выходит вперёд.',
        exampleEn: 'Have you got a bike?',
        exampleRu: 'У тебя есть велосипед?',
      },
      {
        label: 'He / she / it',
        title: 'has / has got',
        text: 'В третьем лице have меняется на has.',
        exampleEn: 'She has got two sisters.',
        exampleRu: 'У неё две сестры.',
      },
    ],
    memoryTip:
      'Не смешивай две системы: Do you have ...? или Have you got ...?, но не Do you have got ...?',
    practice: {
      prompt: '___ Mia got a brother?',
      options: ['Does', 'Has', 'Is'],
      answer: 'Has',
      feedback: 'В конструкции have got вопрос начинается с Has.',
    },
  },
  'grammar-possessives': {
    displayTitle: 'Притяжательные формы: my / mine / Anna’s',
    eyebrow: 'A2 · ЧЬЁ ЭТО?',
    hero: 'Одно значение «чей?», но три разные формы.',
    rule: 'My, your, his и т. д. стоят перед существительным. Mine, yours, hers и т. д. заменяют существительное. ’s показывает принадлежность человеку или животному.',
    visual: 'map',
    accent: 'purple',
    searchTerms: ['притяжательные', 'possessive', 'my mine', 'whose', 's'],
    cues: [
      {
        label: '+ noun',
        title: 'my / your / her',
        text: 'После формы обязательно существительное.',
        exampleEn: 'This is her bag.',
        exampleRu: 'Это её сумка.',
      },
      {
        label: 'без noun',
        title: 'mine / yours / hers',
        text: 'Слово уже заменяет предмет.',
        exampleEn: 'This bag is hers.',
        exampleRu: 'Эта сумка её.',
      },
      {
        label: 'имя',
        title: 'Anna’s bag',
        text: 'Для владельца-человека используем ’s.',
        exampleEn: 'It is Tom’s phone.',
        exampleRu: 'Это телефон Тома.',
      },
    ],
    memoryTip:
      'my book, но the book is mine. Если после формы идёт существительное — нужен my, your, her и т. д.',
    practice: {
      prompt: 'This pencil is ___.',
      options: ['my', 'mine', 'me'],
      answer: 'mine',
      feedback: 'После is существительного нет, поэтому нужен possessive pronoun: mine.',
    },
  },
  'grammar-object-pronouns': {
    displayTitle: 'Объектные и возвратные местоимения',
    eyebrow: 'A2 · КОГО? КОМУ?',
    hero: 'После действия местоимение меняет форму; если действие возвращается к тому же человеку, нужна форма myself / himself / herself и т. д.',
    rule: 'Если местоимение получает действие, используем me, you, him, her, it, us, them. Если субъект и объект — один и тот же человек, используем возвратную форму: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.',
    visual: 'map',
    accent: 'orange',
    searchTerms: [
      'объектные местоимения',
      'возвратные местоимения',
      'object pronouns',
      'reflexive pronouns',
      'me him her us them',
      'myself yourself himself herself',
    ],
    cues: [
      {
        label: 'I → me',
        title: 'see me',
        text: 'После глагола нужен объект.',
        exampleEn: 'Can you help me?',
        exampleRu: 'Ты можешь мне помочь?',
      },
      {
        label: 'he → him',
        title: 'call him',
        text: 'He — подлежащее, him — объект.',
        exampleEn: 'I know him.',
        exampleRu: 'Я знаю его.',
      },
      {
        label: 'same person',
        title: 'myself / himself / herself',
        text: 'Действие направлено на самого исполнителя.',
        exampleEn: 'He hurt himself.',
        exampleRu: 'Он поранился.',
      },
    ],
    memoryTip:
      'Спроси: «кто делает?» — subject pronoun; «кого/кому?» — object pronoun; «самого себя?» — reflexive pronoun.',
    practice: {
      prompt: 'I can see ___ over there. (she)',
      options: ['she', 'her', 'hers'],
      answer: 'her',
      feedback: 'После see нужен объект: her.',
    },
  },
  'grammar-plural-nouns': {
    displayTitle: 'Множественное число существительных',
    eyebrow: 'A2 · ONE → MANY',
    hero: 'Чаще всего добавляем -s, но окончание зависит от последнего звука и написания.',
    rule: 'Большинство существительных получают -s. После -s, -ss, -sh, -ch, -x, -o часто добавляем -es. Согласная + y обычно меняется на -ies. У части слов есть особые формы, которые нужно запомнить.',
    visual: 'ladder',
    accent: 'lemon',
    searchTerms: ['множественное число', 'plural nouns', 'plurals', 's es ies ves', 'исключения'],
    cues: [
      {
        label: 'обычно',
        title: '+ -s',
        text: 'book → books, car → cars.',
        exampleEn: 'I have two books.',
        exampleRu: 'У меня две книги.',
      },
      {
        label: 'шипящие',
        title: '+ -es',
        text: 'box → boxes, watch → watches.',
        exampleEn: 'There are three buses.',
        exampleRu: 'Там три автобуса.',
      },
      {
        label: 'consonant + y',
        title: 'y → ies',
        text: 'city → cities, baby → babies.',
        exampleEn: 'These cities are very old.',
        exampleRu: 'Эти города очень старые.',
      },
    ],
    memoryTip:
      'Гласная + y обычно сохраняет y: boy → boys, toy → toys. Не все слова на -f/-fe переходят в -ves — исключения лучше учить отдельно.',
    practice: {
      prompt: 'One child → two ___.',
      options: ['childs', 'children', 'childes'],
      answer: 'children',
      feedback: 'Child — неправильная форма множественного числа: children.',
    },
    accordion: {
      title: 'Исключения и особые формы',
      intro:
        'Раскрой список, когда нужно быстро проверить форму. Это не правило для всех слов — эти формы запоминаем отдельно.',
      headers: ['Единственное', 'Множественное', 'Перевод'],
      rows: [
        ['man', 'men', 'мужчина → мужчины'],
        ['woman', 'women', 'женщина → женщины'],
        ['child', 'children', 'ребёнок → дети'],
        ['person', 'people', 'человек → люди'],
        ['tooth', 'teeth', 'зуб → зубы'],
        ['foot', 'feet', 'ступня → ступни'],
        ['mouse', 'mice', 'мышь → мыши'],
        ['goose', 'geese', 'гусь → гуси'],
        ['sheep', 'sheep', 'овца → овцы'],
        ['fish', 'fish', 'рыба → рыбы'],
      ],
    },
  },
  'grammar-there-is-are': {
    displayTitle: 'There is / There are: что где находится',
    eyebrow: 'A2 · ЕСТЬ / НАХОДИТСЯ',
    hero: 'Сначала говорим, что что-то существует, потом — что именно.',
    rule: 'There is используется с одним предметом или неисчисляемым существительным; there are — с несколькими.',
    visual: 'formula',
    accent: 'orange',
    searchTerms: ['there is', 'there are', 'есть', 'находится'],
    cues: [
      {
        label: '1',
        title: 'There is',
        text: 'Один предмет.',
        exampleEn: 'There is a sofa in the room.',
        exampleRu: 'В комнате есть диван.',
      },
      {
        label: 'many',
        title: 'There are',
        text: 'Несколько предметов.',
        exampleEn: 'There are three windows.',
        exampleRu: 'Там три окна.',
      },
      {
        label: '?',
        title: 'Is there / Are there',
        text: 'В вопросе is/are выходят вперёд.',
        exampleEn: 'Are there any cafés nearby?',
        exampleRu: 'Рядом есть кафе?',
      },
    ],
    memoryTip: 'Смотри на существительное после конструкции: one → is, many → are.',
    practice: {
      prompt: '___ two books on the desk.',
      options: ['There is', 'There are', 'It is'],
      answer: 'There are',
      feedback: 'Two books — множественное число → There are.',
    },
  },
  'grammar-some-any-no-every': {
    displayTitle: 'Some / any / no / every и их производные',
    eyebrow: 'A2 · КТО-ТО / ЧТО-ТО / НИКТО',
    hero: 'Четыре основы собирают целую систему слов.',
    rule: 'Some чаще встречается в утверждениях, any — в вопросах и отрицаниях, no уже содержит отрицание, every означает «каждый / все».',
    visual: 'map',
    accent: 'purple',
    searchTerms: ['some any no every', 'кто-то', 'что-то', 'никто', 'something anything'],
    cues: [
      {
        label: 'some',
        title: 'someone / something',
        text: 'Неопределённый человек или предмет.',
        exampleEn: 'Someone is at the door.',
        exampleRu: 'Кто-то у двери.',
      },
      {
        label: 'any',
        title: 'anyone / anything',
        text: 'Часто в вопросе или отрицании.',
        exampleEn: 'Did you see anyone?',
        exampleRu: 'Ты кого-нибудь видел?',
      },
      {
        label: 'no / every',
        title: 'nobody / everybody',
        text: 'Ноль людей или все люди.',
        exampleEn: 'Nobody knows the answer.',
        exampleRu: 'Никто не знает ответа.',
      },
    ],
    memoryTip:
      'После no/nobody/nothing не добавляй ещё одно not: Nobody came, а не Nobody didn’t come.',
    practice: {
      prompt: 'I don’t know ___ here.',
      options: ['someone', 'anyone', 'no one'],
      answer: 'anyone',
      feedback: 'В отрицании обычно используем any → anyone.',
    },
  },
  'grammar-present-simple': {
    displayTitle: 'Present Simple',
    eyebrow: 'A2 · PRESENT SIMPLE',
    hero: 'Не «время про сейчас», а режим жизни: привычки, факты, расписания.',
    rule: 'В утверждении используем базовую форму глагола; с he/she/it добавляем -s/-es. В вопросе и отрицании работают do/does, и основной глагол возвращается в базовую форму.',
    visual: 'formula',
    accent: 'purple',
    searchTerms: ['present simple', 'простое настоящее', 'настоящее простое', 'do does'],
    cues: [
      {
        label: 'routine',
        title: 'Повторяется',
        text: 'Регулярные действия и привычки.',
        exampleEn: 'I walk to school every day.',
        exampleRu: 'Я каждый день хожу в школу пешком.',
      },
      {
        label: 'fact',
        title: 'Это факт',
        text: 'Факты и постоянная информация.',
        exampleEn: 'Water boils at 100°C.',
        exampleRu: 'Вода кипит при 100°C.',
      },
      {
        label: 'schedule',
        title: 'Расписание',
        text: 'Расписания транспорта, уроков, событий.',
        exampleEn: 'The lesson starts at nine.',
        exampleRu: 'Урок начинается в девять.',
      },
    ],
    memoryTip:
      'he/she/it → verb + s только в положительном предложении: She plays → She doesn’t play → Does she play?',
    practice: {
      prompt: 'Leo ___ basketball after school.',
      options: ['play', 'plays', 'is play'],
      answer: 'plays',
      feedback: 'Leo = he → в утверждении нужен plays.',
    },
    accordion: {
      title: 'Маркеры Present Simple',
      intro: 'Эти слова часто подсказывают, что речь идёт о привычке, регулярности или расписании.',
      headers: ['Маркер', 'Перевод', 'Пример'],
      rows: [
        ['always', 'всегда', 'I always walk to school.'],
        ['usually', 'обычно', 'We usually eat at home.'],
        ['often', 'часто', 'She often reads before bed.'],
        ['sometimes', 'иногда', 'They sometimes play chess.'],
        ['never', 'никогда', 'He never drinks coffee.'],
        ['every day / week', 'каждый день / неделю', 'I study English every day.'],
        ['on Mondays', 'по понедельникам', 'We have PE on Mondays.'],
      ],
    },
    tenseGuide: {
      intro:
        'Present Simple нужен не для того, что происходит прямо сейчас, а для обычного порядка вещей: привычек, повторяющихся действий, фактов, постоянных ситуаций и расписаний.',
      uses: [
        {
          title: 'Привычки и регулярность',
          text: 'То, что происходит обычно, часто, каждый день или по расписанию.',
          exampleEn: 'I usually get up at seven.',
          exampleRu: 'Я обычно встаю в семь.',
        },
        {
          title: 'Факты и общие истины',
          text: 'То, что считается постоянным или объективно верным.',
          exampleEn: 'The Earth goes round the Sun.',
          exampleRu: 'Земля вращается вокруг Солнца.',
        },
        {
          title: 'Постоянные ситуации',
          text: 'Работа, место жительства, интересы, то, что длится долго.',
          exampleEn: 'My parents live in London.',
          exampleRu: 'Мои родители живут в Лондоне.',
        },
        {
          title: 'Расписания',
          text: 'Поезда, уроки, фильмы, официальные события часто описываются Present Simple.',
          exampleEn: 'The train leaves at 8:15.',
          exampleRu: 'Поезд отправляется в 8:15.',
        },
      ],
      markers: [
        {
          marker: 'always / usually / often',
          meaning: 'всегда / обычно / часто',
          example: 'She often reads before bed.',
        },
        {
          marker: 'sometimes / never',
          meaning: 'иногда / никогда',
          example: 'He never drinks coffee.',
        },
        {
          marker: 'every day / week / year',
          meaning: 'каждый день / неделю / год',
          example: 'We study English every day.',
        },
        {
          marker: 'on Mondays / at weekends',
          meaning: 'по понедельникам / по выходным',
          example: 'I play tennis on Saturdays.',
        },
        {
          marker: 'How often...?',
          meaning: 'как часто?',
          example: 'How often do you go swimming?',
        },
      ],
      build: [
        {
          label: 'Утверждение',
          rule: 'I/you/we/they + V1; he/she/it + V-s/-es.',
          exampleEn: 'She works at a school.',
          exampleRu: 'Она работает в школе.',
        },
        {
          label: 'Отрицание',
          rule: 'don’t / doesn’t + V1. После doesn’t окончание -s у основного глагола исчезает.',
          exampleEn: 'He doesn’t like milk.',
          exampleRu: 'Он не любит молоко.',
        },
        {
          label: 'Вопрос',
          rule: 'Do / Does + subject + V1?',
          exampleEn: 'Does Tom play football?',
          exampleRu: 'Том играет в футбол?',
        },
      ],
      specialCases: [
        {
          title: 'Глаголы состояния',
          text: 'Like, know, understand, want, need, believe и похожие глаголы обычно употребляются в Simple, даже если речь идёт о настоящем моменте.',
          exampleEn: 'I understand you.',
          exampleRu: 'Я тебя понимаю.',
        },
        {
          title: 'I promise / I agree / I suggest',
          text: 'Иногда действие совершается самим высказыванием, поэтому используется Present Simple.',
          exampleEn: 'I promise I won’t be late.',
          exampleRu: 'Обещаю, что не опоздаю.',
        },
        {
          title: 'He / she / it: правописание',
          text: 'Обычно +s; после -s, -sh, -ch, -x, -o часто +es; consonant + y → -ies.',
          exampleEn: 'watch → watches · study → studies',
          exampleRu: 'watch → watches · study → studies',
        },
      ],
      contrast: {
        title: 'Present Simple или Present Continuous?',
        leftTitle: 'Present Simple',
        rightTitle: 'Present Continuous',
        rows: [
          {
            left: 'I work hard most days.',
            right: 'I’m working hard today.',
            note: 'обычно ↔ временно сегодня',
          },
          {
            left: 'She lives in Bristol.',
            right: 'She’s staying with friends this week.',
            note: 'постоянно ↔ временно',
          },
          {
            left: 'Water boils at 100°C.',
            right: 'The water is boiling now.',
            note: 'факт ↔ процесс сейчас',
          },
        ],
      },
    },
  },
  'grammar-adverbs-frequency': {
    displayTitle: 'Наречия частоты: always / usually / often / never',
    eyebrow: 'A2 · КАК ЧАСТО?',
    hero: 'Поставь действие на шкалу от 100% до 0%.',
    rule: 'С обычным глаголом наречие частоты стоит перед глаголом. С to be — после am/is/are.',
    visual: 'scale',
    accent: 'lemon',
    searchTerms: [
      'наречия частоты',
      'adverbs of frequency',
      'always usually often sometimes never',
    ],
    cues: [
      {
        label: '100%',
        title: 'always',
        text: 'Всегда.',
        exampleEn: 'I always do my homework.',
        exampleRu: 'Я всегда делаю домашнее задание.',
      },
      {
        label: '≈50%',
        title: 'sometimes',
        text: 'Иногда.',
        exampleEn: 'We sometimes eat out.',
        exampleRu: 'Мы иногда едим вне дома.',
      },
      {
        label: '0%',
        title: 'never',
        text: 'Никогда.',
        exampleEn: 'She is never late.',
        exampleRu: 'Она никогда не опаздывает.',
      },
    ],
    memoryTip: 'Обычный verb: always go. Глагол be: am always / is always / are always.',
    practice: {
      prompt: 'He ___ late for school. (never)',
      options: ['never is', 'is never', 'isn’t never'],
      answer: 'is never',
      feedback: 'С to be наречие ставим после is.',
    },
  },
  'grammar-present-continuous': {
    displayTitle: 'Present Continuous',
    eyebrow: 'A2 · PRESENT CONTINUOUS',
    hero: 'Кадр прямо сейчас: действие идёт в момент речи или временно вокруг него.',
    rule: 'Формула: am/is/are + verb-ing. В вопросе am/is/are выходит вперёд; в отрицании получает not.',
    visual: 'timeline',
    accent: 'orange',
    searchTerms: ['present continuous', 'настоящее длительное', 'am is are ing'],
    cues: [
      {
        label: 'NOW',
        title: 'Сейчас',
        text: 'Действие происходит прямо в момент речи.',
        exampleEn: 'She is talking on the phone.',
        exampleRu: 'Она сейчас говорит по телефону.',
      },
      {
        label: 'TEMP',
        title: 'Временно',
        text: 'Ситуация ограничена текущим периодом.',
        exampleEn: 'I am staying with my aunt this week.',
        exampleRu: 'На этой неделе я живу у тёти.',
      },
      {
        label: 'CHANGE',
        title: 'Меняется',
        text: 'Процесс постепенно развивается.',
        exampleEn: 'The weather is getting colder.',
        exampleRu: 'Погода становится холоднее.',
      },
    ],
    memoryTip: 'Не забывай две части: be + -ing. He playing и He is play — обе формы неверны.',
    practice: {
      prompt: 'Look! The dog ___ in the river.',
      options: ['swims', 'is swimming', 'swim'],
      answer: 'is swimming',
      feedback: 'Look! = действие сейчас → is swimming.',
    },
    accordion: {
      title: 'Маркеры Present Continuous',
      intro: 'Они часто показывают, что действие происходит прямо сейчас или временно.',
      headers: ['Маркер', 'Перевод', 'Пример'],
      rows: [
        ['now', 'сейчас', 'She is studying now.'],
        ['right now', 'прямо сейчас', 'I am talking to you right now.'],
        ['at the moment', 'в данный момент', 'They are having lunch at the moment.'],
        ['today', 'сегодня, временно', 'I am working from home today.'],
        ['this week', 'на этой неделе', 'We are staying with friends this week.'],
        ['Look! / Listen!', 'посмотри! / послушай!', 'Look! It is snowing.'],
      ],
    },
    tenseGuide: {
      intro:
        'Present Continuous показывает действие или ситуацию в процессе: прямо сейчас, вокруг текущего момента, временно или в развитии. Главное ощущение — «это ещё не закончено».',
      uses: [
        {
          title: 'Действие прямо сейчас',
          text: 'Человек находится в середине действия в момент речи.',
          exampleEn: 'Please be quiet. I’m trying to work.',
          exampleRu: 'Пожалуйста, потише. Я пытаюсь работать.',
        },
        {
          title: 'Процесс вокруг настоящего момента',
          text: 'Действие уже началось, ещё не закончилось, но не обязано происходить именно в эту секунду.',
          exampleEn: 'I’m reading a really good book at the moment.',
          exampleRu: 'Сейчас я читаю очень хорошую книгу.',
        },
        {
          title: 'Временная ситуация',
          text: 'Что-то происходит только в текущий период, а не постоянно.',
          exampleEn: 'I’m living with friends until I find a flat.',
          exampleRu: 'Я живу у друзей, пока не найду квартиру.',
        },
        {
          title: 'Изменение и развитие',
          text: 'Часто с get, become, increase, improve, grow, change.',
          exampleEn: 'Your English is getting better.',
          exampleRu: 'Твой английский становится лучше.',
        },
      ],
      markers: [
        {
          marker: 'now / right now',
          meaning: 'сейчас / прямо сейчас',
          example: 'She is studying now.',
        },
        {
          marker: 'at the moment',
          meaning: 'в данный момент',
          example: 'They are having lunch at the moment.',
        },
        {
          marker: 'today / this week / this year',
          meaning: 'в текущий период',
          example: 'I’m working from home this week.',
        },
        { marker: 'Look! / Listen!', meaning: 'смотри! / слушай!', example: 'Look! It’s snowing.' },
        { marker: 'still', meaning: 'всё ещё', example: 'He is still sleeping.' },
      ],
      build: [
        {
          label: 'Утверждение',
          rule: 'am / is / are + V-ing.',
          exampleEn: 'They are playing outside.',
          exampleRu: 'Они играют на улице.',
        },
        {
          label: 'Отрицание',
          rule: 'am not / isn’t / aren’t + V-ing.',
          exampleEn: 'She isn’t working today.',
          exampleRu: 'Она сегодня не работает.',
        },
        {
          label: 'Вопрос',
          rule: 'Am / Is / Are + subject + V-ing?',
          exampleEn: 'Are you listening to me?',
          exampleRu: 'Ты меня слушаешь?',
        },
      ],
      specialCases: [
        {
          title: 'Правописание -ing',
          text: 'make → making; run → running; lie → lying.',
          exampleEn: 'She is making dinner.',
          exampleRu: 'Она готовит ужин.',
        },
        {
          title: 'Глаголы состояния',
          text: 'Know, like, want, need, believe, understand, belong, seem обычно не используют Continuous.',
          exampleEn: 'I know the answer. Not: I am knowing the answer.',
          exampleRu: 'Я знаю ответ.',
        },
        {
          title: 'Always + -ing',
          text: 'Иногда выражает раздражение: действие происходит слишком часто.',
          exampleEn: 'You’re always losing your keys!',
          exampleRu: 'Ты постоянно теряешь ключи!',
        },
      ],
      contrast: {
        title: 'Present Continuous или Present Simple?',
        leftTitle: 'Present Continuous',
        rightTitle: 'Present Simple',
        rows: [
          {
            left: 'I’m staying here this week.',
            right: 'I live here.',
            note: 'временно ↔ постоянно',
          },
          { left: 'It’s raining now.', right: 'It rains a lot here.', note: 'сейчас ↔ вообще' },
          {
            left: 'She’s learning Italian.',
            right: 'She speaks Italian.',
            note: 'процесс ↔ умение/факт',
          },
        ],
      },
    },
  },
  'grammar-present-simple-vs-continuous': {
    displayTitle: 'Present Simple vs Present Continuous',
    eyebrow: 'A2 · ROUTINE VS NOW',
    hero: 'Один вопрос решает выбор: это обычный режим или временный кадр?',
    rule: 'Present Simple описывает регулярное и постоянное. Present Continuous — действие сейчас или временную ситуацию.',
    visual: 'compare',
    accent: 'purple',
    searchTerms: ['present simple vs continuous', 'simple continuous разница', 'routine now'],
    cues: [
      {
        label: 'обычно',
        title: 'Present Simple',
        text: 'Режим, факт, расписание.',
        exampleEn: 'I walk to school every day.',
        exampleRu: 'Я каждый день хожу в школу пешком.',
      },
      {
        label: 'сейчас',
        title: 'Present Continuous',
        text: 'Действие в процессе.',
        exampleEn: 'I am walking to school now.',
        exampleRu: 'Я сейчас иду в школу пешком.',
      },
      {
        label: 'state',
        title: 'like / know / want',
        text: 'Глаголы состояния обычно не ставим в Continuous.',
        exampleEn: 'I know the answer.',
        exampleRu: 'Я знаю ответ.',
      },
    ],
    memoryTip: 'every day / usually → Simple; now / at the moment / Look! → Continuous.',
    practice: {
      prompt: 'Usually she ___ tea, but today she ___ coffee.',
      options: ['drinks / is drinking', 'is drinking / drinks', 'drink / drinking'],
      answer: 'drinks / is drinking',
      feedback: 'Usually → Simple; today (временная ситуация) → Continuous.',
    },
    tenseGuide: {
      intro:
        'Выбор между этими временами зависит не от слова «сейчас», а от того, как говорящий видит ситуацию: как привычную/постоянную или как временный процесс.',
      uses: [
        {
          title: 'Simple = режим',
          text: 'Привычки, факты, постоянные ситуации, расписания.',
          exampleEn: 'I usually work from nine to five.',
          exampleRu: 'Я обычно работаю с девяти до пяти.',
        },
        {
          title: 'Continuous = кадр',
          text: 'Действие сейчас или временная ситуация вокруг настоящего.',
          exampleEn: 'I’m working from home today.',
          exampleRu: 'Сегодня я работаю из дома.',
        },
        {
          title: 'Permanent vs temporary',
          text: 'Одна и та же тема может использовать разные времена в зависимости от длительности ситуации.',
          exampleEn: 'Joe works hard. / Joe is working hard today.',
          exampleRu: 'Джо обычно много работает. / Сегодня Джо много работает.',
        },
      ],
      markers: [
        {
          marker: 'usually / often / every day',
          meaning: 'часто Simple',
          example: 'She usually walks to school.',
        },
        {
          marker: 'now / at the moment',
          meaning: 'часто Continuous',
          example: 'She is walking to school now.',
        },
        {
          marker: 'today / this week',
          meaning: 'часто временный Continuous',
          example: 'I’m staying here this week.',
        },
        {
          marker: 'always',
          meaning: 'Simple = регулярно; Continuous = слишком часто/раздражает',
          example: 'He always calls. / He’s always calling me!',
        },
      ],
      build: [
        {
          label: 'Present Simple',
          rule: 'V1 / V-s; вопросы do/does; отрицания don’t/doesn’t.',
          exampleEn: 'She works here.',
          exampleRu: 'Она здесь работает.',
        },
        {
          label: 'Present Continuous',
          rule: 'am/is/are + V-ing.',
          exampleEn: 'She is working here this week.',
          exampleRu: 'На этой неделе она работает здесь.',
        },
      ],
      specialCases: [
        {
          title: 'State verbs',
          text: 'Know, like, want, understand, believe, need обычно не ставятся в Continuous.',
          exampleEn: 'I want some water.',
          exampleRu: 'Я хочу воды.',
        },
        {
          title: 'Think',
          text: 'Think = «считать, иметь мнение» → Simple; think about = «обдумывать» → Continuous возможен.',
          exampleEn: 'I think it’s good. / I’m thinking about your idea.',
          exampleRu: 'Я думаю, это хорошо. / Я обдумываю твою идею.',
        },
        {
          title: 'See / hear / smell / taste',
          text: 'Эти глаголы восприятия часто употребляются в Simple.',
          exampleEn: 'Do you see that man?',
          exampleRu: 'Ты видишь того мужчину?',
        },
      ],
      contrast: {
        title: 'Быстрая проверка',
        leftTitle: 'Present Simple',
        rightTitle: 'Present Continuous',
        rows: [
          { left: 'обычно / регулярно', right: 'сейчас / временно', note: 'routine ↔ process' },
          { left: 'постоянно', right: 'на текущий период', note: 'permanent ↔ temporary' },
          { left: 'факт', right: 'изменение в процессе', note: 'fact ↔ development' },
        ],
      },
    },
  },
  'grammar-past-simple-regular': {
    displayTitle: 'Past Simple: правильные глаголы',
    eyebrow: 'A2 · FINISHED PAST',
    hero: 'Закрытое событие в прошлом: вчера, на прошлой неделе, два дня назад.',
    rule: 'В утверждении правильный глагол получает -ed. В вопросе и отрицании появляется did/didn’t, а основной глагол снова становится базовым.',
    visual: 'timeline',
    accent: 'lemon',
    searchTerms: ['past simple', 'прошедшее простое', 'regular verbs', 'ed'],
    cues: [
      {
        label: '+',
        title: 'verb + -ed',
        text: 'Утверждение.',
        exampleEn: 'We visited London last year.',
        exampleRu: 'В прошлом году мы посетили Лондон.',
      },
      {
        label: '−',
        title: 'didn’t + verb',
        text: 'После didn’t форма без -ed.',
        exampleEn: 'I didn’t watch TV.',
        exampleRu: 'Я не смотрел телевизор.',
      },
      {
        label: '?',
        title: 'Did + subject + verb?',
        text: 'После did форма без -ed.',
        exampleEn: 'Did you play football?',
        exampleRu: 'Ты играл в футбол?',
      },
    ],
    memoryTip: 'did забирает прошлое на себя: Did she visit? — не Did she visited?',
    practice: {
      prompt: 'Yesterday we ___ our grandparents.',
      options: ['visit', 'visited', 'did visited'],
      answer: 'visited',
      feedback: 'Утверждение в прошлом → regular verb + -ed.',
    },
    accordion: {
      title: 'Маркеры Past Simple',
      intro: 'Главный сигнал — законченный момент или период в прошлом.',
      headers: ['Маркер', 'Перевод', 'Пример'],
      rows: [
        ['yesterday', 'вчера', 'I called her yesterday.'],
        [
          'last week / month / year',
          'на прошлой неделе / в прошлом месяце / году',
          'We travelled last year.',
        ],
        ['two days ago', 'два дня назад', 'He arrived two days ago.'],
        ['in 2024', 'в 2024 году', 'They moved in 2024.'],
        ['when I was ten', 'когда мне было десять', 'I had a bike when I was ten.'],
      ],
    },
    tenseGuide: {
      intro:
        'Past Simple описывает завершённое действие или ситуацию в законченном прошлом. Важный вопрос: «это уже законченный момент/период?» Если да — Past Simple подходит очень часто.',
      uses: [
        {
          title: 'Одно завершённое действие',
          text: 'Событие произошло и закончилось.',
          exampleEn: 'I watched a film yesterday.',
          exampleRu: 'Вчера я посмотрел фильм.',
        },
        {
          title: 'Последовательность событий',
          text: 'Past Simple удобно рассказывает историю шаг за шагом.',
          exampleEn: 'She opened the door, walked in and sat down.',
          exampleRu: 'Она открыла дверь, вошла и села.',
        },
        {
          title: 'Прошлая привычка или состояние',
          text: 'То, что регулярно происходило раньше или было правдой тогда.',
          exampleEn: 'We lived near the sea when I was a child.',
          exampleRu: 'Мы жили у моря, когда я был ребёнком.',
        },
      ],
      markers: [
        { marker: 'yesterday', meaning: 'вчера', example: 'I called him yesterday.' },
        {
          marker: 'last week / year',
          meaning: 'на прошлой неделе / в прошлом году',
          example: 'We travelled last year.',
        },
        { marker: '... ago', meaning: '... назад', example: 'She arrived two days ago.' },
        { marker: 'in 2024', meaning: 'в конкретном прошлом году', example: 'They moved in 2024.' },
        {
          marker: 'when I was...',
          meaning: 'когда мне было...',
          example: 'I played chess when I was ten.',
        },
      ],
      build: [
        {
          label: 'Утверждение',
          rule: 'Правильный глагол: V-ed.',
          exampleEn: 'We visited our grandparents.',
          exampleRu: 'Мы навестили бабушку и дедушку.',
        },
        {
          label: 'Отрицание',
          rule: 'didn’t + V1. -ed больше не нужно.',
          exampleEn: 'We didn’t visit them on Sunday.',
          exampleRu: 'Мы не навещали их в воскресенье.',
        },
        {
          label: 'Вопрос',
          rule: 'Did + subject + V1?',
          exampleEn: 'Did you visit them?',
          exampleRu: 'Ты их навещал?',
        },
      ],
      specialCases: [
        {
          title: 'Правописание -ed',
          text: 'live → lived; study → studied; stop → stopped.',
          exampleEn: 'She studied all evening.',
          exampleRu: 'Она занималась весь вечер.',
        },
        {
          title: 'Произношение -ed',
          text: 'Окончание может звучать как /t/, /d/ или /ɪd/, хотя пишется одинаково.',
          exampleEn: 'worked / played / wanted',
          exampleRu: 'worked / played / wanted',
        },
        {
          title: 'Did уже показывает прошлое',
          text: 'После did/didn’t всегда V1.',
          exampleEn: 'Did she call? Not: Did she called?',
          exampleRu: 'Она звонила?',
        },
      ],
      contrast: {
        title: 'Past Simple или Present Perfect?',
        leftTitle: 'Past Simple',
        rightTitle: 'Present Perfect',
        rows: [
          {
            left: 'I saw him yesterday.',
            right: 'I’ve seen him today.',
            note: 'законченный момент ↔ период ещё идёт',
          },
          {
            left: 'When did you go?',
            right: 'Have you ever been?',
            note: 'когда именно ↔ опыт вообще',
          },
          {
            left: 'She lost her keys last week.',
            right: 'She has lost her keys.',
            note: 'прошлое событие ↔ результат сейчас',
          },
        ],
      },
    },
  },
  'grammar-past-simple-irregular': {
    displayTitle: 'Past Simple: неправильные глаголы',
    eyebrow: 'A2 · IRREGULAR VERBS',
    hero: 'У этих глаголов нет общего -ed: форму прошлого нужно узнавать и запоминать.',
    rule: 'В утверждении используем вторую форму: go → went, see → saw. Но после did/didn’t снова нужна первая форма: Did you go? / I didn’t see.',
    visual: 'timeline',
    accent: 'orange',
    searchTerms: ['past simple irregular', 'неправильные глаголы', 'irregular verbs', 'was were'],
    cues: [
      {
        label: 'V1',
        title: 'go',
        text: 'Базовая форма.',
        exampleEn: 'I usually go by bus.',
        exampleRu: 'Я обычно езжу на автобусе.',
      },
      {
        label: 'V2',
        title: 'went',
        text: 'Past Simple в утверждении.',
        exampleEn: 'I went by bus yesterday.',
        exampleRu: 'Вчера я поехал на автобусе.',
      },
      {
        label: 'did',
        title: 'did + V1',
        text: 'В вопросе возвращаем V1.',
        exampleEn: 'Did you go by bus?',
        exampleRu: 'Ты поехал на автобусе?',
      },
    ],
    memoryTip:
      'Ниже — отдельный раскрывающийся справочник неправильных глаголов A2. В Past Simple нужен столбец V2.',
    practice: {
      prompt: 'Last Saturday Mia ___ a new jacket.',
      options: ['buyed', 'bought', 'did bought'],
      answer: 'bought',
      feedback: 'Buy — неправильный: buy → bought.',
    },
    accordion: {
      title: 'Неправильные глаголы A2',
      intro:
        'V1 — базовая форма, V2 — Past Simple, V3 — форма для Present Perfect и других конструкций.',
      headers: ['V1', 'V2', 'V3', 'Перевод'],
      rows: [
        ['be', 'was / were', 'been', 'быть'],
        ['begin', 'began', 'begun', 'начинать'],
        ['break', 'broke', 'broken', 'ломать'],
        ['bring', 'brought', 'brought', 'приносить'],
        ['buy', 'bought', 'bought', 'покупать'],
        ['come', 'came', 'come', 'приходить'],
        ['do', 'did', 'done', 'делать'],
        ['drink', 'drank', 'drunk', 'пить'],
        ['drive', 'drove', 'driven', 'водить'],
        ['eat', 'ate', 'eaten', 'есть'],
        ['find', 'found', 'found', 'находить'],
        ['get', 'got', 'got / gotten', 'получать / становиться'],
        ['give', 'gave', 'given', 'давать'],
        ['go', 'went', 'gone', 'идти / ехать'],
        ['have', 'had', 'had', 'иметь'],
        ['know', 'knew', 'known', 'знать'],
        ['make', 'made', 'made', 'делать / создавать'],
        ['meet', 'met', 'met', 'встречать'],
        ['read', 'read', 'read', 'читать'],
        ['run', 'ran', 'run', 'бежать'],
        ['say', 'said', 'said', 'говорить'],
        ['see', 'saw', 'seen', 'видеть'],
        ['speak', 'spoke', 'spoken', 'говорить'],
        ['take', 'took', 'taken', 'брать'],
        ['teach', 'taught', 'taught', 'обучать'],
        ['tell', 'told', 'told', 'рассказывать'],
        ['think', 'thought', 'thought', 'думать'],
        ['understand', 'understood', 'understood', 'понимать'],
        ['wear', 'wore', 'worn', 'носить'],
        ['write', 'wrote', 'written', 'писать'],
      ],
    },
    tenseGuide: {
      intro:
        'Логика Past Simple та же, но у неправильных глаголов в утверждении используется особая форма V2. Эту форму нельзя вывести по одному правилу — её нужно запоминать.',
      uses: [
        {
          title: 'Завершённое событие',
          text: 'Неправильная форма используется только в утверждении.',
          exampleEn: 'We went to the cinema yesterday.',
          exampleRu: 'Вчера мы ходили в кино.',
        },
        {
          title: 'Последовательность действий',
          text: 'V2 помогает рассказывать прошлые события.',
          exampleEn: 'He got up, ate breakfast and left.',
          exampleRu: 'Он встал, позавтракал и ушёл.',
        },
        {
          title: 'Was / were',
          text: 'Глагол be имеет собственные формы: was / were.',
          exampleEn: 'They were tired after the trip.',
          exampleRu: 'После поездки они устали.',
        },
      ],
      markers: [
        { marker: 'yesterday', meaning: 'вчера', example: 'I saw her yesterday.' },
        { marker: 'last...', meaning: 'прошлый...', example: 'We went there last week.' },
        { marker: '... ago', meaning: '... назад', example: 'He came an hour ago.' },
        {
          marker: 'in + past year',
          meaning: 'в прошлом году/дате',
          example: 'She was born in 2014.',
        },
      ],
      build: [
        {
          label: 'Утверждение',
          rule: 'subject + V2: go → went, see → saw, buy → bought.',
          exampleEn: 'She bought a new bag.',
          exampleRu: 'Она купила новую сумку.',
        },
        {
          label: 'Отрицание',
          rule: 'didn’t + V1: didn’t go, didn’t see, didn’t buy.',
          exampleEn: 'She didn’t buy the shoes.',
          exampleRu: 'Она не купила туфли.',
        },
        {
          label: 'Вопрос',
          rule: 'Did + subject + V1?',
          exampleEn: 'Did she buy it?',
          exampleRu: 'Она это купила?',
        },
      ],
      specialCases: [
        {
          title: 'V2 только в утверждении',
          text: 'После did/didn’t неправильная форма исчезает.',
          exampleEn: 'Did you go? Not: Did you went?',
          exampleRu: 'Ты ходил?',
        },
        {
          title: 'Was / were без did',
          text: 'С be вопросы и отрицания строятся без did.',
          exampleEn: 'Were you at home? / I wasn’t tired.',
          exampleRu: 'Ты был дома? / Я не устал.',
        },
        {
          title: 'Учить группами',
          text: 'Удобно запоминать похожие модели: buy–bought–bought; think–thought–thought.',
          exampleEn: 'teach–taught–taught',
          exampleRu: 'teach–taught–taught',
        },
      ],
      contrast: {
        title: 'V1, V2 или V3?',
        leftTitle: 'Past Simple',
        rightTitle: 'Present Perfect',
        rows: [
          { left: 'went = V2', right: 'gone = V3', note: 'I went ↔ I have gone' },
          { left: 'saw = V2', right: 'seen = V3', note: 'I saw ↔ I have seen' },
          { left: 'wrote = V2', right: 'written = V3', note: 'I wrote ↔ I have written' },
        ],
      },
    },
  },
  'grammar-past-continuous': {
    displayTitle: 'Past Continuous',
    eyebrow: 'A2 · ACTION IN PROGRESS',
    hero: 'Не просто «что произошло», а что было в процессе в конкретный момент прошлого.',
    rule: 'Формула: was/were + verb-ing. Используем для действия, которое длилось в определённый момент, и для фона истории.',
    visual: 'timeline',
    accent: 'purple',
    searchTerms: ['past continuous', 'прошедшее длительное', 'was were ing'],
    cues: [
      {
        label: 'at 8',
        title: 'Момент в прошлом',
        text: 'Что происходило именно тогда.',
        exampleEn: 'At eight I was reading.',
        exampleRu: 'В восемь я читал.',
      },
      {
        label: 'background',
        title: 'Фон',
        text: 'Длинное действие вокруг события.',
        exampleEn: 'People were dancing and music was playing.',
        exampleRu: 'Люди танцевали, играла музыка.',
      },
      {
        label: '?',
        title: 'What were you doing?',
        text: 'Вопрос строим через was/were.',
        exampleEn: 'What were you doing at six?',
        exampleRu: 'Что ты делал в шесть?',
      },
    ],
    memoryTip: 'I/he/she/it → was; you/we/they → were.',
    practice: {
      prompt: 'At 7 p.m. they ___ dinner.',
      options: ['were having', 'had', 'was having'],
      answer: 'were having',
      feedback: 'They → were + having.',
    },
    tenseGuide: {
      intro:
        'Past Continuous показывает действие в процессе в определённый момент прошлого. Оно помогает «остановить кадр» и показать, что происходило вокруг.',
      uses: [
        {
          title: 'Процесс в конкретный момент',
          text: 'Важно не начало и не конец, а то, что действие шло в этот момент.',
          exampleEn: 'At eight o’clock I was doing my homework.',
          exampleRu: 'В восемь часов я делал домашнее задание.',
        },
        {
          title: 'Фон истории',
          text: 'Описание того, что происходило вокруг главного события.',
          exampleEn: 'People were talking and music was playing.',
          exampleRu: 'Люди разговаривали, играла музыка.',
        },
        {
          title: 'Два параллельных процесса',
          text: 'Два действия могли происходить одновременно.',
          exampleEn: 'While I was cooking, he was studying.',
          exampleRu: 'Пока я готовила, он занимался.',
        },
      ],
      markers: [
        {
          marker: 'at 7 p.m. yesterday',
          meaning: 'в конкретный момент',
          example: 'At 7 p.m. I was having dinner.',
        },
        {
          marker: 'while',
          meaning: 'пока / в то время как',
          example: 'While I was reading, she was drawing.',
        },
        {
          marker: 'when',
          meaning: 'когда другое событие произошло',
          example: 'I was sleeping when you called.',
        },
        {
          marker: 'all evening',
          meaning: 'весь вечер как процесс',
          example: 'They were studying all evening.',
        },
      ],
      build: [
        {
          label: 'Утверждение',
          rule: 'was / were + V-ing.',
          exampleEn: 'I was reading. They were talking.',
          exampleRu: 'Я читал. Они разговаривали.',
        },
        {
          label: 'Отрицание',
          rule: 'wasn’t / weren’t + V-ing.',
          exampleEn: 'She wasn’t sleeping.',
          exampleRu: 'Она не спала.',
        },
        {
          label: 'Вопрос',
          rule: 'Was / Were + subject + V-ing?',
          exampleEn: 'What were you doing?',
          exampleRu: 'Что ты делал?',
        },
      ],
      specialCases: [
        {
          title: 'Не для всех прошедших действий',
          text: 'Если событие просто случилось и закончилось, нужен Past Simple.',
          exampleEn: 'The phone rang at nine.',
          exampleRu: 'Телефон зазвонил в девять.',
        },
        {
          title: 'Фон + событие',
          text: 'Continuous создаёт фон, Simple показывает событие.',
          exampleEn: 'I was walking home when it started to rain.',
          exampleRu: 'Я шёл домой, когда начался дождь.',
        },
      ],
      contrast: {
        title: 'Past Continuous или Past Simple?',
        leftTitle: 'Past Continuous',
        rightTitle: 'Past Simple',
        rows: [
          { left: 'was walking', right: 'started', note: 'процесс ↔ событие' },
          { left: 'were talking', right: 'the teacher came in', note: 'фон ↔ действие' },
          { left: 'was raining', right: 'the rain stopped', note: 'длилось ↔ закончилось' },
        ],
      },
    },
  },
  'grammar-past-simple-vs-continuous': {
    displayTitle: 'Past Simple vs Past Continuous',
    eyebrow: 'A2 · EVENT VS BACKGROUND',
    hero: 'Длинный фон + короткое событие: так строятся истории.',
    rule: 'Past Continuous показывает процесс/фон; Past Simple — событие, которое произошло и часто прервало этот процесс.',
    visual: 'timeline',
    accent: 'orange',
    searchTerms: ['past simple vs continuous', 'when while', 'разница past simple continuous'],
    cues: [
      {
        label: 'while',
        title: 'Длинный фон',
        text: 'Часто Past Continuous.',
        exampleEn: 'I was walking home...',
        exampleRu: 'Я шёл домой...',
      },
      {
        label: 'when',
        title: 'Событие',
        text: 'Часто Past Simple.',
        exampleEn: '...when it started to rain.',
        exampleRu: '...когда начался дождь.',
      },
      {
        label: '2 processes',
        title: 'while + Continuous',
        text: 'Два параллельных процесса.',
        exampleEn: 'While I was cooking, he was studying.',
        exampleRu: 'Пока я готовила, он занимался.',
      },
    ],
    memoryTip: 'Рисуй линию: длинная полоса = Continuous, точка/событие = Simple.',
    practice: {
      prompt: 'I ___ TV when Mum ___.',
      options: ['watched / was coming', 'was watching / came', 'was watch / came'],
      answer: 'was watching / came',
      feedback: 'Фон → was watching; событие → came.',
    },
    tenseGuide: {
      intro:
        'В рассказах эти времена часто работают вместе: Past Continuous показывает сцену и процесс, Past Simple двигает события вперёд.',
      uses: [
        {
          title: 'Фон + событие',
          text: 'Длинное действие уже шло, когда произошло короткое событие.',
          exampleEn: 'I was walking home when it started to rain.',
          exampleRu: 'Я шёл домой, когда начался дождь.',
        },
        {
          title: 'Два процесса одновременно',
          text: 'Если оба действия идут параллельно, оба могут быть Continuous.',
          exampleEn: 'While I was cooking, Tom was doing homework.',
          exampleRu: 'Пока я готовила, Том делал домашнее задание.',
        },
        {
          title: 'Цепочка событий',
          text: 'Если действия происходят одно за другим, обычно нужен Past Simple.',
          exampleEn: 'He opened the door, came in and sat down.',
          exampleRu: 'Он открыл дверь, вошёл и сел.',
        },
      ],
      markers: [
        {
          marker: 'when',
          meaning: 'часто вводит короткое событие',
          example: 'I was sleeping when the phone rang.',
        },
        {
          marker: 'while',
          meaning: 'часто вводит процесс',
          example: 'While I was studying, she was cooking.',
        },
        {
          marker: 'at that moment',
          meaning: 'процесс в конкретный момент',
          example: 'At that moment, they were driving home.',
        },
      ],
      build: [
        {
          label: 'Фон',
          rule: 'was/were + V-ing.',
          exampleEn: 'We were watching TV...',
          exampleRu: 'Мы смотрели телевизор...',
        },
        {
          label: 'Событие',
          rule: 'Past Simple: V2 / V-ed.',
          exampleEn: '...when the lights went out.',
          exampleRu: '...когда погас свет.',
        },
      ],
      specialCases: [
        {
          title: 'Не ориентируйся только на длину',
          text: 'Главное — роль действия: процесс или завершённое событие.',
          exampleEn: 'It rained all day.',
          exampleRu: 'Дождь шёл весь день.',
        },
        {
          title: 'While + два Continuous',
          text: 'Подходит для двух одновременных действий.',
          exampleEn: 'While she was reading, I was writing.',
          exampleRu: 'Пока она читала, я писал.',
        },
      ],
      contrast: {
        title: 'Как читать историю',
        leftTitle: 'Past Continuous',
        rightTitle: 'Past Simple',
        rows: [
          { left: 'Что уже происходило?', right: 'Что произошло?', note: 'background ↔ event' },
          { left: 'линия процесса', right: 'точка события', note: 'ongoing ↔ completed' },
          { left: 'while', right: 'when', note: 'частая, но не абсолютная подсказка' },
        ],
      },
    },
  },
  'grammar-present-perfect': {
    displayTitle: 'Present Perfect',
    eyebrow: 'A2+ · PAST CONNECTED TO NOW',
    hero: 'Прошлое действие важно сейчас: опыт, результат или незавершённый период.',
    rule: 'Формула have/has + V3. Не называем законченный момент прошлого вроде yesterday; если называем, обычно нужен Past Simple.',
    visual: 'timeline',
    accent: 'lemon',
    searchTerms: [
      'present perfect',
      'настоящее совершенное',
      'have has v3',
      'ever never just already yet',
    ],
    cues: [
      {
        label: 'experience',
        title: 'Опыт',
        text: 'Когда именно — неважно.',
        exampleEn: 'Have you ever been to Italy?',
        exampleRu: 'Ты когда-нибудь был в Италии?',
      },
      {
        label: 'result',
        title: 'Результат сейчас',
        text: 'Прошлое изменило настоящее.',
        exampleEn: 'I’ve lost my keys.',
        exampleRu: 'Я потерял ключи (и сейчас их нет).',
      },
      {
        label: 'unfinished',
        title: 'Период ещё идёт',
        text: 'today / this week / this year.',
        exampleEn: 'I’ve had two lessons today.',
        exampleRu: 'Сегодня у меня уже было два урока.',
      },
    ],
    memoryTip:
      'just/already обычно стоят между have/has и V3; yet — часто в конце вопроса или отрицания.',
    practice: {
      prompt: 'She ___ her homework already.',
      options: ['finished', 'has finished', 'has finish'],
      answer: 'has finished',
      feedback: 'Already + связь с настоящим → has + V3.',
    },
    accordion: {
      title: 'Маркеры Present Perfect',
      intro: 'Они помогают увидеть связь прошлого действия с настоящим.',
      headers: ['Маркер', 'Как используется', 'Пример'],
      rows: [
        ['ever', 'когда-либо, чаще в вопросах', 'Have you ever seen snow?'],
        ['never', 'никогда', 'I have never tried sushi.'],
        ['just', 'только что', 'She has just arrived.'],
        ['already', 'уже', 'We have already finished.'],
        ['yet', 'уже? / ещё нет, обычно в конце', 'Have you finished yet?'],
        ['for', 'в течение периода', 'I have lived here for two years.'],
        ['since', 'с момента', 'I have lived here since 2024.'],
      ],
    },
    tenseGuide: {
      intro:
        'Present Perfect связывает прошлое с настоящим. Нам важен опыт, результат сейчас или период, который ещё не закончился, а не конкретный законченный момент прошлого.',
      uses: [
        {
          title: 'Жизненный опыт',
          text: 'Говорим, случалось ли это когда-нибудь; конкретная дата не важна.',
          exampleEn: 'Have you ever been to Italy?',
          exampleRu: 'Ты когда-нибудь был в Италии?',
        },
        {
          title: 'Результат сейчас',
          text: 'Действие произошло раньше, но его результат важен в настоящем.',
          exampleEn: 'I’ve lost my keys.',
          exampleRu: 'Я потерял ключи (и сейчас не могу их найти).',
        },
        {
          title: 'Недавнее событие',
          text: 'Часто с just, already, yet.',
          exampleEn: 'She has just arrived.',
          exampleRu: 'Она только что приехала.',
        },
        {
          title: 'Незаконченный период',
          text: 'Today, this week, this year — если период ещё продолжается.',
          exampleEn: 'I’ve had three lessons today.',
          exampleRu: 'Сегодня у меня уже было три урока.',
        },
      ],
      markers: [
        {
          marker: 'ever / never',
          meaning: 'когда-либо / никогда',
          example: 'Have you ever tried sushi?',
        },
        { marker: 'just', meaning: 'только что', example: 'He has just left.' },
        { marker: 'already', meaning: 'уже', example: 'We have already finished.' },
        { marker: 'yet', meaning: 'уже? / ещё нет', example: 'Have you finished yet?' },
        {
          marker: 'for',
          meaning: 'в течение периода',
          example: 'I have lived here for two years.',
        },
        {
          marker: 'since',
          meaning: 'с определённого момента',
          example: 'I have lived here since 2024.',
        },
      ],
      build: [
        {
          label: 'Утверждение',
          rule: 'have / has + V3.',
          exampleEn: 'She has finished her homework.',
          exampleRu: 'Она закончила домашнее задание.',
        },
        {
          label: 'Отрицание',
          rule: 'haven’t / hasn’t + V3.',
          exampleEn: 'I haven’t seen him today.',
          exampleRu: 'Я сегодня его не видел.',
        },
        {
          label: 'Вопрос',
          rule: 'Have / Has + subject + V3?',
          exampleEn: 'Have you finished?',
          exampleRu: 'Ты закончил?',
        },
      ],
      specialCases: [
        {
          title: 'Не используем с законченной датой',
          text: 'Yesterday, last year, in 2020 обычно требуют Past Simple.',
          exampleEn: 'I saw him yesterday. Not: I have seen him yesterday.',
          exampleRu: 'Я видел его вчера.',
        },
        {
          title: 'Been to vs gone to',
          text: 'been to = был и вернулся; gone to = ушёл/уехал и ещё там.',
          exampleEn: 'She has been to Paris. / She has gone to Paris.',
          exampleRu: 'Она была в Париже. / Она уехала в Париж.',
        },
        {
          title: 'V3 у неправильных глаголов',
          text: 'Нужна третья форма: go–gone, see–seen, write–written.',
          exampleEn: 'I have seen this film.',
          exampleRu: 'Я видел этот фильм.',
        },
      ],
      contrast: {
        title: 'Present Perfect или Past Simple?',
        leftTitle: 'Present Perfect',
        rightTitle: 'Past Simple',
        rows: [
          {
            left: 'Have you ever been to Spain?',
            right: 'When did you go to Spain?',
            note: 'опыт ↔ конкретное время',
          },
          {
            left: 'I’ve lost my keys.',
            right: 'I lost my keys yesterday.',
            note: 'результат сейчас ↔ факт прошлого',
          },
          {
            left: 'I’ve seen her today.',
            right: 'I saw her yesterday.',
            note: 'период ещё идёт ↔ законченный период',
          },
        ],
      },
    },
  },
  'grammar-future-going-to': {
    displayTitle: 'Be going to: планы и намерения',
    eyebrow: 'A2 · FUTURE PLAN',
    hero: 'Решение уже есть до момента разговора.',
    rule: 'Формула am/is/are going to + V1. Используем для планов и для прогнозов, когда сейчас видны признаки.',
    visual: 'timeline',
    accent: 'purple',
    searchTerms: ['going to', 'будущее', 'планы', 'намерения'],
    cues: [
      {
        label: 'plan',
        title: 'План',
        text: 'Решение уже принято.',
        exampleEn: 'We’re going to travel in July.',
        exampleRu: 'Мы собираемся путешествовать в июле.',
      },
      {
        label: 'evidence',
        title: 'Видимый прогноз',
        text: 'Есть признаки сейчас.',
        exampleEn: 'Look at those clouds. It’s going to rain.',
        exampleRu: 'Посмотри на тучи. Сейчас будет дождь.',
      },
      {
        label: '?',
        title: 'Are you going to ...?',
        text: 'Вопрос начинаем с be.',
        exampleEn: 'Are you going to swim?',
        exampleRu: 'Ты собираешься плавать?',
      },
    ],
    memoryTip: 'После going to всегда V1: going to visit, не going to visits.',
    practice: {
      prompt: 'I ___ study tonight. I’ve already made a plan.',
      options: ['will', 'am going to', 'am'],
      answer: 'am going to',
      feedback: 'План уже принят → be going to.',
    },
    tenseGuide: {
      intro:
        'Be going to показывает будущее, которое уже «началось» в голове или в текущей ситуации: решение принято заранее или уже видны признаки того, что произойдёт.',
      uses: [
        {
          title: 'План / намерение',
          text: 'Решение принято до момента речи.',
          exampleEn: 'I’m going to learn Spanish.',
          exampleRu: 'Я собираюсь учить испанский.',
        },
        {
          title: 'Прогноз по признакам',
          text: 'Сейчас есть видимая причина ожидать событие.',
          exampleEn: 'Look at those clouds. It’s going to rain.',
          exampleRu: 'Посмотри на тучи. Сейчас пойдёт дождь.',
        },
        {
          title: 'Намерение без точной договорённости',
          text: 'План есть, но время/организация могут быть ещё не определены.',
          exampleEn: 'I’m going to clean my room tomorrow.',
          exampleRu: 'Я собираюсь убрать комнату завтра.',
        },
      ],
      markers: [
        {
          marker: 'tomorrow / next week',
          meaning: 'будущее время',
          example: 'I’m going to call her tomorrow.',
        },
        { marker: 'Look!', meaning: 'видимый признак', example: 'Look! He’s going to fall.' },
        {
          marker: 'I’ve decided...',
          meaning: 'решение уже принято',
          example: 'I’ve decided I’m going to study more.',
        },
      ],
      build: [
        {
          label: 'Утверждение',
          rule: 'am / is / are + going to + V1.',
          exampleEn: 'She is going to travel.',
          exampleRu: 'Она собирается путешествовать.',
        },
        {
          label: 'Отрицание',
          rule: 'am not / isn’t / aren’t + going to + V1.',
          exampleEn: 'I’m not going to eat that.',
          exampleRu: 'Я не собираюсь это есть.',
        },
        {
          label: 'Вопрос',
          rule: 'Am / Is / Are + subject + going to + V1?',
          exampleEn: 'Are you going to stay?',
          exampleRu: 'Ты собираешься остаться?',
        },
      ],
      specialCases: [
        {
          title: 'Going to vs Present Continuous',
          text: 'Going to = намерение; Present Continuous = уже организованная договорённость.',
          exampleEn: 'I’m going to visit Anna. / I’m meeting Anna at six.',
          exampleRu: 'Я собираюсь навестить Анну. / Я встречаюсь с Анной в шесть.',
        },
        {
          title: 'Was / were going to',
          text: 'Можно говорить о прошлом намерении, которое могло не осуществиться.',
          exampleEn: 'We were going to travel by train, but we drove.',
          exampleRu: 'Мы собирались ехать поездом, но поехали на машине.',
        },
      ],
      contrast: {
        title: 'Going to или will?',
        leftTitle: 'Going to',
        rightTitle: 'Will',
        rows: [
          {
            left: 'решение уже принято',
            right: 'решение сейчас',
            note: 'plan before ↔ decision now',
          },
          {
            left: 'прогноз по видимым признакам',
            right: 'мнение/предположение',
            note: 'evidence ↔ opinion',
          },
          {
            left: 'I’m going to study tonight.',
            right: 'I’ll help you.',
            note: 'plan ↔ spontaneous offer',
          },
        ],
      },
    },
  },
  'grammar-future-present-continuous': {
    displayTitle: 'Present Continuous для будущих договорённостей',
    eyebrow: 'A2+ · FIXED ARRANGEMENT',
    hero: 'В календаре уже есть конкретика: встреча, билет, время, договорённость.',
    rule: 'Present Continuous может обозначать будущее, если договорённость уже зафиксирована. Обычно рядом есть конкретное время.',
    visual: 'timeline',
    accent: 'orange',
    searchTerms: ['present continuous future', 'будущие договоренности', 'arrangements'],
    cues: [
      {
        label: 'fixed',
        title: 'Уже договорились',
        text: 'Есть конкретный план с другими людьми.',
        exampleEn: 'I’m meeting Kate at six.',
        exampleRu: 'Я встречаюсь с Кейт в шесть.',
      },
      {
        label: 'calendar',
        title: 'Есть время',
        text: 'Tomorrow / tonight / on Friday.',
        exampleEn: 'We’re flying on Friday.',
        exampleRu: 'Мы летим в пятницу.',
      },
      {
        label: 'question',
        title: 'What are you doing...?',
        text: 'Спрашиваем о планах.',
        exampleEn: 'What are you doing tonight?',
        exampleRu: 'Что ты делаешь сегодня вечером?',
      },
    ],
    memoryTip: 'going to = намерение; Present Continuous = договорённость уже организована.',
    practice: {
      prompt: 'I ___ the dentist at 4 tomorrow.',
      options: ['see', 'am seeing', 'will seeing'],
      answer: 'am seeing',
      feedback: 'Есть конкретная запись на время → arrangement.',
    },
    tenseGuide: {
      intro:
        'Present Continuous может говорить о будущем, когда событие уже организовано: есть договорённость, запись, билет, конкретное время или другой признак фиксированного плана.',
      uses: [
        {
          title: 'Личная договорённость',
          text: 'Вы уже договорились с человеком.',
          exampleEn: 'I’m meeting Kate at six.',
          exampleRu: 'Я встречаюсь с Кейт в шесть.',
        },
        {
          title: 'Запись / бронирование',
          text: 'Есть назначенное время или оформленный план.',
          exampleEn: 'I’m seeing the dentist tomorrow.',
          exampleRu: 'Завтра я иду к стоматологу.',
        },
        {
          title: 'Поездка с организацией',
          text: 'Билеты или маршрут уже определены.',
          exampleEn: 'We’re flying to Rome on Friday.',
          exampleRu: 'Мы летим в Рим в пятницу.',
        },
      ],
      markers: [
        {
          marker: 'tomorrow / tonight',
          meaning: 'конкретное будущее время',
          example: 'I’m working tonight.',
        },
        {
          marker: 'at six / on Friday',
          meaning: 'назначенное время',
          example: 'We’re meeting at six.',
        },
        {
          marker: 'next week',
          meaning: 'будущий период',
          example: 'She’s starting a new course next week.',
        },
      ],
      build: [
        {
          label: 'Утверждение',
          rule: 'am/is/are + V-ing + future time.',
          exampleEn: 'We are leaving tomorrow.',
          exampleRu: 'Мы уезжаем завтра.',
        },
        {
          label: 'Отрицание',
          rule: 'am not/isn’t/aren’t + V-ing.',
          exampleEn: 'I’m not working on Saturday.',
          exampleRu: 'В субботу я не работаю.',
        },
        {
          label: 'Вопрос',
          rule: 'Am/Is/Are + subject + V-ing?',
          exampleEn: 'What are you doing tonight?',
          exampleRu: 'Что ты делаешь сегодня вечером?',
        },
      ],
      specialCases: [
        {
          title: 'Не расписание',
          text: 'Официальные расписания обычно используют Present Simple.',
          exampleEn: 'The film starts at 8:15.',
          exampleRu: 'Фильм начинается в 8:15.',
        },
        {
          title: 'Не просто намерение',
          text: 'Если договорённости ещё нет, going to часто естественнее.',
          exampleEn: 'I’m going to look for a new phone.',
          exampleRu: 'Я собираюсь поискать новый телефон.',
        },
      ],
      contrast: {
        title: 'Три способа говорить о будущем',
        leftTitle: 'Arrangement',
        rightTitle: 'Другие варианты',
        rows: [
          {
            left: 'I’m meeting Tom at six.',
            right: 'I’m going to meet Tom sometime.',
            note: 'фиксировано ↔ намерение',
          },
          {
            left: 'We’re flying on Friday.',
            right: 'The flight leaves at 9.',
            note: 'личный план ↔ расписание',
          },
          {
            left: 'I’m seeing the dentist tomorrow.',
            right: 'I’ll call the dentist now.',
            note: 'запись ↔ решение сейчас',
          },
        ],
      },
    },
  },
  'grammar-future-will': {
    displayTitle: 'Will / won’t: прогнозы и решения',
    eyebrow: 'A2 · WILL',
    hero: 'Решение рождается прямо сейчас — или это просто прогноз о будущем.',
    rule: 'Will + V1 используется для спонтанных решений, обещаний, предложений и прогнозов. Форма не меняется по лицам.',
    visual: 'cards',
    accent: 'lemon',
    searchTerms: ['will wont', 'будущее', 'future simple', 'прогнозы'],
    cues: [
      {
        label: 'prediction',
        title: 'Прогноз',
        text: 'Мнение о будущем.',
        exampleEn: 'I think it will be sunny.',
        exampleRu: 'Думаю, будет солнечно.',
      },
      {
        label: 'decision now',
        title: 'Решил сейчас',
        text: 'Реакция в момент речи.',
        exampleEn: 'The phone is ringing. I’ll answer it.',
        exampleRu: 'Телефон звонит. Я отвечу.',
      },
      {
        label: 'promise',
        title: 'Обещание',
        text: 'Will часто звучит в обещаниях.',
        exampleEn: 'I won’t forget.',
        exampleRu: 'Я не забуду.',
      },
    ],
    memoryTip: 'После will нет to и нет -s: she will come.',
    practice: {
      prompt: 'I’m thirsty. — I ___ get you some water.',
      options: ['am going', 'will', 'will to'],
      answer: 'will',
      feedback: 'Решение принимается прямо сейчас → will.',
    },
    tenseGuide: {
      intro:
        'Will используется, когда мы принимаем решение в момент речи, предлагаем помощь, обещаем что-то или просто выражаем мнение/прогноз о будущем.',
      uses: [
        {
          title: 'Спонтанное решение',
          text: 'Решение принимается прямо сейчас.',
          exampleEn: 'The phone is ringing. I’ll answer it.',
          exampleRu: 'Телефон звонит. Я отвечу.',
        },
        {
          title: 'Предложение помощи',
          text: 'Will часто появляется в реакциях на ситуацию.',
          exampleEn: 'That bag looks heavy. I’ll help you.',
          exampleRu: 'Сумка выглядит тяжёлой. Я помогу.',
        },
        {
          title: 'Обещание',
          text: 'Will / won’t удобно для обещаний.',
          exampleEn: 'I won’t tell anyone.',
          exampleRu: 'Я никому не скажу.',
        },
        {
          title: 'Прогноз-мнение',
          text: 'Мы предполагаем, что что-то произойдёт.',
          exampleEn: 'I think it will be sunny tomorrow.',
          exampleRu: 'Думаю, завтра будет солнечно.',
        },
      ],
      markers: [
        {
          marker: 'I think / probably',
          meaning: 'мнение / вероятность',
          example: 'I think she will come.',
        },
        { marker: 'I promise', meaning: 'обещание', example: 'I promise I’ll call.' },
        { marker: 'I’ll...', meaning: 'решение сейчас', example: 'I’ll open the window.' },
        { marker: 'won’t', meaning: 'не будет / отказывается', example: 'The car won’t start.' },
      ],
      build: [
        {
          label: 'Утверждение',
          rule: 'will + V1. Для всех лиц форма одинаковая.',
          exampleEn: 'She will come later.',
          exampleRu: 'Она придёт позже.',
        },
        {
          label: 'Отрицание',
          rule: 'will not = won’t + V1.',
          exampleEn: 'I won’t forget.',
          exampleRu: 'Я не забуду.',
        },
        {
          label: 'Вопрос',
          rule: 'Will + subject + V1?',
          exampleEn: 'Will you help me?',
          exampleRu: 'Ты мне поможешь?',
        },
      ],
      specialCases: [
        {
          title: 'Will you...?',
          text: 'Может быть просьбой.',
          exampleEn: 'Will you please close the door?',
          exampleRu: 'Закрой, пожалуйста, дверь.',
        },
        {
          title: 'Shall I / Shall we?',
          text: 'Используется для предложений и совместных решений, особенно в вопросах.',
          exampleEn: 'Shall we go?',
          exampleRu: 'Пойдём?',
        },
        {
          title: 'Не для заранее организованного плана',
          text: 'Если всё уже договорено, Present Continuous обычно естественнее.',
          exampleEn: 'I’m meeting Kate tomorrow. Not: I’ll meet Kate tomorrow.',
          exampleRu: 'Я встречаюсь с Кейт завтра.',
        },
      ],
      contrast: {
        title: 'Will или going to?',
        leftTitle: 'Will',
        rightTitle: 'Going to',
        rows: [
          { left: 'решение сейчас', right: 'решение уже принято', note: 'now ↔ before now' },
          {
            left: 'мнение: I think...',
            right: 'признаки сейчас: Look!',
            note: 'opinion ↔ evidence',
          },
          { left: 'I’ll help you.', right: 'I’m going to study tonight.', note: 'offer ↔ plan' },
        ],
      },
    },
  },
  'grammar-can-may-be-able-to': {
    displayTitle: 'Can / may / be able to: умение и разрешение',
    eyebrow: 'A2 · ABILITY & PERMISSION',
    hero: 'Одна группа форм отвечает на «могу?» — но смысл может быть разным.',
    rule: 'Can — умение и обычное разрешение; may — более формальное разрешение; be able to удобно, когда нужна другая временная форма.',
    visual: 'map',
    accent: 'purple',
    searchTerms: ['can may be able to', 'мочь', 'умение', 'разрешение'],
    cues: [
      {
        label: 'ability',
        title: 'can',
        text: 'Умение сейчас.',
        exampleEn: 'She can swim.',
        exampleRu: 'Она умеет плавать.',
      },
      {
        label: 'permission',
        title: 'can / may',
        text: 'Можно ли что-то сделать.',
        exampleEn: 'May I come in?',
        exampleRu: 'Можно войти?',
      },
      {
        label: 'other tense',
        title: 'be able to',
        text: 'Когда can не подходит по времени.',
        exampleEn: 'I’ll be able to help tomorrow.',
        exampleRu: 'Я смогу помочь завтра.',
      },
    ],
    memoryTip: 'После modal verb — V1 без to: can swim, may go.',
    practice: {
      prompt: 'She ___ speak three languages.',
      options: ['can', 'cans', 'can to'],
      answer: 'can',
      feedback: 'Modal can не получает -s и не требует to.',
    },
  },
  'grammar-should': {
    displayTitle: 'Should / shouldn’t: советы',
    eyebrow: 'A2 · ADVICE',
    hero: 'Не приказ, а рекомендация: «тебе стоит».',
    rule: 'Should + V1 даёт совет. Shouldn’t + V1 показывает, что действие — плохая идея.',
    visual: 'cards',
    accent: 'orange',
    searchTerms: ['should shouldnt', 'совет', 'рекомендация'],
    cues: [
      {
        label: '+',
        title: 'should',
        text: 'Хорошая идея.',
        exampleEn: 'You should drink more water.',
        exampleRu: 'Тебе стоит пить больше воды.',
      },
      {
        label: '−',
        title: 'shouldn’t',
        text: 'Плохая идея.',
        exampleEn: 'You shouldn’t stay up so late.',
        exampleRu: 'Тебе не стоит так поздно ложиться.',
      },
      {
        label: '?',
        title: 'What should I do?',
        text: 'Просим совет.',
        exampleEn: 'Should I call her?',
        exampleRu: 'Мне стоит ей позвонить?',
      },
    ],
    memoryTip: 'После should — V1: should go, не should to go и не should goes.',
    practice: {
      prompt: 'You look tired. You ___ go to bed earlier.',
      options: ['should', 'mustn’t', 'are'],
      answer: 'should',
      feedback: 'Это совет, а не строгий запрет → should.',
    },
  },
  'grammar-must-mustnt-cant': {
    displayTitle: 'Must / mustn’t / can’t: строгие правила',
    eyebrow: 'A2 · RULES',
    hero: 'Must — обязательно. Mustn’t / can’t — запрещено.',
    rule: 'Must выражает сильную обязанность. Mustn’t и can’t в правилах означают запрет. Это не то же самое, что don’t have to.',
    visual: 'scale',
    accent: 'orange',
    searchTerms: ['must mustnt cant', 'обязанность', 'запрет', 'правила'],
    cues: [
      {
        label: 'MUST',
        title: 'обязательно',
        text: 'Правило требует действие.',
        exampleEn: 'You must wear a seat belt.',
        exampleRu: 'Ты должен пристёгиваться.',
      },
      {
        label: 'MUSTN’T',
        title: 'запрещено',
        text: 'Действие нельзя делать.',
        exampleEn: 'You mustn’t park here.',
        exampleRu: 'Здесь нельзя парковаться.',
      },
      {
        label: 'CAN’T',
        title: 'нельзя',
        text: 'Часто обычный разговорный запрет.',
        exampleEn: 'You can’t use your phone here.',
        exampleRu: 'Здесь нельзя пользоваться телефоном.',
      },
    ],
    memoryTip: 'mustn’t = нельзя; don’t have to = можно не делать.',
    practice: {
      prompt: 'You ___ touch this button. It’s dangerous.',
      options: ['mustn’t', 'don’t have to', 'should'],
      answer: 'mustn’t',
      feedback: 'Это запрет → mustn’t.',
    },
  },
  'grammar-have-to-neednt': {
    displayTitle: 'Have to / don’t have to / needn’t',
    eyebrow: 'A2 · NECESSITY',
    hero: 'Нужно сделать — или можно не делать?',
    rule: 'Have to = необходимость. Don’t have to / needn’t = необходимости нет. Это не запрет.',
    visual: 'compare',
    accent: 'lemon',
    searchTerms: ['have to', 'dont have to', 'neednt', 'необходимо', 'не обязательно'],
    cues: [
      {
        label: 'need',
        title: 'have to',
        text: 'Есть необходимость.',
        exampleEn: 'I have to get up early.',
        exampleRu: 'Мне нужно рано вставать.',
      },
      {
        label: 'optional',
        title: 'don’t have to',
        text: 'Можно сделать, можно не делать.',
        exampleEn: 'You don’t have to come early.',
        exampleRu: 'Тебе необязательно приходить рано.',
      },
      {
        label: 'optional',
        title: 'needn’t',
        text: 'Тоже «нет необходимости».',
        exampleEn: 'You needn’t wait.',
        exampleRu: 'Тебе необязательно ждать.',
      },
    ],
    memoryTip: 'Запрет = mustn’t. Необязательность = don’t have to / needn’t.',
    practice: {
      prompt: 'It’s a free day. We ___ wear school uniform.',
      options: ['mustn’t', 'don’t have to', 'have to'],
      answer: 'don’t have to',
      feedback: 'Не запрещено, просто не обязательно → don’t have to.',
    },
  },
  'grammar-imperatives': {
    displayTitle: 'Повелительное наклонение: команды и инструкции',
    eyebrow: 'A2 · DO THIS',
    hero: 'Короткая команда без подлежащего.',
    rule: 'Используем V1 без подлежащего: Turn left. Для отрицания ставим Don’t перед глаголом.',
    visual: 'cards',
    accent: 'purple',
    searchTerms: ['imperative', 'повелительное наклонение', 'команды', 'инструкции'],
    cues: [
      {
        label: '+',
        title: 'V1',
        text: 'Команда или инструкция.',
        exampleEn: 'Turn left.',
        exampleRu: 'Поверни налево.',
      },
      {
        label: '−',
        title: 'Don’t + V1',
        text: 'Запретительная инструкция.',
        exampleEn: 'Don’t cross here.',
        exampleRu: 'Не переходи здесь.',
      },
      {
        label: 'polite',
        title: 'Please + imperative',
        text: 'Вежливая просьба.',
        exampleEn: 'Please sit down.',
        exampleRu: 'Пожалуйста, садитесь.',
      },
    ],
    memoryTip: 'В обычной команде you не пишем: Open the book, не You open the book.',
    practice: {
      prompt: '___ on the grass.',
      options: ['Not walk', 'Don’t walk', 'Doesn’t walk'],
      answer: 'Don’t walk',
      feedback: 'Отрицательная команда → Don’t + V1.',
    },
  },
  'grammar-prepositions-time': {
    displayTitle: 'Предлоги времени: in / on / at',
    eyebrow: 'A2 · PREPOSITIONS OF TIME',
    hero: 'Масштаб времени: IN — большой период, ON — день/дата, AT — точка.',
    rule: 'Думай не как о списке исключений, а как о приближении: год/месяц → день → точное время. Затем отдельно запоминаем устойчивые случаи.',
    visual: 'scale',
    accent: 'orange',
    searchTerms: ['предлоги времени', 'prepositions of time', 'in on at', 'время'],
    cues: [
      {
        label: 'BIG',
        title: 'IN',
        text: 'Годы, месяцы, сезоны, части дня.',
        exampleEn: 'in 2026 · in October · in the morning',
        exampleRu: 'в 2026 году · в октябре · утром',
      },
      {
        label: 'DAY',
        title: 'ON',
        text: 'Дни и даты.',
        exampleEn: 'on Monday · on 24 October',
        exampleRu: 'в понедельник · 24 октября',
      },
      {
        label: 'POINT',
        title: 'AT',
        text: 'Точное время и устойчивые точки.',
        exampleEn: 'at 7:30 · at noon · at night',
        exampleRu: 'в 7:30 · в полдень · ночью',
      },
    ],
    memoryTip: 'Важное исключение: at night, но in the morning / afternoon / evening.',
    practice: {
      prompt: 'We have English ___ Tuesday ___ 10:00.',
      options: ['in / on', 'on / at', 'at / in'],
      answer: 'on / at',
      feedback: 'День → ON, точное время → AT.',
    },
  },
  'grammar-prepositions-place-movement': {
    displayTitle: 'Предлоги места и движения',
    eyebrow: 'A2 · WHERE? WHERE TO?',
    hero: 'Сначала реши: предмет уже находится там или движется туда.',
    rule: 'In/on/at описывают положение. Into/out of/across/through/along показывают движение и направление.',
    visual: 'map',
    accent: 'purple',
    searchTerms: [
      'предлоги места',
      'предлоги движения',
      'prepositions of place',
      'in on at into across',
    ],
    cues: [
      {
        label: 'inside',
        title: 'IN',
        text: 'Внутри пространства.',
        exampleEn: 'The keys are in the bag.',
        exampleRu: 'Ключи в сумке.',
      },
      {
        label: 'surface',
        title: 'ON',
        text: 'На поверхности.',
        exampleEn: 'The phone is on the table.',
        exampleRu: 'Телефон на столе.',
      },
      {
        label: 'point',
        title: 'AT',
        text: 'Точка / место деятельности.',
        exampleEn: 'She is at school.',
        exampleRu: 'Она в школе.',
      },
    ],
    memoryTip:
      'in = внутри; into = движение внутрь. on = на поверхности; onto = движение на поверхность.',
    practice: {
      prompt: 'The cat jumped ___ the box.',
      options: ['in', 'into', 'at'],
      answer: 'into',
      feedback: 'Есть движение снаружи внутрь → into.',
    },
  },
  'grammar-countable-uncountable': {
    displayTitle: 'Исчисляемые и неисчисляемые существительные',
    eyebrow: 'A2 · COUNT OR AMOUNT?',
    hero: 'Сначала решаем: можем посчитать отдельные штуки или говорим о количестве вещества, материала или понятия.',
    rule: 'Исчисляемые существительные можно посчитать поштучно: one apple, two apples. У них есть единственное и множественное число, а с одной штукой можно использовать a/an. Неисчисляемые обычно воспринимаются как масса, вещество, материал, абстрактное понятие или общее количество: water, rice, money, information. Их обычно не ставим во множественное число и не используем с a/an.',
    visual: 'sort',
    accent: 'lemon',
    searchTerms: [
      'исчисляемые',
      'неисчисляемые',
      'countable uncountable',
      'some any',
      'much many',
      'a lot of',
      'a few a little',
      'количество',
    ],
    cues: [
      {
        label: 'COUNTABLE',
        title: 'Можно посчитать штуками',
        text: 'one apple → two apples; a book → three books.',
        exampleEn: 'There are three apples on the table.',
        exampleRu: 'На столе три яблока.',
      },
      {
        label: 'UNCOUNTABLE',
        title: 'Считаем количество, а не штуки',
        text: 'water, milk, rice, sugar, money, information.',
        exampleEn: 'There is some milk in the fridge.',
        exampleRu: 'В холодильнике есть немного молока.',
      },
      {
        label: 'BOTH',
        title: 'Some работает с обеими группами',
        text: 'some + plural countable или some + uncountable.',
        exampleEn: 'We need some apples and some water.',
        exampleRu: 'Нам нужны яблоки и немного воды.',
      },
    ],
    memoryTip:
      'Если можно естественно сказать one / two / three — существительное обычно исчисляемое. Если измеряем объём, массу или количество — часто неисчисляемое.',
    practice: {
      prompt: 'Choose the correct option: We need ___ rice and ___ tomatoes.',
      options: ['some / some', 'a / much', 'many / a little'],
      answer: 'some / some',
      feedback: 'Some можно использовать и с неисчисляемым rice, и с исчисляемым plural tomatoes.',
    },
    quantityGuide: {
      intro:
        'Эта тема состоит из двух шагов: сначала определяем тип существительного, потом выбираем слово количества. Именно от countable / uncountable зависит much или many, a few или a little.',
      nounGroups: [
        {
          title: 'Исчисляемые',
          subtitle: 'Countable nouns',
          description:
            'Предметы, людей и вещи, которые можно посчитать отдельными единицами. У них есть форма единственного и множественного числа.',
          rules: [
            'Можно сказать one, two, three: one apple → two apples.',
            'С одной штукой можно использовать a/an: a book, an egg.',
            'Во множественном числе можно использовать many и a few.',
            'Вопрос о количестве: How many ...?',
          ],
          items: [
            { icon: '🍎', word: 'apple → apples', note: 'яблоко → яблоки' },
            { icon: '📚', word: 'book → books', note: 'книга → книги' },
            { icon: '🪑', word: 'chair → chairs', note: 'стул → стулья' },
            { icon: '🥚', word: 'egg → eggs', note: 'яйцо → яйца' },
          ],
        },
        {
          title: 'Неисчисляемые',
          subtitle: 'Uncountable nouns',
          description:
            'То, что обычно не считаем как отдельные штуки: жидкости, вещества, материалы, еду-массу, деньги, время и абстрактные понятия.',
          rules: [
            'Обычно не используем a/an: some water, не a water.',
            'Обычно нет формы множественного числа: information, не informations.',
            'Используем much и a little.',
            'Вопрос о количестве: How much ...?',
          ],
          items: [
            { icon: '💧', word: 'water', note: 'вода' },
            { icon: '🥛', word: 'milk', note: 'молоко' },
            { icon: '🍚', word: 'rice', note: 'рис' },
            { icon: '💰', word: 'money', note: 'деньги' },
            { icon: 'ℹ️', word: 'information', note: 'информация' },
          ],
        },
      ],
      someBridge: {
        title: 'Some = какое-то количество / несколько',
        text: 'Some удобно тем, что оно работает и с исчисляемыми, и с неисчисляемыми. Разница только в форме существительного после него.',
        countable: ['some apples', 'some books', 'some friends'],
        uncountable: ['some water', 'some milk', 'some rice'],
        examples: [
          { en: 'I bought some apples.', ru: 'Я купил несколько яблок.' },
          { en: 'There is some juice in the fridge.', ru: 'В холодильнике есть немного сока.' },
        ],
      },
      sections: [
        {
          title: 'Some / Any',
          subtitle: 'Есть какое-то количество — или спрашиваем, есть ли вообще?',
          rows: [
            {
              word: 'some',
              with: 'countable plural + uncountable',
              meaning: 'обычно в утверждениях; также в предложениях и вежливых просьбах',
              examples: [
                { en: 'I have some friends here.', ru: 'У меня здесь есть несколько друзей.' },
                {
                  en: 'There is some juice in the fridge.',
                  ru: 'В холодильнике есть немного сока.',
                },
                { en: 'Would you like some tea?', ru: 'Хотите чаю?' },
              ],
            },
            {
              word: 'any',
              with: 'countable plural + uncountable',
              meaning: 'обычно в вопросах и отрицаниях',
              examples: [
                { en: 'Do you have any brothers?', ru: 'У тебя есть братья?' },
                { en: 'Is there any milk?', ru: 'Есть молоко?' },
                { en: 'I don’t have any money.', ru: 'У меня нет денег.' },
              ],
            },
          ],
          tip: 'Базовая схема для A2: утверждение → some; вопрос / отрицание → any. Но в предложениях и просьбах часто остаётся some: Would you like some tea?',
        },
        {
          title: 'Much / Many / A lot of',
          subtitle: 'Как сказать «много»?',
          rows: [
            {
              word: 'many',
              with: 'только countable plural',
              meaning: 'много отдельных предметов / людей',
              examples: [
                { en: 'How many students are there?', ru: 'Сколько там учеников?' },
                { en: 'We don’t have many chairs.', ru: 'У нас не так много стульев.' },
              ],
            },
            {
              word: 'much',
              with: 'только uncountable',
              meaning: 'много количества вещества / времени / денег и т. д.',
              examples: [
                { en: 'How much water do you drink?', ru: 'Сколько воды ты пьёшь?' },
                { en: 'I don’t have much time.', ru: 'У меня не так много времени.' },
              ],
            },
            {
              word: 'a lot of',
              with: 'countable plural + uncountable',
              meaning: 'много; очень универсальная разговорная форма',
              examples: [
                { en: 'She has a lot of books.', ru: 'У неё много книг.' },
                { en: 'We have a lot of homework.', ru: 'У нас много домашней работы.' },
              ],
            },
          ],
          tip: 'В обычных утвердительных предложениях a lot of часто звучит естественнее, чем much: I have a lot of time. Much особенно часто встречается в вопросах и отрицаниях.',
        },
        {
          title: 'A few / A little',
          subtitle: 'Как сказать «немного, несколько»?',
          rows: [
            {
              word: 'a few',
              with: 'только countable plural',
              meaning:
                'несколько отдельных предметов / людей; небольшое, но существующее количество',
              examples: [
                { en: 'I have a few questions.', ru: 'У меня есть несколько вопросов.' },
                { en: 'We bought a few apples.', ru: 'Мы купили несколько яблок.' },
              ],
            },
            {
              word: 'a little',
              with: 'только uncountable',
              meaning: 'немного вещества, времени, денег и т. д.',
              examples: [
                { en: 'Add a little sugar.', ru: 'Добавь немного сахара.' },
                { en: 'I have a little time.', ru: 'У меня есть немного времени.' },
              ],
            },
          ],
          tip: 'Быстрая проверка: можно поставить число? → a few. Нельзя посчитать штуками? → a little.',
        },
      ],
      chooser: {
        countable: ['a / an', 'many', 'a few', 'some', 'any', 'a lot of'],
        uncountable: ['much', 'a little', 'some', 'any', 'a lot of'],
      },
    },
  },
  'grammar-articles': {
    displayTitle: 'Артикли: a/an, the и без артикля (Ø)',
    eyebrow: 'A2 · WHICH ONE?',
    hero: 'Главный вопрос: собеседник понимает, о каком предмете идёт речь?',
    rule: 'A/an вводит один неспецифичный исчисляемый предмет. The указывает на конкретный/известный. Ø означает, что артикль вообще не ставим — часто при общем значении plural или uncountable.',
    visual: 'map',
    accent: 'orange',
    searchTerms: ['артикли', 'articles', 'a an the', 'zero article', 'без артикля'],
    cues: [
      {
        label: 'new',
        title: 'a / an',
        text: 'Один предмет, впервые упоминаем.',
        exampleEn: 'I saw a dog.',
        exampleRu: 'Я увидел собаку.',
      },
      {
        label: 'known',
        title: 'the',
        text: 'Уже понятно, какой именно.',
        exampleEn: 'The dog was very friendly.',
        exampleRu: 'Эта собака была очень дружелюбной.',
      },
      {
        label: 'general',
        title: 'Ø — без артикля',
        text: 'Говорим о классе вещей вообще.',
        exampleEn: 'Dogs are friendly animals.',
        exampleRu: 'Собаки — дружелюбные животные.',
      },
    ],
    memoryTip: 'Ø не означает специальное слово. Это просто «ничего не ставим»: I like music.',
    practice: {
      prompt: 'I bought ___ book. ___ book is about space.',
      options: ['a / The', 'the / A', 'Ø / The'],
      answer: 'a / The',
      feedback: 'Сначала новая книга → a; второй раз уже известная → the.',
    },
    accordion: {
      title: 'Когда артикль не ставим (Ø)',
      intro: 'Ø — это не отдельное слово, а отсутствие артикля. Вот самые полезные случаи для A2.',
      headers: ['Ситуация', 'Пример', 'Перевод'],
      rows: [
        ['множественное число в общем смысле', 'Cats are independent.', 'Кошки независимы.'],
        ['неисчисляемое в общем смысле', 'I like music.', 'Мне нравится музыка.'],
        ['языки', 'She speaks English.', 'Она говорит по-английски.'],
        ['школьные предметы', 'We study maths.', 'Мы изучаем математику.'],
        ['приёмы пищи', 'We have breakfast at seven.', 'Мы завтракаем в семь.'],
      ],
    },
  },
  'grammar-comparatives-superlatives': {
    displayTitle: 'Степени сравнения прилагательных',
    eyebrow: 'A2 · BIG → BIGGER → BIGGEST',
    hero: 'Два объекта — comparative. Один лидер в группе — superlative.',
    rule: 'Короткие прилагательные чаще получают -er/-est; длинные — more/most. Есть неправильные формы: good → better → best.',
    visual: 'ladder',
    accent: 'purple',
    searchTerms: ['степени сравнения', 'comparatives superlatives', 'more most er est'],
    cues: [
      {
        label: '2 things',
        title: 'bigger than',
        text: 'Сравниваем два объекта.',
        exampleEn: 'A train is faster than a bus.',
        exampleRu: 'Поезд быстрее автобуса.',
      },
      {
        label: 'group',
        title: 'the biggest',
        text: 'Самый в группе.',
        exampleEn: 'Jupiter is the biggest planet.',
        exampleRu: 'Юпитер — самая большая планета.',
      },
      {
        label: 'equal',
        title: 'as ... as',
        text: 'Одинаковая степень.',
        exampleEn: 'Tom is as tall as Ben.',
        exampleRu: 'Том такой же высокий, как Бен.',
      },
    ],
    memoryTip: 'Не удваивай сравнение: faster, а не more faster.',
    practice: {
      prompt: 'This task is ___ than the last one.',
      options: ['easyer', 'easier', 'more easy'],
      answer: 'easier',
      feedback: 'Consonant + y → y меняется на i: easy → easier.',
    },
  },
  'grammar-relative-clauses': {
    displayTitle: 'Относительные предложения: who / which / that / where / whose',
    eyebrow: 'A2+ · JOIN THE IDEAS',
    hero: 'Соединяем два коротких предложения в одно и уточняем, о ком или о чём говорим.',
    rule: 'Who — люди, which — предметы, where — места, whose — принадлежность. That часто может заменить who/which в defining clauses.',
    visual: 'map',
    accent: 'lemon',
    searchTerms: ['относительные предложения', 'relative clauses', 'who which that where whose'],
    cues: [
      {
        label: 'person',
        title: 'who / that',
        text: 'Для человека.',
        exampleEn: 'The girl who lives next door is my friend.',
        exampleRu: 'Девочка, которая живёт по соседству, моя подруга.',
      },
      {
        label: 'thing',
        title: 'which / that',
        text: 'Для предмета.',
        exampleEn: 'This is the book that I bought.',
        exampleRu: 'Это книга, которую я купил.',
      },
      {
        label: 'place / owner',
        title: 'where / whose',
        text: 'Место или принадлежность.',
        exampleEn: 'I know a boy whose dad is a pilot.',
        exampleRu: 'Я знаю мальчика, чей папа — пилот.',
      },
    ],
    memoryTip: 'who = кто; which = что; where = где; whose = чей.',
    practice: {
      prompt: 'That’s the café ___ we met.',
      options: ['who', 'where', 'whose'],
      answer: 'where',
      feedback: 'Café — место → where.',
    },
  },
};

export function getGrammarPresentation(id: string) {
  return grammarPresentations[id];
}
