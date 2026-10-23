import { Card, List, Space, Tag, Typography } from 'antd';
import type { Material } from '../../../content/types';

type ReadingMaterialData = Extract<Material, { type: 'reading' }>;

export function ReadingMaterial({ material }: { material: ReadingMaterialData }) {
  return (
    <article className="material-detail">
      <Typography.Title level={1}>{material.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{material.summary}</Typography.Paragraph>

      {material.preReadingVocabulary.length > 0 ? (
        <Card title="Before you read" className="material-block">
          <Space wrap>
            {material.preReadingVocabulary.map((item) => (
              <Tag key={item.term}>
                {item.term} — {item.translation}
              </Tag>
            ))}
          </Space>
        </Card>
      ) : null}

      <Card title="Text" className="material-block reading-text">
        {material.body.map((paragraph) => (
          <Typography.Paragraph key={paragraph}>{paragraph}</Typography.Paragraph>
        ))}
      </Card>

      <Card title="Check understanding" className="material-block">
        <List
          dataSource={material.questions}
          renderItem={(question, index) => (
            <List.Item>
              <strong>{index + 1}.</strong>&nbsp;{question}
            </List.Item>
          )}
        />
      </Card>
    </article>
  );
}
