var AuthenticationController = require('./../controllers/authentication'),  
    UsuariosController = require('./../controllers/usuarios'),  
    express = require('express'),
    passportService = require('./../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        apiUsuarios = express.Router(),
        authRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
    //API usuarios
    apiUsuarios.get('/usuariosListar',UsuariosController.listarUsuarios);
    apiUsuarios.get('/usuarioDame/:id',UsuariosController.dameUsuario);
    apiUsuarios.post('/usuarioModificar',UsuariosController.usuarioModificar);
    apiUsuarios.get('/usuarioBaja/:id',UsuariosController.usuarioBaja);
    apiUsuarios.post('/forgot',UsuariosController.forgotPassword); 
    // Set up routes
    app.use('/api', apiRoutes,apiUsuarios);
    
    app.get('/reset/:token', UsuariosController.resetPassword);
    app.post('/reset/:token', UsuariosController.resetPasswordPOST);
    
    app.get('/', function(req, res) {
        res.render('index', { title: 'Express' });
    });
    app.get('/forgot', function(req, res) {
        res.render('forgot', {
            user: req.user
        });
    });
}