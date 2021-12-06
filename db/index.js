const { Pool } = require('pg');
require("dotenv").config();

// const devConfig = {
//   user: process.env.PG_USER,
//   password: process.env.PG_PASS,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   port: process.env.PG_PORT
// }

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const proConfig = process.env.DATABASE_URL //heroku addons

const pool = new Pool({
  connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig,
  ssl: {
    rejectUnauthorized: false
  },
});


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}

// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   },
// });

// client.connect(err => {
//   if (err) {
//     console.error('connection error', err.stack)
//   }
// });

// module.exports = {
//   query: (text, params, callback) => {
//     return client.query(text, params, callback);
//   },
//   end: () => {
//     return client.end();
//   }
// }