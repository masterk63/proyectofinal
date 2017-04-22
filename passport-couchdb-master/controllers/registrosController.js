var Registro = require('./../models/registro');
var async = require('async'),
    crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.registrosListar = function(req,res){
    Registro.listar(function(consulta){
        res.json(consulta);
    });
}

exports.registroDame = function(req,res){
    Registro.dame(req.params.id,function(consulta){
        res.json(consulta);
    });
}

exports.registrosListarMarkers = function(req,res){
    Registro.listarMarkets(function(err,consulta){
        if (err)  return res.send(err); 
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