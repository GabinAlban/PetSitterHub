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