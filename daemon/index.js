var follow = require('follow');// sigue una base de dato de couchdb
var nano = require('nano'); // driver para conectarse con couchdb
var mysql = require('mysql'); // driver Mysql
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var CONFIG = require('./config.json'); // donde estan las configuraciones


//Esto es una clase que la definimos aqui con prototype, que asi son los obj por defecto.
//Todas las variables de la clase se definen con THIS, por eso no vienen de ningun lado.
function Converter (config) {
    if (!(this instanceof Converter)) return new Converter(config);
    this.config = config || CONFIG;
    this.couchRegistros = this.parseCouchDBRegistros();
    this.couchUsuarios = this.parseCouchDBUsuarios();
    this.mysql = this.parseMySQL();
    this.databaseRegistros = require('nano')(this.couchRegistros);
    this.databaseUsuarios = require('nano')(this.couchUsuarios);
}

util.inherits(Converter, EventEmitter);

Converter.prototype.parseCouchDBRegistros = function () {
    return 'http://' 
        + this.config.couchRegistros.host + ':' 
        + this.config.couchRegistros.port + '/' 
        + this.config.couchRegistros.database;
};

Converter.prototype.parseCouchDBUsuarios = function () {
    return 'http://' 
        + this.config.couchUsuarios.host + ':' 
        + this.config.couchUsuarios.port + '/' 
        + this.config.couchUsuarios.database;
};

Converter.prototype.parseMySQL = function () {
    return mysql.createConnection({
        host : this.config.mySQL.host,
        user : this.config.mySQL.user,
        password : this.config.mySQL.password,
        database : this.config.mySQL.database
    });
};

Converter.prototype.connect = function () {
    var self = this;
    self.mysql.connect(function (err) {
        if (err) throw err;
        self.listen();
    });
};


// Aqui ponemos las 2 base de datos que queremos escuchar con la funcion FOLLOW, couchdbUsuarios y Registros definidas en config.json
Converter.prototype.listen = function () {
    var self = this;
    follow({db:this.couchRegistros,since:"now"}, function (err, change) {
        if (err) throw err;
        self.handleRegistros(change);
    });
    follow({db:this.couchUsuarios,since: "now"}, function (err, change) {
        if (err) throw err;
        self.handleUsuarios(change);
    });
};

//con estos parametros 'regBorrado' es con lo que tenemos que escuchar en cvr.on en el example.js
Converter.prototype.handleRegistros = function (change) {
    if (change.deleted) {
        this.sync(change, 'regBorrado');
    } else if (change.changes[0].rev[0] != '1') {
        this.sync(change, 'regActualizado');
    } else {
        this.sync(change, 'regCreado');
    } 
};

Converter.prototype.handleUsuarios = function (change) {
    if (change.deleted) {
        this.sync(change, 'usrBorrado');
    } else if (change.changes[0].rev[0] != '1') {
        this.sync(change, 'usrActualizado');
    } else {
        this.sync(change, 'usrCreado');
    } 
};

Converter.prototype.sync = function (change, status) {
    this.emit(status, change);
};

module.exports = Converter;
