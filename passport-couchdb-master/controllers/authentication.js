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
        email: request.username,
    };
}
 
exports.login = function(req, res, next){
 
    var userInfo = setUserInfo(req.user);
 
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
 
}

// creacion de usuarios 
exports.register = function(req, res, next){
    console.log(req.body);
    //control para ver si existe el username o el mail
    User.find( {username:req.body.username}, function(err,user){
        if(err){
            console.log(err);
        }else{
            console.log(user.length);
            if(user.length != 0){
                console.log(user);
                res.status(200).json({
                mensaje: "El nombre de usuario ya existe",
                codigo: -1
            });
            }else{
                User.find( {mail:req.body.mail}, function(err,user){
                    if(err){
                        console.log(err);
                    }else{
                        if(user.length != 0){
                            console.log(user);
                            res.status(200).json({
                                    mensaje: "El mail ya esta registrado",
                                    codigo: -1
                                });
                        }else{// este else es el que determino el usuario no existente completo. y lo creamos
                            User.create(req.body, function(err, data) {
                            if (err) {
                                console.log('Error : ', err);
                                res.send(500, err);
                            } else {
                                var userInfo = setUserInfo(data);
                                console.log(data);
                                res.status(200).json({
                                    token: 'JWT ' + generateToken(userInfo),
                                    user: userInfo,
                                    mensaje: "Usuario creado con exito",
                                    codigo: 200
                                });
                            }   
                           });
                        }
                    }
                });
            }
        }
    });
 
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