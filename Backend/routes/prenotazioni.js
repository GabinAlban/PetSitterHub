const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/prenotazioniController');
router.get('/', ctrl.getAllPrenotazioni);
router.post('/', ctrl.createPrenotazione);
router.put('/:id', ctrl.updatePrenotazione);
router.delete('/:id', ctrl.deletePrenotazione);
module.exports = router;