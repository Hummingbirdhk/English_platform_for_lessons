import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandArtifact } from '../../../src/shared/ui/BrandArtifacts';

describe('original design artifacts', () => {
  it('renders the uploaded artwork when an artifact is explicitly requested', () => {
    const { container } = render(<BrandArtifact kind="fire" />);

    const image = container.querySelector('[data-design-artifact="fire"] img');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('smile-fire'));
  });
});
