var mysqlModel = require('mysql-model');
var env    = process.env.NODE_ENV || 'database',
    databaseConfig = require('./../config/' + env + '.js');

var MyAppModel = mysqlModel.createConnection({
  host     : databaseConfig.host,
  user     : databaseConfig.user,
  password : databaseConfig.password,
  database : databaseConfig.database,
});



var User = module.exports =  MyAppModel.extend({tableName: "usuarios",});
