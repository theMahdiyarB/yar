import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = 'https://lebeltkaxxbpqubobqmz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYmVsdGtheHhicHF1Ym9icW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTkzMTksImV4cCI6MjA2Nzk5NTMxOX0.n25fjWAr7Npi5RdkfHfW_uQK5xU2kgqZj30ets5VjA8';

/**
 * Creates a Supabase client for browser-side usage.
 * This is safe to use in your React components.
 */
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
