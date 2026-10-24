import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandArtifact, WallPattern } from '../../../src/shared/ui/BrandArtifacts';

describe('original design artifacts', () => {
  it('renders the uploaded artwork instead of generated placeholder SVGs', () => {
    const { container } = render(<BrandArtifact kind="fire" />);

    const image = container.querySelector('[data-design-artifact="fire"] img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('smile-fire'));
  });

  it('provides a reusable decorative wall pattern layer', () => {
    const { container } = render(<WallPattern />);

    const layer = container.querySelector('[data-design-artifact="wall-pattern"]');

    expect(layer).toBeInTheDocument();
    expect(layer).toHaveAttribute('aria-hidden', 'true');
  });
});
