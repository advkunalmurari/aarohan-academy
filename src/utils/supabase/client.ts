import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://pxfzaddqpenmsptcrzfn.supabase.co';
const supabaseKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
  'sb_publishable_5bbLuP2TOKZmve7AST3hpw_LFV28uzN';

export const createClient = () => createSupabaseClient(supabaseUrl, supabaseKey);

export const supabase = createClient();

export default supabase;
