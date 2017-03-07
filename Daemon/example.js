var converter = require('./');
var cvr = converter();

cvr.connect();
var fotoPaisaje;

function foto1(self,change,fn){
    self.database.attachment.get(change.id, "fotoMuestra.png", function(err, body) {
        if (err) throw err;
        fn(body.toString('base64'));
    });
}

cvr.on('created', function (change) {
    console.log('cambioDetectado');
    var self = this;
    var query = this.config.queries.insert;
    
    // foto1(self,change,function(hola)
    
    this.database.get(change.id, function (err, res) {
        if (err) throw err;
        
        //Aca esta la magia modificar doc para lo que se necesario.
        var doc = { 
            idRegistro : 2,
            latitud: 65.4545,
            longitud:-55.24,
            fotoPaisaje: res.fotoPaisaje,
            fotoMuestra: res.fotoMuestra,
            observacion: 'test de comentario',
            valido:1,
            pendiente:0,
            idUsuario : 1,
            idUbicacion: 1,
        };
        // self.mysql.query(query, doc, function (err) {
        //     if(err){
        //         console.log(err);
        //     }
            
        // });
    });
});

// cvr.on('deleted', function (change) {
//     var query = this.config.queries.delete;
//     this.mysql.query(query, change.id); 
// });


// cvr.on('updated', function (change) {
//     console.log('actualizando');
//     var self = this;
//     var query = this.config.queries.update;
//     this.database.get(change.id, function (err, res) {
//         if (err) throw err;
//         // console.log(JSON.stringify(res));
//         //Aca esta la magia modificar doc para lo que se necesario.
//          var doc = { foto : res.title,idFotos : res._id };
         
//          self.mysql.query(query, doc,function (err) {
//              if (err) throw err;
//         });
//     });
// });
