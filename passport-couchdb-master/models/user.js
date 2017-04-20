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

exports.baja = function(id,fn){
    connection.query('call usuario_baja('+id+')', function(err, rows){  
                if (err) fn (err);  
                fn(rows[0]); 
            });
} 

exports.modificar = function(u,fn){
    connection.query('call usuario_modificar('
        +u.idUsuario+
        ','+u.nombre+
        ','+u.apellido+
        ','+u.residencia+
        ','+u.institucion+
        ','+u.grado+')', function(err, rows){  
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

exports.buscarPorMail = function(mail,fn){
    var m = '"'+mail+'"';
    connection.query('call usuario_buscarPorMail('+m+')', function(err, rows){  
        if (err) fn (err);  
            fn(rows[0]); 
    });
} 

exports.buscarToken = function(token,fn){
    var t = '"'+token+'"';
    connection.query('call token_buscar('+t+')', function(err, rows){  
            fn(err,rows[0]); 
    });
}

exports.actualizarContrasenia = function(contrasenia,idUsuario,fn){
    var c;
    if(contrasenia){
         c = '"'+contrasenia+'"';
    }
    else{
        c= '""';
    }   
    var i = '"'+idUsuario+'"';
    console.log(c);
    connection.query('call usuario_actualizarContrasenia('+c+','+i+')', function(err, rows){  
            fn(err,rows[0]); 
    });
} 

exports.insertarTokenUsuario = function(token,idUsuario,fn){
    var t = '"'+token+'"';
    var i = '"'+idUsuario+'"';
    connection.query('call token_nuevo('+t+','+i+')', function(err, rows){  
            fn(err,rows[0]); 
    });
} 


