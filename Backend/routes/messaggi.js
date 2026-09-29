// importa la libreria express
const express = require('express');
// crea un router
const router = express.Router();  
//importa il controller dei messaggi  
const messaggiController = require('../controllers/messaggiController');
// route per ottenere tutti i messaggi di un utente specifico
router.get('/:utente_id', messaggiController.getAllMessaggi);
router.post('/', messaggiController.createMessaggio);
// esporta il router per essere utilizzato in altri file soprattutto in server.js
module.exports = router;