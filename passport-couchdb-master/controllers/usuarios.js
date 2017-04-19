var User = require('./../models/user');
var async = require('async'),
    crypto = require('crypto');

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

exports.forgotPassword = function(req,res){
    
     async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                console.log(req.body.email);
                User.buscarPorMail(req.body.email, function(consulta) {

                    console.log(consulta);
                    if (consulta[0].codigo === 0) {
                        return res.json(consulta[0]);
                    }
                    //tengo que modificar la tabla en mysql y hacer el sp para agregar el token
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                    done(err, token, user);
                    });
                });
            },
            function(token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                user: '!!! YOUR SENDGRID USERNAME !!!',
                pass: '!!! YOUR SENDGRID PASSWORD !!!'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
            }
        ], function(err) {
            if (err) return next(err);
            res.redirect('/forgot');
        });
}