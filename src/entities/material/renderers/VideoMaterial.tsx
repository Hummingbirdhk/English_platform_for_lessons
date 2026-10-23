import { Card, List, Space, Tag, Typography } from 'antd';
import type { Material } from '../../../content/types';

type VideoMaterialData = Extract<Material, { type: 'video' }>;

export function VideoMaterial({ material }: { material: VideoMaterialData }) {
  return (
    <article className="material-detail">
      <Typography.Title level={1}>{material.title}</Typography.Title>
      <Typography.Paragraph type="secondary">{material.summary}</Typography.Paragraph>

      <div className="video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${material.videoId}`}
          title={material.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {material.preWatch.length > 0 ? (
        <Card title="Before watching" className="material-block">
          <List dataSource={material.preWatch} renderItem={(item) => <List.Item>{item}</List.Item>} />
        </Card>
      ) : null}

      {material.vocabulary.length > 0 ? (
        <Card title="Useful vocabulary" className="material-block">
          <Space wrap>
            {material.vocabulary.map((item) => (
              <Tag key={item.term}>
                {item.term} — {item.translation}
              </Tag>
            ))}
          </Space>
        </Card>
      ) : null}

      {material.postWatch.length > 0 ? (
        <Card title="After watching" className="material-block">
          <List dataSource={material.postWatch} renderItem={(item) => <List.Item>{item}</List.Item>} />
        </Card>
      ) : null}
    </article>
  );
}
