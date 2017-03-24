
var resourceful = require('resourceful');

var User = module.exports = resourceful.define('user', function () {

  this.string('mail');
  this.string('username');
  this.string('password');
  this.string('nombre');
  this.string('apellido');
  this.string('institucion');
  this.string('grado');
  this.string('residencia');
  this.string('rol');
  this.timestamps();

});

