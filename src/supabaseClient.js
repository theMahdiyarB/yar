import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Creates a Supabase client for browser-side usage.
 * This is safe to use in your React components.
 */
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
