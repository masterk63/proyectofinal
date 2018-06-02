var jwt = require('jsonwebtoken');
var User = require('./../models/user');
var authConfig = require('./../config/auth');

function generateToken(user) {
  return jwt.sign(user, authConfig.secret, {
    expiresIn: 10080
  });
}

function setUserInfo(request) {
  return {
    idUsuario: request.idUsuario,
    username: request.usuario,
    rol: request.rol,
  };
}

//Esta funcion se llama, solo luego de haber pasado por passport
// y vuelvo a consultar el usuario a la base de datos
// para poder formar el token
exports.login = function (req, res, next) {
  var username = req.user;
  if (username.codigo != 0) {
    var userInfo = setUserInfo(username);
    res.status(200).json({
      token: 'JWT ' + generateToken(userInfo),
      user: userInfo
    });
  } else {
    res.json(username);
  }
}

exports.loginAdministrador = function (req, res, next) {
  var user = '"' + req.body.username + '"';
  var pass = '"' + req.body.password + '"';
  User.loginAdministrador(user, pass, function (username) {
    if (username.codigo != 0) {
      var userInfo = setUserInfo(username);
      userInfo.fotoPerfil = username.fotoPerfil;
      userInfo.nombre = username.nombre;
      userInfo.apellido = username.apellido;
      res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    } else {
      res.status(403).send(username.mensaje);
    }
  });
}

function convertirLaPrimeraLetraAMayuscula(str) {
  if (str) {
    var pieces = str.split(" ");
    for (var i = 0; i < pieces.length; i++) {
      var j = pieces[i].charAt(0).toUpperCase();
      pieces[i] = j + pieces[i].substr(1);
    }
    return pieces.join(" ");
  } else {
    return str;
  }
}

exports.fb = function (req, res, next) {
  if (!req.body.mail) {
    res.status(400).json({
      mensaje: "ERROR!!! Controlar los Campos Ingresados",
      codigo: 0
    });
  }
  var details = {
    mail: '"' + req.body.mail.toLowerCase() + '"',
    username: '"' + req.body.mail.toLowerCase() + '"', //como no tiene usuario, uso el mail.
    password: '"' + req.body.password + '"', // el password que uso, es el id de usuario en facebook.
    nombre: '"' + convertirLaPrimeraLetraAMayuscula(req.body.nombre) + '"',
    apellido: '"' + convertirLaPrimeraLetraAMayuscula(req.body.apellido) + '"',
    fotoPerfil: '"' + req.body.fotoPerfil + '"'
  };

  User.usuarioFaceBook(details, function (respuesta) {
    if (respuesta[0][0].codigo != 0) {
      var id = '"' + respuesta[0][0].codigo + '"';
      User.dame(id, function (data) {
        var userInfo = setUserInfo(data[0]);
        res.status(200).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo,
          mensaje: "Usuario creado con exito",
          codigo: 200
        });
      });
    } else {
      res.json(respuesta[0][0]);
    }
  });
}

// creacion de usuarios 
exports.register = function (req, res, next) {
  if (!req.body.username || !req.body.mail) {
    res.status(500).json({
      mensaje: "ERROR!!! Controlar los Campos Ingresados",
      codigo: 0
    });
  }

  var details = {
    mail: '"' + req.body.mail.toLowerCase() + '"',
    username: '"' + req.body.username.toLowerCase() + '"',
    password: '"' + req.body.password + '"',
    nombre: '"' + convertirLaPrimeraLetraAMayuscula(req.body.nombre) + '"',
    apellido: '"' + convertirLaPrimeraLetraAMayuscula(req.body.apellido) + '"',
    institucion: '"' + convertirLaPrimeraLetraAMayuscula(req.body.institucion) + '"',
    grado: '"' + req.body.grado + '"',
    residencia: '"' + convertirLaPrimeraLetraAMayuscula(req.body.residencia) + '"'
  };

  User.crearUsuario(details, function (respuesta) {
    if (respuesta[0][0].codigo != 0) {
      var id = '"' + respuesta[0][0].codigo + '"';
      User.dame(id, function (data) {
        var userInfo = setUserInfo(data[0]);
        res.status(200).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo,
          mensaje: "Usuario creado con exito",
          codigo: 200
        });
      });
    } else {
      res.json(respuesta[0][0]);
    }
  });
}

exports.roleAuthorization = function (roles) {

  return function (req, res, next) {

    var user = req.user;

    User.get(user._id, function (err, foundUser) {

      if (err) {
        res.status(422).json({ error: 'No user found.' });
        return next(err);
      }

      if (roles.indexOf(foundUser.role) > -1) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content' });
      return next('Unauthorized');

    });

  }

}