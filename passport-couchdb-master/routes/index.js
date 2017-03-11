var User = require('../models/user');
var jwt = require('jsonwebtoken');  

var env    = process.env.NODE_ENV || 'auth',
                    configAuth = require('./../config/' + env + '.js');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

function generateToken(user){
    return jwt.sign(user, configAuth.secret, {
        expiresIn: 10080
    });
}

function setUserInfo(request){
    return {
        _id: request._id,
        email: request.username,
    };
}

module.exports = function(app, passport) {


  app.get('/', function(req, res) {
    res.render('index.ejs', {user : req.user});
  });

  app.get('/account', function(req, res) {
    res.render('account.ejs', {user : req.user});
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // app.get('/login', function(req, res) {
  //   res.render('login.ejs', { message: req.flash('loginMessage') });
  // });

  // app.post('/login', passport.authenticate('local', {
  //   successRedirect : '/',
  //   failureRedirect : '/login', // redirect back to the signup page if there is an error
  //   failureFlash : true // allow flash messages
  // }));

  app.post('/login',requireLogin,function(req, res) {
    res.json(req.user);
  });

//    app.post('/login', function(req, res, next){
 
//     var userInfo = setUserInfo(req.user);
 
//     res.status(200).json({
//         token: 'JWT ' + generateToken(userInfo),
//         user: userInfo
//     });
 
// });

  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', function(req, res) {
    User.create(req.body, function(err, data) {
      if (err) {
        console.log('Error : ', err);
        res.send(500, err);
      } else {
        var userInfo = setUserInfo(data);
        console.log(data);
        res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
      }
    });
  });

  // authRoutes.get('/protected', requireAuth, function(req, res){
  //       res.send({ content: 'Success'});
  // });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
