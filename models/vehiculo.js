'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehiculoSchema = Schema({
    title : String,
    content : String,
    date: {type: Date, default: Date.now},
    image: String
});

module.exports = mongoose.model('Vehiculo', VehiculoSchema);
//vehiculos --> guarda documentos de esre tipo y con estructura dentro de la coleccion
