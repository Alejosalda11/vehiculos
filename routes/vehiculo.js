'use strict'
var express = require('express');
var VehiculoController = require('../controllers/vehiculo');

var router = express.Router();

router.post('/vehiculo/save', VehiculoController.save);
router.get('/vehiculos/:last?', VehiculoController.getCars);
router.delete('/vehiculo/:id', VehiculoController.delete);
router.put('/vehiculo/delete/:id', VehiculoController.update);

module.exports = router;
