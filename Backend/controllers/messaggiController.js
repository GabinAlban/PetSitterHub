// importa la conessione al database
const db = require("../database.js");
// visualizza tutti i messaggi di un utente specifico
exports.getAllMessaggi = function (req, res)  {
    // prende l'id dell'utente dai parametri della richiesta URL
    const utente_id = req.params.utente_id;
    // query SQL per selezionare tutti i messaggi dell'utente specifico 
    const sql = "SELECT * FROM messaggi WHERE utente_id = ?";
    // esegue la query al database
    db.query(sql, [utente_id], function (err, results)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante il recupero dei messaggi" });
        }
        // tutti i messaggi vengono restituiti come risposta JSON al frontend
        res.json(results);
    });
};
// creazione di un nuovo messaggio
exports.createMessaggio = function (req, res)  {
    // prende i dati del messaggio dal corpo della richiesta
    const mittente_id = req.body.utente_id;
    const destinatario_id = req.body.destinatario_id;
    const contenuto = req.body.contenuto;
    //controlla se i campi sono presenti
    if (!mittente_id || !destinatario_id || !contenuto) {
        return res.status(400).json({ error: "Dati mancanti per la creazione del messaggio" });
    }
    // query SQL per inserire un nuovo messaggio nel database
    const sql = 'INSERT INTO messaggi (mittente_id, destinatario_id, contenuto) VALUES (?, ?, ?)';
    // esegue la query al database
    db.query(sql, [mittente_id, destinatario_id, contenuto], function (err, result)  {
        if (err) {
            return res.status(500).json({ error: "Errore durante la creazione del messaggio" });
        }
        // restituisce una risposta di successo al frontend
        res.status(201).json({ message: "Messaggio inviato con successo" });
    });
};