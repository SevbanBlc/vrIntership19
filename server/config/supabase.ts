import { createClient } from '@supabase/supabase-js';
import { config } from './environment';

export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseKey
);

export async function connectToSupabase() {
  try {
    const { data, error } = await supabase.from('users').select('count');
    if (error) {
      console.error('Failed to connect to Supabase:', error.message);
      return false;
    }
    console.log('Successfully connected to Supabase');
    return true;
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
    return false;
  }
}