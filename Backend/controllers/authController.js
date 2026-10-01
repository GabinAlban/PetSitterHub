const db = require('../database');
const bcrypt = require('bcrypt');

// REGISTRAZIONE 
exports.register = function(req, res){

    const nome = req.body.nome;
    const email = req.body.email;
    const passaword = req.body.password;
    const ruolo = req.body.ruolo;
    const citta = req.body.citta;
    if (!nome || !email || !passaword || !ruolo || !citta) {
        return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
    }

const passawordCifrata = bcrypt.hashSync(passaword, 10);
const sqlInsert = 'INSERT INTO utenti (nome, email, password, ruolo, citta) VALUES (?, ?, ?, ?, ?)';
db.query(sqlInsert, [nome, email, passawordCifrata, ruolo, citta], function(err, result) {
    if (err) {
        return res.status(500).json({ message: 'Errore durante la registrazione' });
    }
    return res.status(201).json({ message: 'Utente registrato con successo' });
    id: result.insertId
});
}


// LOGIN
exports.login = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const sqlSelect = 'SELECT * FROM Utenti WHERE E-mail = ?';
    db.query(sqlSelect, [email], function(err, results) {
        if (err) {
            return res.status(500).json({ message: 'Errore durante il login' });
        }
    if (results.length===0) {
        return res.status(401).json({ message: 'Utente non trovato' });
    }
    const utente = results[0];
    const passwordValida = bcrypt.compareSync(password, utente.password);
if (!passwordValida) {
    return res.status(401).json({ message: 'Password errata' });
}
res.json({
     message: 'Login effettuato con successo',
      utente: utente.nome 
    });
});
};

