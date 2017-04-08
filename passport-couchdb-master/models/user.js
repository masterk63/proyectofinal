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

exports.listar = function(fn){
    connection.query('call usuarios_listar()', function(err, rows){  
                if (err)  fn(err);  
                fn(rows[0]); 
            });
}

exports.dame = function(id,fn){
    connection.query('call usuario_dame('+id+')', function(err, rows){  
                if (err) fn (err);  
                fn(rows[0]); 
            });
} 

exports.login = function(usuario,fn){
    connection.query('call usuario_ingresar('+usuario+')', function(err, rows){  
                if (err) fn (err);  
                fn(rows[0]); 
            });
} 