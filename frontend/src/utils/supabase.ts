import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rioytxwislzqbasjfws.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_XNZDGKt3sYbe9HZwm_45mw_-77JUSHa';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
