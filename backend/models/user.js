var mysql = require('mysql');
var env = 'database',
  databaseConfig = require('./../config/' + env + '.js');

var connection = mysql.createConnection({
  host: databaseConfig.host,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.database,
  timezone: 'utc'
});

exports.crearUsuario = function (u, fn) {
  connection.query('CALL usuario_nuevo('
    + u.mail +
    ',' + u.username +
    ',' + u.password +
    ',' + u.nombre +
    ',' + u.apellido +
    ',' + u.institucion +
    ',' + u.grado +
    ',' + u.residencia +
    ',' + profileImg + ')', function (err, rows) {
      if (err) {
        fn(err);
      }
      fn(rows);
    });
}

exports.usuarioFaceBook = function (u, fn) {
  connection.query('CALL usuario_facebook('
    + u.mail +
    ',' + u.username +
    ',' + u.password +
    ',' + u.nombre +
    ',' + u.apellido +
    ',' + u.fotoPerfil + ')', function (err, rows) {
      if (err) {
        fn(err);
      }
      fn(rows);
    });
}

exports.listar = function (u, fn) {
  var estado = '"' + u.estado + '"';
  connection.query('call usuarios_listar(' + estado + ')', function (err, rows) {
    if (err) fn(err);
    fn(rows[0]);
  });
}

exports.dame = function (id, fn) {
  connection.query('call usuario_dame(' + id + ')', function (err, rows) {
    if (err) fn(err);
    fn(rows[0]);
  });
}

exports.baja = function (id, fn) {
  connection.query('call usuario_baja(' + id + ')', function (err, rows) {
    if (err) fn(err);
    fn(rows[0]);
  });
}
exports.activar = function (id, fn) {
  connection.query('call usuario_activar(' + id + ')', function (err, rows) {
    if (err) fn(err);
    fn(rows[0]);
  });
}

exports.modificar = function (u, fn) {
  let query = 'call usuario_modificar('
    + u.idUsuario +
    ',' + u.nombre +
    ',' + u.apellido +
    ',' + u.residencia +
    ',' + u.institucion +
    ',' + u.grado + ')';

  console.log(query);

  connection.query(query, function (err, rows) {
    if (err) fn(err);
    fn(rows[0]);
  });
}

exports.login = function (usuario, password, fn) {
  connection.query('call usuario_ingresar(' + usuario + ',' + password + ')', function (err, rows) {
    if (err) {
      err.codigo = 0;
      fn(err);
    } else {
      fn(rows[0][0]);
    }
  });
}

exports.loginAdministrador = function (usuario, password, fn) {
  connection.query('call usuario_adm_ingresar(' + usuario + ',' + password + ')', function (err, rows) {
    if (err) {
      err.codigo = 0;
      fn(err);
    } else {
      fn(rows[0][0]);
    }
  });
}

exports.buscarPorMail = function (mail, fn) {
  var m = '"' + mail + '"';
  connection.query('call usuario_buscarPorMail(' + m + ')', function (err, rows) {
    if (err) fn(err);
    fn(rows[0]);
  });
}

exports.buscarToken = function (token, fn) {
  var t = '"' + token + '"';
  connection.query('call token_buscar(' + t + ')', function (err, rows) {
    fn(err, rows[0]);
  });
}

exports.actualizarContrasenia = function (contrasenia, idUsuario, fn) {
  var c;
  if (contrasenia) {
    c = '"' + contrasenia + '"';
  }
  else {
    c = '""';
  }
  var i = '"' + idUsuario + '"';
  connection.query('call usuario_actualizarContrasenia(' + c + ',' + i + ')', function (err, rows) {
    fn(err, rows[0]);
  });
}

exports.actualizarFotoPerfil = function (idUsuario, fotoPerfil, fn) {
  var id = '"' + idUsuario + '"';
  var foto = '"' + fotoPerfil + '"';
  connection.query('call usuario_actulizarFotoPerfil(' + id + ',' + foto + ')', function (err, rows) {
    fn(err, rows[0]);
  });
}

exports.insertarTokenUsuario = function (token, idUsuario, fn) {
  var t = '"' + token + '"';
  var i = '"' + idUsuario + '"';
  connection.query('call token_nuevo(' + t + ',' + i + ')', function (err, rows) {
    fn(err, rows[0]);
  });
}

exports.setAdmin = function (u, fn) {
  console.log('​exports.setAdmin -> u', u);
  connection.query('call usuario_set_admin(?,?)', [u.idAdmin, u.idUsuario], function (err, rows) {
    if (err) fn(err);
    fn(rows[0]);
  });
}

var profileImg = "'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'";

