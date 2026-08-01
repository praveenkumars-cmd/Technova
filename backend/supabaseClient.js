import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://rioytxwislzqbasjfws.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseKey) {
  console.warn('[Supabase Client] Warning: SUPABASE_KEY is not defined in backend/.env. Requests will fall back to local database.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
