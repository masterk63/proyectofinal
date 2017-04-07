var express       = require('express'),
    app           = express(),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),
    cors          = require('cors'),
    logger        = require('morgan');
    

var router = require('./routes/index');

    
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(cookieParser());

router(app);

module.exports = app;
