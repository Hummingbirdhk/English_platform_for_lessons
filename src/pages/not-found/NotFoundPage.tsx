import { Result } from 'antd';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <main className="page-shell"><Result status="404" title="Page not found" subTitle="This page does not exist." extra={<Link to="/">Back to lessons</Link>} /></main>;
}
