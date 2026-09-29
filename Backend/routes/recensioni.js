const express = require('express');
const router = express.Router();
const recensioniController = require('../controllers/recensioniController');
// route per ottenere tutte le recensioni di un sitter specifico
router.get('/:sitter_id', recensioniController.getAllRecensioni);
// route per creare una nuova recensione
router.post('/', recensioniController.createRecensione);
// esporta il router per essere utilizzato in altri file soprattutto in server.js
module.exports = router;
