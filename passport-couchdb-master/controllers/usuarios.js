var User = require('./../models/user');

exports.dameUsuario = function(req,res){
    User.dame(req.params.id,function(consulta){
        res.json(consulta);
    });
}

exports.listarUsuarios = function(req,res){
    User.listar(function(consulta){
        res.json(consulta);
    });
}