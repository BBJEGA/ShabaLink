const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAlive() {
  console.log('Pinging Supabase to keep it alive...');

  try {
    // Try to fetch one row from 'users'. If it doesn't exist, it might fail, 
    // but the connection attempt itself is often enough.
    // Alternatively, just checking connection or a lightweight query.
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);

    if (error) {
      console.log('Supabase ping attempt finished with potential error (expected if table is empty/missing):', error.message);
    } else {
      console.log('Supabase ping successful. Data received:', data);
    }
  } catch (err) {
    console.error('Unexpected error during ping:', err);
    process.exit(1);
  }
}

keepAlive();
