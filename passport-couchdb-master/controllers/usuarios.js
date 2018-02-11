var User = require('./../models/user');
var async = require('async'),
  crypto = require('crypto');
const nodemailer = require('nodemailer');
var configServer = require('./../server.js' );

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
  User.listar(function (consulta) {
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

exports.resetPasswordPOST = function (req, res) {

  //validacion de datos
  req.assert('password', 'La contresenia debe poseer al menos 5 caracteres').notEmpty().len(5, 20);
  req.assert('password_confirm', 'La contresenia de confirmacion debe poseer al menos 5 caracteres').notEmpty().len(5, 20);
  req.assert('password_confirm', 'La contresenia debe coincidir').equals(req.body.password);

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
          done(err, token, req.body.email); // siempre el done() tiene que llevar el error
          // por definicion
        });
      });
    },
    function (token, mail, done) {

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
        done(error, 'done');
      });
    }
  ], function (err) {
    console.log('fin del proceso');
    if (err) return res.send(err);;
    res.json({ 'codigo': 1, 'mensaje': 'listo' });
  });
}