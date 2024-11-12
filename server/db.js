// db.js
const mysql = require('mysql2');

// Create a connection pool (you can replace these with your actual database credentials)
const pool = mysql.createPool({
  host: 'localhost',         // or your MySQL server host
  user: 'root',              // your MySQL username
  password: '',              // your MySQL password
  database: 'mealkit',       // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool to be used in other files
module.exports = pool;
