import { Alert, Card, List, Space, Typography } from 'antd';
import type { Material } from '../../../content/types';

type GrammarMaterialData = Extract<Material, { type: 'grammar' }>;

export function GrammarMaterial({ material }: { material: GrammarMaterialData }) {
  return (
    <article className="material-detail">
      <Typography.Title level={1}>{material.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{material.summary}</Typography.Paragraph>

      <Card title="Что это? / What is it?" className="material-block">
        <Typography.Paragraph>{material.explanation.ru}</Typography.Paragraph>
        <Typography.Paragraph>{material.explanation.en}</Typography.Paragraph>
      </Card>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {material.forms.map((form) => (
          <Card key={form.label} title={form.label} className="material-block">
            <Typography.Text code>{form.pattern}</Typography.Text>
            <List
              size="small"
              dataSource={form.examples}
              renderItem={(example) => (
                <List.Item>
                  <div>
                    <strong>{example.en}</strong>
                    <div className="secondary-copy">{example.ru}</div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        ))}
      </Space>

      {material.commonMistakes.length > 0 ? (
        <Card title="Common mistakes" className="material-block">
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {material.commonMistakes.map((mistake) => (
              <Alert
                key={mistake.wrong}
                type="warning"
                showIcon
                message={
                  <span>
                    <s>{mistake.wrong}</s> → <strong>{mistake.right}</strong>
                  </span>
                }
                description={mistake.note}
              />
            ))}
          </Space>
        </Card>
      ) : null}
    </article>
  );
}
