const express = require('express');
const router = express.Router();
const  sitterController = require('../controllers/sitterController');
router.get('/', sitterController.getAllSitters);
router.get('/:id', sitterController.getSitterById);
module.exports = router;
