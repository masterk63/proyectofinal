var Registro = require('./../models/registro');
var async = require('async'),
  crypto = require('crypto');
const nodemailer = require('nodemailer');
var i2b = require("imageurl-base64");


exports.registrosListar = function (req, res) {
  Registro.listar(function (consulta) {
    res.json(consulta);
  });
}

exports.registrosListarUsuario = function (req, res) {
  Registro.listarUsuario(req.params.id,function (consulta) {
    res.json(consulta);
  });
}

exports.registroDame = function (req, res) {
  Registro.dame(req.params.id, function (consulta) {
    res.json(consulta);
  });
}

exports.registrosListarMarkers = function (req, res) {
  Registro.listarMarkets(function (err, consulta) {
    if (err) return res.send(err);
    res.json(consulta);
  });
}

exports.registroValidar = function (req, res) {
  Registro.validar(req.params.id, function (consulta) {
    res.json(consulta);
  });
}

exports.registroInvalidar = function (req, res) {
  Registro.invalidar(req.params.id, function (consulta) {
    res.json(consulta);
  });
}

exports.registroNuevo = function (req, res, next) {
  let registro = req.body.registro;
  obtenerFotoMapa(req.body.registro).then((foto) => {
    registro.fotoMapa = foto;
    Registro.nuevo(registro, function (consulta) {
      res.json(consulta);
    });
  })
}

function obtenerFotoMapa(registro) {
  return new Promise((resolve, reject) => {
    let position = registro.latitud + ',' + registro.longitud;
    let mapaURL = 'https://maps.googleapis.com/maps/api/staticmap?center=' + position + '&zoom=16&size=640x400&markers=color:red%7Clabel:%7C' + position + '&key=AIzaSyCmp-2Bj3yexAf_L5HN6G7TOzgIh_mKe7I';
    i2b(mapaURL, function (err, data) {
      if(err){
        reject(err)
      }else{
        resolve(data.base64);
      }
    });
  });
}