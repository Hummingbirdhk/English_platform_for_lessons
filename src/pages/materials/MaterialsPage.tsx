import { Col, Empty, Input, Row, Segmented, Select, Space } from 'antd';
import { useMemo, useState } from 'react';
import { loadAllContent } from '../../content/loadContent';
import type { Material } from '../../content/types';
import { MaterialCard } from '../../entities/material/MaterialCard';
import { PageHeading } from '../../shared/ui/PageHeading';

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
      const haystack = [material.title, material.topic, ...material.tags].join(' ').toLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || haystack.includes(normalizedQuery);

      return matchesType && matchesLevel && matchesTopic && matchesQuery;
    });
  }, [level, materials, query, topic, type]);

  return (
    <main className="page-shell">
      <PageHeading
        title="Материалы"
        description="Грамматика, лексика, тексты и видео, которые можно использовать в разных уроках."
      />

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div className="library-controls">
          <Input
            type="search"
            aria-label="Search materials"
            placeholder="Поиск по теме, названию или тегу"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            allowClear
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
        </div>

        <Segmented
          block
          options={typeOptions}
          value={type}
          onChange={(value) => setType(String(value))}
        />

        {visibleMaterials.length > 0 ? (
          <Row gutter={[16, 16]}>
            {visibleMaterials.map((material: Material) => (
              <Col xs={24} md={12} lg={8} key={material.id}>
                <MaterialCard material={material} />
              </Col>
            ))}
          </Row>
        ) : (
          <Empty description="Материалы не найдены" />
        )}
      </Space>
    </main>
  );
}
