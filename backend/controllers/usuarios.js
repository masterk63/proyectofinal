var User = require('./../models/user');
var async = require('async'),
  crypto = require('crypto');
const nodemailer = require('nodemailer');
var configServer = require('./../server.js');

var mysql = require('mysql');
var env = process.env.NODE_ENV || 'database',
  databaseConfig = require('./../config/' + env + '.js');

var connection = mysql.createConnection({
  host: databaseConfig.host,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.database,
});

exports.dameUsuario = function (req, res) {
  User.dame(req.params.id, function (consulta) {
    res.json(consulta);
  });
}

exports.usuarioBaja = function (req, res) {
  User.baja(req.params.id, function (consulta) {
    res.json(consulta);
  });
}

exports.listarUsuarios = function (req, res) {
  User.listar(req.body, function (consulta) {
    res.json(consulta);
  });
}

exports.usuarioModificar = function (req, res) {

  var details = {
    idUsuario: req.body.idUsuario,
    nombre: '"' + req.body.nombre + '"',
    apellido: '"' + req.body.apellido + '"',
    residencia: '"' + req.body.residencia + '"',
    institucion: '"' + req.body.institucion + '"',
    grado: '"' + req.body.grado + '"',
  };

  User.modificar(details, function (consulta) {
    res.json(consulta);
  });
}

exports.actualizarFotoPerfil = function (req, res) {
  User.actualizarFotoPerfil(req.body.idUsuario, req.body.fotoPerfil, function (err, consulta) {
    if (err) {
      res.jsno(err);
    } else {
      res.json(consulta);
    }
  })
}

exports.resetPassword = function (req, res) {
  User.buscarToken(req.params.token, function (err, consulta) {
    if (consulta[0].codigo === 0) {
      req.flash('error', consulta[0].mensaje);
      // return res.redirect('/');
      return res.render('resetError');
    } else {
      res.render('reset', {
        user: req.user
      });
    }
  });
}
exports.sincronizarDB = function (req, res) {
  connection.query('SELECT idUsuario,usuario,contrasenia FROM Usuarios', function (err, rows) {
    if (err) {
      console.log("err",err)
      res.status(500).send(err);
    }
    console.log("ok",rows)
    res.status(200).send(rows)
  });
}

exports.resetPasswordPOST = function (req, res) {

  //validacion de datos
  req.assert('password', 'La contreseña debe poseer al menos 5 caracteres').notEmpty().len(5, 20);
  req.assert('password_confirm', 'La contreseña de confirmacion debe poseer al menos 5 caracteres').notEmpty().len(5, 20);
  req.assert('password_confirm', 'Las contreseñas deben coincidir').equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors);
    return res.redirect('back');
  }
  async.waterfall([
    function (done) {
      User.buscarToken(req.params.token, function (err, consulta) {
        if (consulta[0].codigo === 0) {
          req.flash('error', consulta[0].mensaje);
          return res.render('resetError');
        } else {
          User.actualizarContrasenia(req.body.password, consulta[0].idUsuario, function (err, consulta) {
            if (consulta[0].codigo === 0) {
              req.flash('error', consulta[0].mensaje);
              return res.render('resetError');
            } else {
              done(err, consulta[0].mail);
            }
          });
        }
      });
    },
    function (mail, done) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'masterk63@gmail.com',
          pass: 'Kg200210'
        }
      });
      var mailOptions = {
        to: mail,
        from: 'restablecercontrasenia@aguita.com',
        subject: 'Restablecer Contrasenia',
        text: 'Hola ,\n\n' +
          'Esta es una confirmacion de que el password de tu cuenta ' + mail + ' a sido cambiado.\n'
      };
      transporter.sendMail(mailOptions, function (error, info) {
        req.flash('success', 'Tu contrasenia se actualizo correctamente!!');
        done(error, 'done');
      });
    }
  ], function (err) {
    res.redirect('/');
  });
}


exports.forgotPassword = function (req, res) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.buscarPorMail(req.body.email, function (consulta) {
        if (consulta[0].codigo === 0) {
          return res.json(consulta[0]);
        }
        var idUsuario = consulta[0].codigo;
        idUsuario = parseInt(idUsuario);
        User.insertarTokenUsuario(token, idUsuario, function (err, consulta) {
          if (consulta[0].codigo === 0) {
            return res.json(consulta[0]);
          }
          if (consulta[0].codigo === 200) {
            console.log(consulta[0].mensaje)
            done(err, consulta[0].token, req.body.email, consulta[0].mensaje);
          } else {
            done(err, token, req.body.email, consulta[0].mensaje); // siempre el done() tiene que llevar el error
            // por definicion 
          }
        });
      });
    },
    function (token, mail, mensaje, done) {

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'masterk63@gmail.com',
          pass: 'Kg200210'
        }
      });
      var mailOptions = {
        to: mail,
        from: 'restablecercontrasenia@aguita.com',
        subject: 'Restablecer Contrasenia',
        text: 'Recibiste este mail porque tu (o alguien mas) pidio un restablecimiento de contrasenia para tu cuenta en Aguita. \n\n' +
          'Hace click aqui en el siguiente enlace, o pega esto en tu navegador para completar el proceso: \n\n' +
          configServer.data.urlServidor + '/reset/' + token + '\n\n' +
          'Si tu no lo solicitaste, por favor ignora este e-mail.\n'
      };
      transporter.sendMail(mailOptions, function (error, info) {
        console.log('mail enviado');
        done(error, mensaje);
      });
    }
  ], function (err, mensaje) {
    console.log('fin del proceso');
    if (err) return res.send(err);;
    res.json({ 'codigo': 1, 'mensaje': mensaje });
  });
}

exports.excel = function (req, res, next) {
  var nodeExcel = require('excel-export');

  var conf = {}; //lleva la configuarcion de las columnas y filas
  arr = []; // array donde se generan las filas

  conf.cols = [{
    caption: 'Evento_ID',
    type: 'number',
    width: 101
  },
  {
    caption: 'Usuario',
    type: 'string',
    width: 90
  },
  {
    caption: 'Apellido',
    type: 'string',
    width: 90
  },
  {
    caption: 'Nombres',
    type: 'number',
    width: 60
  },
  {
    caption: 'Hora',
    type: 'string',
    width: 90
  },
  {
    caption: 'Fecha',
    type: 'string',
    width: 90
  },
  {
    caption: 'Latitud_localización',
    type: 'string',
    width: 45
  },
  {
    caption: 'Longitud_localización',
    type: 'number',
    width: 85
  },
  {
    caption: 'Latitud_foto',
    type: 'number',
    width: 85
  },
  {
    caption: 'Longitud_foto',
    type: 'number',
    width: 85
  },
  {
    caption: 'Criterio_100m',
    type: 'number',
    width: 105
  },
  {
    caption: 'Índice',
    type: 'number',
    width: 70
  },
  {
    caption: 'Observaciones_usuario',
    type: 'number',
    width: 60
  },
  {
    caption: 'Validado',
    type: 'number',
    width: 40
  },
  {
    caption: 'Validador',
    type: 'number',
    width: 85
  },
  ];

  operacion.getOperacionesPorFecha(fechaInicio, fechaFin, function (consulta) {
    let operaciones = consulta;
    // console.log(operaciones);
    if (operaciones[0].codigo !== 0) {
      for (i = 0; i < operaciones.length; i++) {
        codInterno = operaciones[i].idOperacion;
        cuit = operaciones[i].dniProfesional;
        fechaTransaccion = operaciones[i].fechaTransaccion;
        fechaPago = operaciones[i].fechaPago;
        dniCliente = operaciones[i].dniCliente;
        apellidoCliente = operaciones[i].apellidoCliente;
        nombreCliente = operaciones[i].nombreCliente;
        tarjeta = operaciones[i].nombreTarjeta;
        importeVenta = operaciones[i].importeVenta;
        importeCobrar = operaciones[i].importeCobrar;
        importeVenta = parseFloat(importeVenta);
        importeCobrar = parseFloat(importeCobrar);
        comision = importeVenta - importeCobrar;
        codigoAuto = operaciones[i].codigoAuto;
        cupon = operaciones[i].cupon;
        cuotas = operaciones[i].cuotas;
        importeCarga = operaciones[i].importeCarga;
        importeCuota = operaciones[i].importeCuota;
        mailCliente = operaciones[i].mailCliente;
        telefonoCliente = operaciones[i].telefonoCliente;

        fechaTransaccion = new Date(fechaTransaccion.getUTCFullYear(),
          fechaTransaccion.getUTCMonth(),
          fechaTransaccion.getUTCDate(),
          fechaTransaccion.getUTCHours(),
          fechaTransaccion.getUTCMinutes(),
          fechaTransaccion.getUTCSeconds());

        fechaTransaccion = dateformat(fechaTransaccion, 'dd/mm/yyyy H:MM');

        fechaPago = new Date(fechaPago.getUTCFullYear(),
          fechaPago.getUTCMonth(),
          fechaPago.getUTCDate(),
          fechaPago.getUTCHours(),
          fechaPago.getUTCMinutes(),
          fechaPago.getUTCSeconds());

        fechaPago = dateformat(fechaPago, 'dd/mm/yyyy');

        a = [cuit, fechaTransaccion, fechaPago, dniCliente, apellidoCliente, nombreCliente, tarjeta, importeVenta, 3, importeCobrar, comision, codigoAuto, cupon, cuotas, importeCarga, importeCuota, '', '', codInterno, '', '', '', '', '', '', '', '', mailCliente, telefonoCliente,];
        arr.push(a);
      }

      conf.rows = arr; // armo el excel con todos los datos.

      var result = nodeExcel.execute(conf);
      res.setHeader('Content-Type', 'application/vnd.openxmlformates');
      res.setHeader("Content-Disposition", "attachment;filename=" + "Operaciones.xlsx");
      res.end(result, 'binary');
    } else {
      res.json([{ "codigo": 0, "mensaje": "No hay operaciones en ese rango" }])
    }
  }
  );
}