export const FEATURE_KEYS = ['multiple-choice'] as const;
export type FeatureKey = (typeof FEATURE_KEYS)[number];
export const registeredFeatureKeys = new Set<string>(FEATURE_KEYS);
