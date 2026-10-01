const db = require("../database.js");
exports.getAllSitters = function (req, res)  {
    const sql = "SELECT * FROM sitters";
    db.query(sql, function (err, results)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante il recupero dei pet sitter" });
        }
         return res.json(results);

    });
};
exports.getSitterById = function (req, res)  {
    const id = req.params.id;
    const sql = "SELECT * FROM sitters WHERE id = ?";
    db.query(sql, [id], function (err, results)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante il recupero del pet sitter" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Pet sitter non trovato" });
        }
        return res.json(results[0]);
    });
};

exports.getSittersByCitta = (req, res) => {
    const citta = (req.query.citta || '').trim();

    if (!citta) {
        return res.status(400).json({ message: 'Città mancante' });
    }

    const sql = `
        SELECT s.*, u.nome, u.email, u.citta
        FROM sitter s
        JOIN utenti u ON s.utente_id = u.id
        WHERE u.citta LIKE ?
    `;

    db.query(sql, [`%${citta}%`], (err, results) => {
        if (err) {
            console.error('Errore ricerca sitter per città:', err);
            return res.status(500).json({ message: 'Errore nel recupero dei sitter' });
        }
        res.json(results);
    });
};
