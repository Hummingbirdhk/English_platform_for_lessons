import { Empty, Input, Segmented, Select } from 'antd';
import { useMemo, useState } from 'react';
import { getGrammarPresentation } from '../../content/grammar/grammarPresentations';
import { loadAllContent } from '../../content/loadContent';
import { MaterialCard } from '../../entities/material/MaterialCard';
import { BrandArtifact } from '../../shared/ui/BrandArtifacts';

const typeOptions = [
  { label: 'Все', value: 'all' },
  { label: 'Grammar', value: 'grammar' },
  { label: 'Vocabulary', value: 'vocabulary' },
  { label: 'Reading', value: 'reading' },
  { label: 'Video', value: 'video' },
];

export function MaterialsPage() {
  const { materials } = loadAllContent();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<string>('all');
  const [level, setLevel] = useState<string>('all');
  const [topic, setTopic] = useState<string>('all');

  const topicOptions = useMemo(
    () => [
      { label: 'Все темы', value: 'all' },
      ...Array.from(new Set(materials.map((material) => material.topic)))
        .sort((a, b) => a.localeCompare(b))
        .map((value) => ({ label: value, value })),
    ],
    [materials],
  );

  const visibleMaterials = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return materials.filter((material) => {
      const matchesType = type === 'all' || material.type === type;
      const matchesLevel = level === 'all' || material.level === level;
      const matchesTopic = topic === 'all' || material.topic === topic;
      const grammarPresentation =
        material.type === 'grammar' ? getGrammarPresentation(material.id) : undefined;
      const haystack = [
        material.title,
        material.topic,
        ...material.tags,
        ...(grammarPresentation?.searchTerms ?? []),
        grammarPresentation?.displayTitle ?? '',
      ]
        .join(' ')
        .toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery);

      return matchesType && matchesLevel && matchesTopic && matchesQuery;
    });
  }, [level, materials, query, topic, type]);

  return (
    <main className="page-shell materials-page">
      <section className="page-hero page-hero--orange">
        <div>
          <span className="sticker sticker--lemon">МАТЕРИАЛЫ</span>
          <h1>Библиотека для уроков</h1>
          <p>Ищи по теме, уровню или типу — один материал можно использовать в разных уроках.</p>
        </div>
        <BrandArtifact kind="spark" className="page-hero__spark" />
        <BrandArtifact kind="heart" className="page-hero__smile" />
      </section>

      <section className="materials-toolbar" aria-label="Фильтры материалов">
        <Input
          type="search"
          aria-label="Search materials"
          placeholder="Поиск по теме, названию или тегу"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          allowClear
          className="materials-search"
        />

        <Select
          aria-label="Filter by level"
          value={level}
          onChange={setLevel}
          options={[
            { label: 'Все уровни', value: 'all' },
            { label: 'A1', value: 'A1' },
            { label: 'A2', value: 'A2' },
            { label: 'B1', value: 'B1' },
          ]}
        />

        <Select
          aria-label="Filter by topic"
          value={topic}
          onChange={setTopic}
          options={topicOptions}
        />
      </section>

      <Segmented
        className="material-type-tabs"
        options={typeOptions}
        value={type}
        onChange={(value) => setType(String(value))}
      />

      {visibleMaterials.length > 0 ? (
        <section className="material-grid" aria-label="Материалы">
          {visibleMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </section>
      ) : (
        <Empty description="Материалы не найдены" className="empty-state" />
      )}
    </main>
  );
}
