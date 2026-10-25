import { buildCloudClient } from '../lib/cloudClient';

const runningTests = import.meta.env.MODE === 'test';
const endpoint = runningTests ? '' : (import.meta.env.VITE_CLOUD_ENDPOINT ?? '');
const publicToken = runningTests ? '' : (import.meta.env.VITE_CLOUD_PUBLIC_TOKEN ?? '');

export const cloudClient = buildCloudClient(endpoint, publicToken);
export const isCloudConfigured = cloudClient.configured;
