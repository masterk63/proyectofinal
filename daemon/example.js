var converter = require('./');
var cvr = converter();
cvr.connect();
//var fotoPaisaje;

// function foto1(self,change,fn){
//     self.database.attachment.get(change.id, "fotoMuestra.png", function(err, body) {
//         if (err) throw err;
//         fn(body.toString('base64'));
//     });
// }

// function foto2(self,change,fotoMuestra,fn){
//     self.database.attachment.get(change.id, "fotoPaisaje.png", function(err, body) {
//         if (err) throw err;
//         fn(body.toString('base64'));
//     });
// }



cvr.on('usrCreado', function (change) {
    // console.log("Usuario creado");
    // console.log(change);
    // var self = this;
    // self.databaseUsuarios.get(change.id, function (err, res) {
    //     if (err) throw err;
    //     console.log(res); 
    //     var idUsuario='"'+res._id+'"';
    //     var mail='"'+res.mail+'"';
    //     var username='"'+res.username+'"';
    //     var password='"'+res.password+'"';
    //     var nombre='"'+res.nombre+'"';
    //     var apellido='"'+res.apellido+'"';
    //     var institucion='"'+res.institucion+'"';
    //     var grado='"'+res.grado+'"';
    //     var residencia='"'+res.residencia+'"';
    //     self.mysql.query('CALL usuario_nuevo('+idUsuario+','+mail+','+username+','+password+','+nombre+','+apellido+','+institucion+','+grado+','+residencia+')',function(err,rows) {
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log(rows); 
    //     });
    // });

});

cvr.on('usrActualizado', function (change) {
    console.log("Usuario actualizado");
    console.log(change);
});


//CHANGE solo tiene el id y la rev del documento en cuestion
cvr.on('regCreadoOActualizado', function (change) {
    console.log("reg creado");
    console.log(change);
    var self = this;
    self.databaseRegistros.get(change.id,{attachments: true},function (err, res) {
        console.log(res);
        var indice= parseInt(res.indice);
        var fecha='"'+res.fecha+'"';
        var latitud=res.latitud;
        var longitud=res.longitud;
        var fotoPaisajeConcat='"'+res._attachments["fotoPaisaje.png"].data+'"';
        var fotoMuestraConcat='"'+res._attachments["fotoMuestra.png"].data+'"';
        var fotoMapaConcat='"'+res._attachments["fotoMapa.png"].data+'"';
        var observaciones='"'+res.observaciones+'"';
        var idUsuario=parseInt(res.idUsuario);
        var ciudad='"'+res.ciudad+'"';
        var provincia='"'+res.provincia+'"';
        var pais='"'+res.pais+'"';
        var elmidos='"'+res.elmidos+'"';
        var patudos='"'+res.patudos+'"';
        var plecopteros='"'+res.plecopteros+'"';
        var tricopteros='"'+res.tricopteros+'"';
        
        self.mysql.query('CALL registro_nuevo_completo('+indice+','+fecha+','+latitud+','+longitud+','+fotoPaisajeConcat+','+fotoMuestraConcat+','+fotoMapaConcat+','+observaciones+','+idUsuario+','+ciudad+','+provincia+','+pais+','+elmidos+','+patudos+','+plecopteros+','+tricopteros+')',function(err,rows) {
            if(err){
                console.log(err);
            }
            console.log(rows); 
        });
    });
});

cvr.on('regActualizado', function (change) {
    console.log('Registros');
    console.log(change);
    // var self = this;
    // var query = this.config.queries.insert;
    // console.log(change);
    // self.databaseRegistros.get(change.id, function (err, res) {
    //     if (err) throw err;
    //     if(res.registros[res.registros.length-1].pais === '' || res.registros[res.registros.length-1].pais === null){
    //         console.log("no tiene localizacion inversa");
    //     }else{
    //         console.log("ya hay localizacion, ingresando a MYSQL")
    //         self.mysql.query('SELECT COUNT(*) AS cantidad FROM registros WHERE idUsuario="'+parseInt(res._id)+'"',function(err,fila) {
    //             if(err){
    //                 console.log(err);
    //             }
    //             var indec = fila[0].cantidad;//desde el indec empezamos a agregar a mysql
    //             for(indec;indec<res.registros.length;indec++){
    //                 var indice= parseInt(res.registros[indec].indice);
    //                 console.log(indice);
    //                 var fecha='"'+res.registros[indec].fecha+'"';
    //                 var latitud=res.registros[indec].latitud;
    //                 var longitud=res.registros[indec].longitud;
    //                 var fotoPaisajeConcat='"'+res.registros[indec]._attachments["fotoPaisaje.png"].data+'"';
    //                 var fotoMuestraConcat='"'+res.registros[indec]._attachments["fotoMuestra.png"].data+'"';
    //                 var fotoMapaConcat='"'+res.registros[indec]._attachments["fotoMapa.png"].data+'"';
    //                 var observaciones='"'+res.registros[indec].observaciones+'"';
    //                 var idUsuario='"'+res._id+'"';
    //                 var ciudad='"'+res.registros[indec].ciudad+'"';
    //                 var provincia='"'+res.registros[indec].provincia+'"';
    //                 var pais='"'+res.registros[indec].pais+'"';
    //                 var elmidos='"'+res.registros[indec].elmidos+'"';
    //                 var patudos='"'+res.registros[indec].patudos+'"';
    //                 var plecopteros='"'+res.registros[indec].plecopteros+'"';
    //                 var tricopteros='"'+res.registros[indec].tricopteros+'"';
                    
    //                 self.mysql.query('CALL registro_nuevo_completo('+indice+','+fecha+','+latitud+','+longitud+','+fotoPaisajeConcat+','+fotoMuestraConcat+','+fotoMapaConcat+','+observaciones+','+idUsuario+','+ciudad+','+provincia+','+pais+','+elmidos+','+patudos+','+plecopteros+','+tricopteros+')',function(err,rows) {
    //                     if(err){
    //                         console.log(err);
    //                     }
    //                     console.log(rows); 
    //                 });
    //             }
    //         });
    //     }
        
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

