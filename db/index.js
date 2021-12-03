// const { Pool } = require('pg')

// const pool = new Pool({
//     user: 'phamerling',
//     host: 'localhost',
//     database: 'necromancy',
//     password: 'pass1234',
//     port: 5432,
//   })


// module.exports = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback)
//   },
// }

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
});

client.connect();

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback);
  },
  end: () => {
    return client.end();
  }
}