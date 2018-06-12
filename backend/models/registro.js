var mysql = require('mysql');
var env = process.env.NODE_ENV || 'database',
    databaseConfig = require('./../config/' + env + '.js');

var connection = mysql.createConnection({
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.database,
});

var NodeGeocoder = require('node-geocoder');


exports.listar = function (reg,fn) {
    var now = '"' + reg.now + '"';
    var lastWeek = '"' + reg.lastWeek + '"';
    var estado = parseInt(reg.estado);

    var query = 'call registros_listar(' + lastWeek + ',' + now + ',' + estado + ')';
    console.log(query)
    connection.query('call registros_listar(' + lastWeek + ',' + now + ',' + estado + ')', function (err, rows) {
        if (err) fn(err);
        fn(rows[0]);
    });
}

exports.listarUsuario = function (id, fn) {
    connection.query('call registros_listar_usuario(' + id + ')', function (err, rows) {
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
        try {
            fn(rows[0]);
        } catch (e) {
            fn(e);
            console.log(e)
        }
    });
}

exports.validar = function (reg, fn) {
    let registros = '"' + reg + '"';
    connection.query('call registro_validar(' + registros + ')', function (err, rows) {
        if (err) fn(err);
        fn(rows[0]);
    });
}

exports.invalidar = function (reg, fn) {
    let registros = '"' + reg + '"';
    console.log(registros)
    connection.query('call registro_invalidar(' + registros + ')', function (err, rows) {
        if (err) fn(err);
        fn(rows[0]);
    });
}

exports.nuevo = function (registro, fn) {
    console.log('en el modelo')
    obtenerDireccion(registro.latitud, registro.longitud, function (direccion) {
        if (!direccion) {
            consulta = [{ 'codigo': 0, 'mensaje': "Error al obtener la geolocalizacion inversa" }]
            fn(consulta);
        } else {
            var indice = parseInt(registro.indice);
            var fecha = '"' + registro.fecha + '"';
            var latitud = registro.latitud;
            var longitud = registro.longitud;
            var fotoPaisaje = '"' + registro.fotoPaisaje + '"';
            var fotoMuestra = '"' + registro.fotoMuestra + '"';
            var fotoMapa = '"' + registro.fotoMapa + '"';
            var observaciones = '"' + registro.observacion + '"';
            var idUsuario = parseInt(registro.idUsuario);
            var ciudad = '"' + direccion.ciudad + '"';
            var provincia = '"' + direccion.provincia + '"';
            var pais = '"' + direccion.pais + '"';
            var elmidos = '"' + registro.elmido + '"';
            var patudos = '"' + registro.patudo + '"';
            var plecopteros = '"' + registro.plecoptero + '"';
            var tricopteros = '"' + registro.tricoptero + '"';

            connection.query('CALL registro_nuevo_completo(' + indice + ',' + fecha + ',' + latitud + ',' + longitud + ',' + fotoPaisaje + ',' + fotoMuestra + ',' + fotoMapa + ',' + observaciones + ',' + idUsuario + ',' + ciudad + ',' + provincia + ',' + pais + ',' + elmidos + ',' + patudos + ',' + plecopteros + ',' + tricopteros + ')', function (err, rows) {
                if (err) {
                    consulta = [{ 'codigo': 0, 'mensaje': "Error numero: " + err.errno + " descripcion: " + err.message }]
                    fn(consulta);
                } else fn(rows[0]);
            });
        }
    });
}


function obtenerDireccion(latitud, longitud, fn) {
    var options = {
        provider: 'google',
        // Optional depending on the providers 
        httpAdapter: 'https', // Default
        apiKey: 'AIzaSyA4h0qNqE_K6GuDT5-BH2g2Mx_XcwbLSys', // for Mapquest, OpenCage, Google Premier
        formatter: null         // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);

    geocoder.reverse({ lat: latitud, lon: longitud }, function (err, res) {
        if (err) {
            console.log(err)
            fn(null);
        } else {
            res = res[0];
            if (res.city === undefined || res.city === '' || res.city === null) {
                console.log("no hay ciudad")
                try {
                    res.city = res.administrativeLevels.level2long;
                } catch (error) {
                    res.city = '';
                }
            }
            if (res.administrativeLevels.level1long === undefined || res.administrativeLevels.level1long === '' || res.administrativeLevels.level1long === null) {
                res.administrativeLevels.level1long = ' ';
            }
            if (res.country === undefined || res.country === '' || res.country === null) {
                res.country = ' ';
            }
            direccion = {
                ciudad: res.city,
                provincia: res.administrativeLevels.level1long,
                pais: res.country
            }
            fn(direccion)
        }
    });
}

