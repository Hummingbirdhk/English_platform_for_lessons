import type { CSSProperties } from 'react';

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
const looks: Record<
  PersonKind,
  {
    skin: string;
    hair: string;
    shirt: string;
    shape: string;
    glasses?: boolean;
    beard?: boolean;
    longHair?: boolean;
    bow?: boolean;
  }
> = {
  grandpa: {
    skin: '#f6bb90',
    hair: '#edf0f1',
    shirt: '#ffbf4d',
    shape: 'man',
    glasses: true,
    beard: true,
  },
  mom: { skin: '#f5b48d', hair: '#783f2c', shirt: '#fff3e4', shape: 'woman', longHair: true },
  dad: { skin: '#efb58e', hair: '#513526', shirt: '#5996ad', shape: 'man' },
  grandma: {
    skin: '#f1b18e',
    hair: '#e4e0d8',
    shirt: '#f398a2',
    shape: 'woman',
    glasses: true,
    longHair: true,
  },
  sister: {
    skin: '#f7b98e',
    hair: '#865136',
    shirt: '#ff9ca8',
    shape: 'child',
    longHair: true,
    bow: true,
  },
  brother: { skin: '#f5b991', hair: '#5a3726', shirt: '#72b6dd', shape: 'child' },
  strong: { skin: '#ecb18a', hair: '#643826', shirt: '#66acd4', shape: 'wide' },
  weak: { skin: '#efb393', hair: '#8b6c59', shirt: '#a7bec8', shape: 'thin' },
  beautiful: { skin: '#f6b58d', hair: '#7c3c2c', shirt: '#f28bab', shape: 'woman', longHair: true },
  big: { skin: '#e5a77e', hair: '#6a3f30', shirt: '#87b775', shape: 'wide', beard: true },
  small: { skin: '#eeba94', hair: '#66422e', shirt: '#ffbf55', shape: 'child' },
  kind: { skin: '#f3b693', hair: '#99533b', shirt: '#e7a1b4', shape: 'woman', longHair: true },
  ugly: { skin: '#b9bd8c', hair: '#65626f', shirt: '#8f82b4', shape: 'thin', longHair: true },
  young: { skin: '#f5b48c', hair: '#7d4a2d', shirt: '#67a8d0', shape: 'child' },
  old: {
    skin: '#edb68f',
    hair: '#e7e7e6',
    shirt: '#d9ab73',
    shape: 'man',
    glasses: true,
    beard: true,
  },
};

export function FamilyPortrait({ kind, className = '' }: { kind: PersonKind; className?: string }) {
  const p = looks[kind];
  const isChild = p.shape === 'child';
  const wide = p.shape === 'wide';
  const thin = p.shape === 'thin';
  const style = { '--family-shirt': p.shirt } as CSSProperties;
  return (
    <svg className={className} viewBox="0 0 160 180" role="img" aria-label={kind} style={style}>
      <defs>
        <linearGradient id={`shirt-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={p.shirt} />
          <stop offset="1" stopColor={p.shirt} stopOpacity=".78" />
        </linearGradient>
      </defs>
      <ellipse cx="80" cy="172" rx="63" ry="7" fill="#4e6f7c" opacity=".10" />
      <path
        d={
          wide
            ? 'M8 181 Q8 110 49 112 L111 112 Q152 110 152 181Z'
            : thin
              ? 'M42 181 Q44 121 65 116 L95 116 Q116 121 118 181Z'
              : isChild
                ? 'M26 181 Q27 123 59 116 L101 116 Q133 123 134 181Z'
                : 'M19 181 Q20 120 59 113 L101 113 Q140 120 141 181Z'
        }
        fill={`url(#shirt-${kind})`}
      />
      <path d="M64 104 L64 123 Q80 138 96 123 L96 104" fill={p.skin} />
      {p.longHair && (
        <path
          d="M37 81 Q31 19 81 17 Q132 20 123 91 L132 130 Q101 148 80 128 Q53 146 30 129Z"
          fill={p.hair}
        />
      )}
      <ellipse cx="80" cy="68" rx={isChild ? 37 : 40} ry="48" fill={p.skin} />
      <ellipse cx="41" cy="74" rx="8" ry="12" fill={p.skin} />
      <ellipse cx="119" cy="74" rx="8" ry="12" fill={p.skin} />
      <path
        d={
          p.longHair
            ? 'M40 65 Q25 13 76 16 Q122 12 121 65 Q108 44 98 34 Q67 62 40 65Z'
            : 'M41 55 Q31 14 81 17 Q130 16 119 58 Q103 47 91 33 Q70 52 41 55Z'
        }
        fill={p.hair}
      />
      <ellipse cx="65" cy="73" rx="4.5" ry="6" fill="#292830" />
      <ellipse cx="96" cy="73" rx="4.5" ry="6" fill="#292830" />
      <circle cx="66" cy="71" r="1.6" fill="white" />
      <circle cx="97" cy="71" r="1.6" fill="white" />
      <path
        d="M80 77 l-3 11 q3 4 7 0"
        fill="none"
        stroke="#bb795e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M67 97 Q80 107 93 97"
        fill="none"
        stroke="#9c5e58"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="48" cy="87" rx="8" ry="5" fill="#ef8f7a" opacity=".35" />
      <ellipse cx="112" cy="87" rx="8" ry="5" fill="#ef8f7a" opacity=".35" />
      {p.beard && (
        <path
          d="M50 91 Q51 122 80 123 Q108 121 110 91 L97 106 Q79 115 64 105Z"
          fill={p.hair}
          opacity=".9"
        />
      )}
      {p.glasses && (
        <g fill="none" stroke="#6b7181" strokeWidth="3">
          <circle cx="65" cy="75" r="15" />
          <circle cx="96" cy="75" r="15" />
          <path d="M80 74 h2 M50 70 l-10 -4 M111 70 l10 -4" />
        </g>
      )}
      {p.bow && <path d="M39 47 Q12 29 24 60 L40 53 Q59 73 65 47 L44 48Z" fill="#ffd56a" />}
    </svg>
  );
}
