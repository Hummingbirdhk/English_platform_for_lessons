import { describe, expect, it } from 'vitest';
import { evaluateAnswer } from '../../../src/features/multiple-choice/lib/evaluateAnswer';

describe('evaluateAnswer', () => {
  it('returns correct for the correct option', () =>
    expect(evaluateAnswer('b', 'b')).toBe('correct'));
  it('returns incorrect for a wrong option', () =>
    expect(evaluateAnswer('a', 'b')).toBe('incorrect'));
  it('returns idle when nothing is selected', () => expect(evaluateAnswer(null, 'b')).toBe('idle'));
});
