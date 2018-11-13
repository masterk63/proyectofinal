var socket;

module.exports = function (server) {

    socket = require('socket.io')(server).listen(server);

    var nsp = socket.of('/aguita');

    nsp.on('connection', function (connection) {
        console.log('Se conecto un nuevo usuario');
        connection.emit('handShake', { hello: 'Bienvenido' });
        connection.on('crearRoom', function (data) {
            console.log('creando Sala')
            console.log('se unio el usuario', data.user);
            connection.join(data.user);
        })

        connection.on('enviarInfo', function (data) {
            nsp.to(data.user).emit('mensaje', { registro: data.registro });
        });


    });
}