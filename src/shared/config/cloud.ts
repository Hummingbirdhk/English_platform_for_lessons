import { buildCloudClient } from '../lib/cloudClient';

const endpoint = import.meta.env.VITE_CLOUD_ENDPOINT ?? '';
const publicToken = import.meta.env.VITE_CLOUD_PUBLIC_TOKEN ?? '';

export const cloudClient = buildCloudClient(endpoint, publicToken);
export const isCloudConfigured = cloudClient.configured;
