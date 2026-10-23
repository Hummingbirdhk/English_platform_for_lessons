import { Result } from 'antd';
import { useParams } from 'react-router-dom';
import { findMaterialById } from '../../content/loadContent';
import { MaterialRenderer } from '../../entities/material/MaterialRenderer';

export function MaterialPage() {
  const { materialId } = useParams();
  const material = materialId ? findMaterialById(materialId) : undefined;

  if (!material) {
    return (
      <main className="page-shell">
        <Result
          status="404"
          title="Material not found"
          subTitle="This material is not available."
        />
      </main>
    );
  }

  return (
    <main className="page-shell">
      <MaterialRenderer material={material} />
    </main>
  );
}
