const db = require("../database.js");
// visualizza tutte le recensioni di un sitter specifico
exports.getAllRecensioni = function (req, res)  { 
    // ottieni l'id del sitter dai parametri della richiesta  
    const sitter_id = req.params.sitter_id;
    // query SQL per selezionare tutte le recensioni associate al sitter specifico
    const sql =
    'SELECT *FROM recensioni r JOIN prenotazioni p ON r.prenotazione_id = p.id WHERE p.sitter_id = ?'; 
    db.query(sql, [sitter_id], function (err, results)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante il recupero delle recensioni" });
        }
        res.json(results);
    });
};
// creazione di una nuova recensione
exports.createRecensione = function (req, res)  {
    //prende i dati della recensione dal corpo della richiesta
    const prenotazione_id = req.body.prenotazione_id;
    const voto = req.body.voto;
    const commento = req.body.commento;
    //controlla se i campi sono presenti
    if (!prenotazione_id){
        return res.status(400).json({ error: "prenotazione mancante per la creazione della recensione" });

    } 
    if( !voto) {
        return res.status(400).json({ error: "voto mancante per la creazione della recensione" });
    }
    if (!commento) {
        return res.status(400).json({ error: "commento mancante per la creazione della recensione" });
    }   
    // controlla il range dello score
    if (voto < 1 || voto> 5) {
        return res.status(400).json({ error: "Lo voto deve essere compreso tra 1 e 5" });
    }   
    const sql = 'INSERT INTO recensioni (prenotazione_id, voto, commento) VALUES (?, ?, ?)';
    db.query(sql, [prenotazione_id, voto, commento], function (err, result)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante la creazione della recensione" });
        }
        res.status(201).json({ message: "Recensione creata con successo", id: result.insertId });
    });
};