var express       = require('express'),
    app           = express(),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    validator = require('express-validator'),
    cors          = require('cors'),
    path = require('path'),
    crypto = require('crypto'),
    flash = require('express-flash'),
    session = require('express-session'),
    logger        = require('morgan');
var router = require('./routes/index');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(validator());
app.use(cors());
app.use(cookieParser());
app.use(session({ secret: 'session secret key' }));
app.use(flash()); 

router(app);

module.exports = app;
