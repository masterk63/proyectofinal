var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proyectofinal'
});
exports.listar = function(req,res){
    connection.query('call usuarios_listar()', function(err, rows){  
                if (err) throw err;  
                res.json(rows[0]); 
            });
}

exports.dame = function(req,res){
    var idUsuario=req.params.id;
    connection.query('call usuario_dame('+idUsuario+')', function(err, rows){  
                if (err) throw err;  
                res.json(rows[0]); 
            });
}
