// const mysql = require("mysql2/promise");
// const dotenv = require("dotenv");
// dotenv.config();

// async function makeConnection() {
//   return await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//   });
// }

// module.exports = makeConnection;

const mysql = require("mysql2");
require("dotenv").config();

// console.log(
//   process.env.DB_HOST,
//   process.env.DB_USER,
//   process.env.DB_NAME,
//   process.env.DB_PORT
// );
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = db;
