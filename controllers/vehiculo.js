'use strict'
var validator = require('validator');
var Vehiculo = require('../models/vehiculo');

var controller = {
    save: (req, res) => {
        // Recoger los parametros por post
        var params = req.body;
        // Validar datos (validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            })
        }
        if(validate_title && validate_content){  
            //crear el objeto a guardar
            var vehiculo = new Vehiculo();
            //asignar valores
            vehiculo.title = params.title;
            vehiculo.content = params.content;
            vehiculo.image = null;
            //guardar el articulo
            vehiculo.save((err,vehiculoStored) => {
                if(err || !vehiculoStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }
                //devolver una respuesta
                return res.status(200).send({
                    status: 'succes',
                    vehiculo
                });
            })

        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }       
    },
    
    getCars: (req, res) => {
        var query = Vehiculo.find({});
        var last = req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }

        query.find({}, function(err, cars) {
            console.log(err, cars);
            return res.send(cars);  
        });  
    },

    delete: (req, res) => {
        //recoger el id de la URL
        var vehiculoId = req.params.id;
        //find and delete
        Vehiculo.findOneAndDelete({_id: vehiculoId}, (err, vehiculoRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'error al borrar'
                });
            }

            if(!vehiculoRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'no se ha borrado el articulo, puede que no exista'
                });
            }
            return res.status(200).send({
                status: 'succes',
                vehiculo: vehiculoRemoved
            })
        });
        
    },
    
    update: (req, res) => {
        //recoger el id del articulo
        var vehiculoId = req.params.id;
        //recoger datos que llegan por put
        var params = req.body;
        //validar datos
        try{

            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
                
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar'
            });
        }

        if(validate_title && validate_content){
            //find and update  
            Vehiculo.findOneAndUpdate({_id: vehiculoId}, params, {new:true},(err, vehiculoUpdate) => {

                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar'
                    });  
               
                }if(!vehiculoUpdate){
                    return res.status(404).send({
                        status: 'error',
                        message: 'no existe el articulo'
                    });
                }

                return res.status(200).send({
                    status: 'succes',
                    vehiculo: vehiculoUpdate
                });
            });

        }else{

            return res.status(200).send({
                status: 'error',
                message: 'la validacion no es correcta'
            });
        } 
    }
}; // end controller

module.exports = controller;