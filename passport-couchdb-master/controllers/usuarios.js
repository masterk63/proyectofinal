var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'proyectofinal'
});

exports.listar = function(req,res){
    connection.connect();
    connection.query('call usuarios_listar()', function(err, rows){  
                if (err) throw err;  
                res.json(rows);
                console.log(rows[0]);  
            });
    connection.end();
}