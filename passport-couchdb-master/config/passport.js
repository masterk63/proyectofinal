var passport = require('passport');
var User = require('./../models/user');
var env    = process.env.NODE_ENV || 'auth',
    config = require('./' + env + '.js');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local').Strategy;

    
   
var localLogin = new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
      User.find( {username : username}, function(err, user) {
        if (err) { return done(err); }

        if (!user || user.length == 0) { return done(null, false, { message: 'Unknown user ' + username }); }

        user = user[0];

        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }

        return done(null, user);
      })
    });
  }
);



var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.secret
};
 

var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
 
    User.get(payload._id, function(err, user){
 
        if(err){
            return done(err, false);
        }
 
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
 
    });
 
});
 
passport.use(localLogin);
passport.use(jwtLogin);