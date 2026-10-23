import { Card, Col, Row, Space, Tag, Typography } from 'antd';
import type { Material } from '../../../content/types';

type VocabularyMaterialData = Extract<Material, { type: 'vocabulary' }>;

export function VocabularyMaterial({ material }: { material: VocabularyMaterialData }) {
  return (
    <article className="material-detail">
      <Typography.Title level={1}>{material.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{material.summary}</Typography.Paragraph>
      <Row gutter={[16, 16]}>
        {material.items.map((item) => (
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
    </article>
  );
}
