
const mysql = require('mysql2');

const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    process.exit(1);
  }
  console.log('Connesso al database MySQL');
});

module.exports = connection;
