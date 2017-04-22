var Registro = require('./../models/registro');
var async = require('async'),
    crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.registrosListar = function(req,res){
    Registro.listar(function(consulta){
        res.json(consulta);
    });
}


// exports.dameUsuario = function(req,res){
//     User.dame(req.params.id,function(consulta){
//         res.json(consulta);
//     });
// }

// exports.usuarioBaja = function(req,res){
//     User.baja(req.params.id,function(consulta){
//         res.json(consulta);
//     });
// }