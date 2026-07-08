const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
const c = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
c.connect().then(async () => {
  const r = await c.query("SELECT table_name, data_type FROM information_schema.columns WHERE column_name = 'id' AND table_schema = 'public'");
  console.table(r.rows);
  await c.end();
}).catch(e => console.log('ERROR:', e.message));
