const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
const c = new Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
c.connect().then(async () => {
  await c.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
  console.log('SCHEMA RESET COMPLETE');
  await c.end();
}).catch(e => console.log('ERROR:', e.message));
