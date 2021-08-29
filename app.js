'use strict'
// cargar modulos para crear servidor
var express = require('express');
var bodyParser = require ('body-parser');

// ejecutar expresss (http)
var app = express();

//cargar ficheros rutas
var vehiculo_routes = require('./routes/vehiculo');

//caragr milddlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//añadir prefijos a rutas /cargar rutas
app.use('/api',vehiculo_routes);

module.exports = app;