import { createClient } from '@supabase/supabase-js';

export function buildCloudClient(endpoint: string, publicToken: string) {
  if (!endpoint || !publicToken) return null;

  return createClient(endpoint, publicToken, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}
