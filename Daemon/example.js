var converter = require('./');
var cvr = converter();

cvr.connect();

cvr.on('created', function (change) {
    console.log('cambioDetectado');
    var self = this;
    var query = this.config.queries.insert;
    this.database.get(change.id, function (err, res) {
        if (err) throw err;
        //Aca esta la magia modificar doc para lo que se necesario.
        var doc = { idFotos : res._id, foto : res.title };
        self.mysql.query(query, doc, function (err) {
            // prevents dups error.
        });
    });
});

cvr.on('deleted', function (change) {
    var query = this.config.queries.delete;
    this.mysql.query(query, change.id); 
});


cvr.on('updated', function (change) {
    console.log('actualizando');
    var self = this;
    var query = this.config.queries.update;
    this.database.get(change.id, function (err, res) {
        if (err) throw err;
        // console.log(JSON.stringify(res));
        //Aca esta la magia modificar doc para lo que se necesario.
         var doc = { foto : res.title,idFotos : res._id };
         
         self.mysql.query(query, doc,function (err) {
             if (err) throw err;
        });
    });
});
