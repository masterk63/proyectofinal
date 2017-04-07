var jwt = require('jsonwebtoken');  
var User = require('./../models/user');
var authConfig = require('./../config/auth');
 
function generateToken(user){
    return jwt.sign(user, authConfig.secret, {
        expiresIn: 10080
    });
}
 
function setUserInfo(request){
    return {
        _id: request._id,
        username: request.username,
        rol:request.rol,
    };
}
 
exports.login = function(req, res, next){
    
    User.find( {username : req.user.username}, function(err, user) {
        
        var userInfo = setUserInfo(user[0]);
        console.log(userInfo);
        res.status(200).json({
            token: 'JWT ' + generateToken(userInfo),
            user: userInfo
        });
    });
}

function convertirLaPrimeraLetraAMayuscula(str)
{
    if(str){
        var pieces = str.split(" ");
        for ( var i = 0; i < pieces.length; i++ )
        {
            var j = pieces[i].charAt(0).toUpperCase();
            pieces[i] = j + pieces[i].substr(1);
        }
        return pieces.join(" ");
    }else{
        return str;
    }
}

// creacion de usuarios 
exports.register = function(req, res, next){
    if(!req.body.username || !req.body.mail){
        res.status(500).json({
            mensaje: "ERROR!!! Controlar los Campos Ingresados",
            codigo: -1
        });
    }
    var details = {
        mail: req.body.mail.toLowerCase(),
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        nombre: convertirLaPrimeraLetraAMayuscula(req.body.nombre),
        apellido: convertirLaPrimeraLetraAMayuscula(req.body.apellido),
        institucion: convertirLaPrimeraLetraAMayuscula(req.body.institucion),
        grado: req.body.grado,
        residencia: convertirLaPrimeraLetraAMayuscula(req.body.residencia),
        rol: "usuario"
    };
    console.log('por crear');
    usuario = new User(details);
    console.log('creado');
    usuario.save(function(respusta){
        console.log(respuesta);
    });
    console.log('guardado');
    // //control para ver si existe el username o el mail
    // User.find( {username:req.body.username.toLowerCase()}, function(err,user){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(user.length);
    //         if(user.length != 0){
    //             console.log(user);
    //             res.status(200).json({
    //             mensaje: "El nombre de usuario ya existe",
    //             codigo: -1
    //         });
    //         }else{
    //             User.find( {mail:req.body.mail.toLowerCase()}, function(err,user){
    //                 if(err){
    //                     console.log(err);
    //                 }else{
    //                     if(user.length != 0){
    //                         console.log(user);
    //                         res.status(200).json({
    //                                 mensaje: "El mail ya esta registrado",
    //                                 codigo: -1
    //                             });
    //                     }else{// este else es el que determino el usuario no existente completo. y lo creamos
    //                         //Podria haber hecho de esta forma User.create(req.body, function(err, data) {
    //                         //Pero necesito agregarle el rol, por lo que defino el objeto antes.
         
    //                         var details = {
    //                             mail: req.body.mail.toLowerCase(),
    //                             username: req.body.username.toLowerCase(),
    //                             password: req.body.password,
    //                             nombre: convertirLaPrimeraLetraAMayuscula(req.body.nombre),
    //                             apellido: convertirLaPrimeraLetraAMayuscula(req.body.apellido),
    //                             institucion: convertirLaPrimeraLetraAMayuscula(req.body.institucion),
    //                             grado: req.body.grado,
    //                             residencia: convertirLaPrimeraLetraAMayuscula(req.body.residencia),
    //                             rol: "usuario"
    //                         };
    //                         User.create(details, function(err, data) {
    //                         if (err) {
    //                             console.log('Error : ', err);
    //                             //res.send(500, err);
    //                             res.status(500).json({
    //                                 mensaje: "ERROR!!! Controlar los Campos Ingresados",
    //                                 codigo: -1
    //                             });
    //                         } else {
    //                             var userInfo = setUserInfo(data);
    //                             console.log(data);
    //                             res.status(200).json({
    //                                 token: 'JWT ' + generateToken(userInfo),
    //                                 user: userInfo,
    //                                 mensaje: "Usuario creado con exito",
    //                                 codigo: 200
    //                             });
    //                         }   
    //                        });
    //                     }
    //                 }
    //             });
    //         }
    //     }
    // });
 
}
 
exports.roleAuthorization = function(roles){
 
    return function(req, res, next){
 
        var user = req.user;
 
        User.get(user._id, function(err, foundUser){
 
            if(err){
                res.status(422).json({error: 'No user found.'});
                return next(err);
            }
 
            if(roles.indexOf(foundUser.role) > -1){
                return next();
            }
 
            res.status(401).json({error: 'You are not authorized to view this content'});
            return next('Unauthorized');
 
        });
 
    }
 
}