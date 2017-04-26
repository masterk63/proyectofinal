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

exports.registroValidar = function(req,res){
    Registro.validar(req.params.id,function(consulta){
        res.json(consulta);
    });
}

exports.registroInvalidar = function(req,res){
    Registro.invalidar(req.params.id,function(consulta){
        res.json(consulta);
    });
}