/**
 * App parameters — simplified after Base44 removal.
 * Supabase config is now handled via environment variables
 * directly in the Supabase client (src/api/base44Client.js).
 */

export const appParams = {
  appName: 'LetzComply',
  appBaseUrl: import.meta.env.VITE_APP_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
};
