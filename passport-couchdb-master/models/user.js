var mysql = require('mysql');
var env    = process.env.NODE_ENV || 'database',
    databaseConfig = require('./../config/' + env + '.js');

var connection = mysql.createConnection({
  host     : databaseConfig.host,
  user     : databaseConfig.user,
  password : databaseConfig.password,
  database : databaseConfig.database,
});

exports.crearUsuario = function(u,fn){
        connection.query('CALL usuario_nuevo('
        +u.mail+
        ','+u.username+
        ','+u.password+
        ','+u.nombre+
        ','+u.apellido+
        ','+u.institucion+
        ','+u.grado+
        ','+u.residencia+')',function(err,rows){
          if(err){
               fn(err);
          }
          fn(rows);
        }); 
}
