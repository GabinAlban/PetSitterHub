const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    setTimeout(() => connection.connect(), 5000);
    return;
  }
  console.log('Connesso al database MySQL');
});

module.exports = connection;
