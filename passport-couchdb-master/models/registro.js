var mysql = require('mysql');
var env = process.env.NODE_ENV || 'database',
    databaseConfig = require('./../config/' + env + '.js');

var connection = mysql.createConnection({
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.database,
});


exports.listar = function (fn) {
    connection.query('call registros_listar()', function (err, rows) {
        if (err) fn(err);
        fn(rows[0]);
    });
}

exports.listarMarkets = function (fn) {
    connection.query('call registros_coordenadas()', function (err, rows) {
        fn(err, rows[0]);
    });
}

exports.dame = function (id, fn) {
    connection.query('call registro_dame(' + id + ')', function (err, rows) {
        if (err) fn(err);
        fn(rows[0]);
    });
}

exports.validar = function (id, fn) {
    connection.query('call registro_validar(' + id + ')', function (err, rows) {
        if (err) fn(err);
        fn(rows[0]);
    });
}

exports.invalidar = function (id, fn) {
    connection.query('call registro_invalidar(' + id + ')', function (err, rows) {
        if (err) fn(err);
        fn(rows[0]);
    });
}

exports.nuevo = function (registro,fn) {
    console.log('en el modelo')
    // var indice = parseInt(registro.indice);
    // var fecha = '"' + registro.fecha + '"';
    // var latitud = registro.latitud;
    // var longitud = registro.longitud;
    // var fotoPaisaje = '"' + registro.fotoPaisaje + '"';
    // var fotoMuestra = '"' + registro.fotoMuestra + '"';
    // var fotoMapa = '"' + registro.fotoMapa + '"';
    // var observaciones = '"' + registro.observacion + '"';
    // var idUsuario = parseInt(registro.idUsuario);
    // var ciudad = '"' + registro.ciudad + '"';
    // var provincia = '"' + registro.provincia + '"';
    // var pais = '"' + registro.pais + '"';
    // var elmidos = '"' + registro.elmidos + '"';
    // var patudos = '"' + registro.patudos + '"';
    // var plecopteros = '"' + registro.plecopteros + '"';
    // var tricopteros = '"' + registro.tricopteros + '"';

    // connection.query('CALL registro_nuevo_completo(' + indice + ',' + fecha + ',' + latitud + ',' + longitud + ',' + fotoPaisaje + ',' + fotoMuestra + ',' + fotoMapa + ',' + observaciones + ',' + idUsuario + ',' + ciudad + ',' + provincia + ',' + pais + ',' + elmidos + ',' + patudos + ',' + plecopteros + ',' + tricopteros + ')', function (err, rows) {
    //     if (err) {
    //         consulta = [{ 'codigo': 0, 'mensaje': "Error numero: " + err.errno + " descripcion: " + err.message }]
    //         fn(consulta);
    //     } else fn(rows[0]);
    // });
}