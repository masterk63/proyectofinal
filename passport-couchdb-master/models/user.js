
var resourceful = require('resourceful');

var User = module.exports = resourceful.define('user', function () {

  this.string('username');
  this.string('password');

  this.timestamps();

});

