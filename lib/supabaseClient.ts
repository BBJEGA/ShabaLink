
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    // We don't throw an error here to prevent build failures if env vars are missing during build time
    // But we log a warning for development
    if (process.env.NODE_ENV === 'development') {
        console.warn('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY');
    }
}

export const supabase = createClient(
    supabaseUrl || '',
    supabaseKey || ''
);
