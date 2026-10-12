import type { MultipleChoiceStatus } from '../types';
export function evaluateAnswer(selectedId: string | null, correctId: string): MultipleChoiceStatus { if (!selectedId) return 'idle'; return selectedId === correctId ? 'correct' : 'incorrect'; }
