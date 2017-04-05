
var resourceful = require('resourceful');

var User = module.exports = resourceful.define('user', function () {

  this.string('mail',{ format: 'email', required: true });
  this.string('nombre',{ required: true });
  this.string('apellido',{ required: true });
  this.string('institucion',{ required: true });
  this.string('grado');
  this.string('residencia');
  this.string('username',{ required: true }); 
  this.string('password',{ required: true });
  this.string('rol');
  this.timestamps();

});

