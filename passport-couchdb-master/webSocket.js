var socket = require('socket.io');

module.exports = function (server) {

    socket = socket.listen(server);

    socket.on('connection', function (connection) {
        console.log('Se conecto un nuevo usuario');
        connection.on('message', function (msg) {
            socket.emit('message', msg);
        });
    });
}