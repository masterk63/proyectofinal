var User = require('./../models/user');

exports.dameUsuario = function(req,res){
    User.dame(req.params.id,function(consulta){
        res.json(consulta);
    });
}

exports.usuarioBaja = function(req,res){
    User.baja(req.params.id,function(consulta){
        res.json(consulta);
    });
}

exports.listarUsuarios = function(req,res){
    User.listar(function(consulta){
        res.json(consulta);
    });
}

exports.usuarioModificar = function(req,res){
    
    var details = {
        idUsuario: req.body.idUsuario,
        nombre: '"'+req.body.nombre+'"',
        apellido: '"'+req.body.apellido+'"',
        residencia: '"'+req.body.residencia+'"',
        institucion: '"'+req.body.institucion+'"',
        grado: '"'+req.body.grado+'"',
    };

    User.modificar(details,function(consulta){
        res.json(consulta);
    });
}