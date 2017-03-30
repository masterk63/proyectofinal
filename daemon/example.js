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

function foto2(self,change,fotoMuestra,fn){
    self.database.attachment.get(change.id, "fotoPaisaje.png", function(err, body) {
        if (err) throw err;
        fn(body.toString('base64'));
    });
}
cvr.on('regCreado', function (change) {
    console.log("reg creado");
    console.log(change);
});

cvr.on('regActualizado', function (change) {
    console.log("reg actualizado");
    console.log(change);
});

cvr.on('usrCreado', function (change) {
    console.log("Usuario creado");
    console.log(change);
    var self = this;
    self.databaseUsuarios.get(change.id, function (err, res) {
        if (err) throw err;
        console.log(res); 
        var idUsuario='"'+res._id+'"';
        var mail='"'+res.mail+'"';
        var usuario='"'+res.usuario+'"';
        var contrasenia='"'+res.contrasenia+'"';
        var nombre='"'+res.nombre+'"';
        var apellido='"'+res.apellido+'"';
        var institucion='"'+res.institucion+'"';
        var grado='"'+res.grado+'"';
        var residencia='"'+res.residencia+'"';
        self.mysql.query('CALL usuario_nuevo('+idUsuario+','+mail+','+usuario+','+contrasenia+','+nombre+','+apellido+','+institucion+','+grado+','+residencia+')',function(err,rows) {
            if(err){
                console.log(err);
            } 
        });
    });

});

cvr.on('usrActualizado', function (change) {
    console.log("Usuario actualizado");
    console.log(change);
});

cvr.on('updated', function (change) {
    console.log('Registros');
    var self = this;
    var query = this.config.queries.insert;
    console.log(change);
    // self.database.get(change.id, function (err, res) {
    //     if (err) throw err;
    //     console.log(res);
    // });

    
    // foto1(self,change,function(fotoMuestrabd){
    //     foto2(self,change,fotoMuestrabd,function(fotoPaisajebd){
    //         self.database.get(change.id, function (err, res) {
    //         if (err) throw err;
            
    //         //Aca esta la magia modificar doc para lo que se necesario.
    //         // var doc = { 
    //         //     fecha : '2017-03-08 16:25:25',
    //         //     latitud: 65.4545,
    //         //     longitud:-55.24,
    //         //     fotoPaisaje: fotoPaisajebd,
    //         //     fotoMuestra: fotoMuestrabd,
    //         //     observacion: 'test de comentario',
    //         //     ciudad:'San M',
    //         //     provincia:'Tucuman',
    //         //     pais : 'Argentina',
    //         // };


    //         var fecha='"'+res.fecha+'"';
    //         var latitud=res.latitud;
    //         var longitud=res.longitud;
    //         var fotoPaisajeConcat='"'+fotoPaisajebd+'"';
    //         var fotoMuestraConcat='"'+fotoMuestrabd+'"';
    //         var observaciones='"'+res.observaciones+'"';
    //         var idUsuario=1;
    //         var ciudad='"san miguel de tucuman"';
    //         var provincia='"Tucuman"';
    //         var pais='"Argentina"';
    //         var elmidos='"'+res.elmidos+'"';
    //         var patudos='"'+res.patudos+'"';
    //         var plecopteros='"'+res.plecopteros+'"';
    //         var tricopteros='"'+res.tricopteros+'"';
            

    //         self.mysql.query('CALL registro_nuevo_completo('+fecha+','+latitud+','+longitud+','+fotoPaisajeConcat+','+fotoMuestraConcat+','+observaciones+','+idUsuario+','+ciudad+','+provincia+','+pais+','+elmidos+','+patudos+','+plecopteros+','+tricopteros+')',function(err,rows) {
    //             if(err){
    //                 console.log(err);
    //             } 
    //         });
    //         // self.mysql.query(query, doc, function (err) {
    //         //     if(err){
    //         //         console.log(err);
    //         //     }
                
    //         // });
    // });
    //     });
    // });
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
