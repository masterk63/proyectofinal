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
    authRoutes.post('/fb', AuthenticationController.fb);
    //Para el login, pongo primero el middleware de passport, con la llamada a 
    // requireLogin, y depues llamo al login propiamente dicho, para armar el token
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    authRoutes.post('/loginAdmin', AuthenticationController.loginAdministrador);
    
    //Ruta de prueba que se usa para ver si el Token con JWT, esta funcionando
    // correctamente, se usa el middlewear requireAuth de ahora en mas, para hacer
    // las consultas.
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
    //API usuarios
    apiUsuarios.post('/usuariosListar',UsuariosController.listarUsuarios);
    apiUsuarios.get('/usuarioDame/:id',UsuariosController.dameUsuario);
    apiUsuarios.post('/usuarioModificar',UsuariosController.usuarioModificar);
    apiUsuarios.post('/usuarioActualizarFotoPerfil',UsuariosController.actualizarFotoPerfil);
    apiUsuarios.get('/usuarioBaja/:id',UsuariosController.usuarioBaja);
    apiUsuarios.post('/forgot',UsuariosController.forgotPassword);
    apiUsuarios.get('/sincronizarDB',UsuariosController.sincronizarDB);
    // app.get('/forgot', function(req, res) {
    //     res.render('forgot', {
    //         user: req.user
    //     });
    // });
    app.get('/reset/:token', UsuariosController.resetPassword);
    app.post('/reset/:token', UsuariosController.resetPasswordPOST);
    //API Registros
    apiRegistros.post('/registrosListar',RegistrosController.registrosListar);
    apiRegistros.get('/registrosListarUsuario/:id',RegistrosController.registrosListarUsuario);
    apiRegistros.post('/registroNuevo',RegistrosController.registroNuevo);
    apiRegistros.get('/listarMarkers',RegistrosController.registrosListarMarkers);
    apiRegistros.get('/registroDame/:id',RegistrosController.registroDame);
    apiRegistros.post('/registroValidar/',RegistrosController.registroValidar);
    apiRegistros.post('/registroInvalidar/',RegistrosController.registroInvalidar);
    apiRegistros.post('/registroAgregarComentarioAdmin/',RegistrosController.addComment);
    
    // Set up routes
    //Esto es para que use la ruta! sino error
    app.use('/api', apiRoutes,apiUsuarios,apiRegistros);

    app.get('/', function(req, res) {
        res.render('index', { title: 'Express' });
    });
}