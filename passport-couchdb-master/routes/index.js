var AuthenticationController = require('./../controllers/authentication'),  
    UsuariosController = require('./../controllers/usuarios'),  
    RegistrosController = require('./../controllers/registrosController'),  
    express = require('express'),
    passportService = require('./../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        apiUsuarios = express.Router(),
        apiRegistros = express.Router(),
        authRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    //Para el login, pongo primero el middleware de passport, con la llamada a 
    // requireLogin, y depues llamo al login propiamente dicho, para armar el token
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    
    //Ruta de prueba que se usa para ver si el Token con JWT, esta funcionando
    // correctamente, se usa el middlewear requireAuth de ahora en mas, para hacer
    // las consultas.
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
    //API usuarios
    apiUsuarios.get('/usuariosListar',UsuariosController.listarUsuarios);
    apiUsuarios.get('/usuarioDame/:id',UsuariosController.dameUsuario);
    apiUsuarios.post('/usuarioModificar',UsuariosController.usuarioModificar);
    apiUsuarios.get('/usuarioBaja/:id',UsuariosController.usuarioBaja);
    apiUsuarios.post('/forgot',UsuariosController.forgotPassword);
    app.get('/forgot', function(req, res) {
        res.render('forgot', {
            user: req.user
        });
    });
    app.get('/reset/:token', UsuariosController.resetPassword);
    app.post('/reset/:token', UsuariosController.resetPasswordPOST);
    //API Registros
    apiRegistros.get('/registrosListar',RegistrosController.registrosListar);
    apiRegistros.post('/registroNuevo',RegistrosController.registroNuevo);
    apiRegistros.get('/listarMarkers',RegistrosController.registrosListarMarkers);
    apiRegistros.get('/registroDame/:id',RegistrosController.registroDame);
    apiRegistros.get('/registroValidar/:id',RegistrosController.registroValidar);
    apiRegistros.get('/registroInvalidar/:id',RegistrosController.registroInvalidar);
    
    


    // Set up routes
    //Esto es para que use la ruta! sino error
    app.use('/api', apiRoutes,apiUsuarios,apiRegistros);

    app.get('/', function(req, res) {
        res.render('index', { title: 'Express' });
    });
}