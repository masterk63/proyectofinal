var mysql = require('mysql');
var env    = process.env.NODE_ENV || 'database',
    databaseConfig = require('./../config/' + env + '.js');

var connection = mysql.createConnection({
  host     : databaseConfig.host,
  user     : databaseConfig.user,
  password : databaseConfig.password,
  database : databaseConfig.database,
});


exports.listar = function(fn){
    connection.query('call registros_listar()', function(err, rows){  
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

exports.validar = function(id,fn){
    connection.query('call usuario_baja('+id+')', function(err, rows){  
                if (err) fn (err);  
                fn(rows[0]); 
            });
}


