var express       = require('express'),
    app           = express(),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    cors          = require('cors'),
    logger        = require('morgan'),
    resourceful  = require('resourceful');

var router = require('./routes/index');

var env    = process.env.NODE_ENV || 'database',
    databaseConfig = require('./config/' + env + '.js');

resourceful.use('couchdb', {database: databaseConfig.database});
    
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(cookieParser());

router(app);

module.exports = app;
