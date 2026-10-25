import { Card, Col, Row, Space, Tag, Typography } from 'antd';
import type { Material } from '../../../content/types';

type VocabularyMaterialData = Extract<Material, { type: 'vocabulary' }>;

const groupLabels: Record<string, string> = {
  noun: 'Существительные',
  verb: 'Глаголы',
  adjective: 'Прилагательные',
  adverb: 'Наречия',
  phrase: 'Полезные фразы',
  phrasal_verb: 'Фразовые глаголы',
  idiom: 'Идиомы и устойчивые выражения',
  other: 'Другие слова',
};

export function VocabularyMaterial({ material }: { material: VocabularyMaterialData }) {
  const groups = Object.entries(
    material.items.reduce<Record<string, typeof material.items>>((acc, item) => {
      const key = item.partOfSpeech ?? 'other';
      (acc[key] ??= []).push(item);
      return acc;
    }, {}),
  );
  return (
    <article className="material-detail">
      <Typography.Title level={1}>{material.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{material.summary}</Typography.Paragraph>
      {groups.map(([group, items]) => (
        <section key={group}>
          <Typography.Title level={2}>{groupLabels[group]}</Typography.Title>
          <Row gutter={[16, 16]}>
            {(items ?? []).map((item) => (
              <Col xs={24} md={12} key={item.term}>
                <Card className="vocabulary-card">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="vocabulary-card__image" />
              ) : null}
                  <Typography.Title level={3}>{item.term}</Typography.Title>
              {item.pronunciation ? (
                    <Typography.Text type="secondary">{item.pronunciation}</Typography.Text>
              ) : null}
              <Typography.Paragraph strong>{item.translation}</Typography.Paragraph>
                  <div className="example-pair">
                    <div>{item.example.en}</div>
                <div className="secondary-copy">{item.example.ru}</div>
                  </div>
                  {item.collocations?.length ? (
                    <Space wrap>
                  {item.collocations.map((collocation) => (
                    <Tag key={collocation}>{collocation}</Tag>
                  ))}
                    </Space>
              ) : null}
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      ))}
    </article>
  );
}
