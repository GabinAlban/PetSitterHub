// importa la conessione al database
const db = require("../database.js");
// visualizza tutte le prenotazioni
exports.getAllPrenotazioni = function (req, res)  {
    const sql = 'SELECT * FROM prenotazioni';
    db.query(sql, function (err, results)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante il recupero delle prenotazioni" });
        }
        return res.json(results);
    });
};
// creazione di una nuova prenotazione
exports.createPrenotazione = function (req, res)  {
    const proprietario_id = req.body.proprietario_id;
    const sitter_id = req.body.sitter_id;
    const servizio = req.body.servizio_id;
    const data_inizio = req.body.data_inizio;
    const data_fine = req.body.data_fine;
    const prezzo_totale = req.body.prezzo_totale;
    const sql = 'INSERT INTO prenotazioni (proprietario_id, sitter_id, servizio_id, data_inizio, data_fine, prezzo_totale, stato) VALUES (?, ?, ?, ?, ?, ?, "In_attesa")';
    db.query(sql, [proprietario_id, sitter_id, servizio, data_inizio, data_fine, prezzo_totale], function (err, result)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante la creazione della prenotazione" });
        }
        return res.json({ message: "Prenotazione creata con successo" });
    });
};
// aggiornamento dello stato di una prenotazione
exports.updatePrenotazione = function (req, res)  {
    const id = req.params.id;
    const stato = req.body.stato;
    const sql = 'UPDATE prenotazioni SET stato = ? WHERE id = ?';
    db.query(sql, [stato, id], function (err, result)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante l'aggiornamento della prenotazione" });
        }
        return res.json({ message: "Prenotazione aggiornata con successo" });
    });
};
// cancellazione di una prenotazione
exports.deletePrenotazione = function (req, res)  {
    const id = req.params.id;
    const sql = 'DELETE FROM prenotazioni WHERE id = ?';
    db.query(sql, [id], function (err, result)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante la cancellazione della prenotazione" });
        }
        return res.json({ message: "Prenotazione cancellata con successo" });
    });
};