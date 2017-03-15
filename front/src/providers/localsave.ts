import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import PouchDB from 'pouchdb';
import { Storage } from '@ionic/storage';

declare var google;
var db;
var geocoder = new google.maps.Geocoder;

@Injectable()
export class Localsave {

  
  remote: any;
  data: any;
  idUsuario:any;


  constructor(public http: Http,public storage: Storage) {
     db = new PouchDB('proyectofinal'); 
    this.storage.get('idUsuario').then((value) => {
      this.idUsuario = value;
     
      this.remote = 'http://rickybruno.sytes.net:5984/proyectofinal';

      let options = {
      live: true,
      retry: true,
      continuous: true
      };

      db.replicate.to(this.remote, options).on('paused', (err) =>{
        console.log('paused');
        if (err) {
          console.log(`No connection! ${err}`);
        }
        // replication was paused, usually because of a lost connection
      }).on('change', (change)=>{
        console.log('cambio detectado');
        this.geoInvImgMap(change);
      }).on('active', (info)=>{
        console.log('volvi perras');
      }).on('error', (err)=>{
        console.log('todo roto');
      });

      db.replicate.from(this.remote, {
        live: true,
        retry: true,
        continuous: true,
        doc_ids: [this.idUsuario]
      });

    });
    
  }
 
 public geoInvImgMap(change){

//    mapstrings = ['mapstring1', 'mapstring2', 'mapstring3'];

// geocoder.getLatLng(mapstrings.shift(), function lambda(point) {
//    if(point) {
//         // success
//         map.setCenter(point, 13);
//         map.setZoom(7);
//         map.addOverlay(new GMarker(point));
//     }
//     else if(mapstrings.length > 0) {
//         // Previous mapstring failed... try next mapstring
//         geocoder.getLatLng(mapstrings.shift(), lambda);
//     }
//     else {
//         // Take special action if no mapstring succeeds?
//     }
// })
    let i=0;
    let hayQuePedirAlgo = 0;
    for(let reg of change.docs[0].registros){
      if(reg.ciudad === null){
        this.geocodeLatLng(reg.latitud,reg.longitud,function(resultado){
          let ciudad = resultado[0].long_name;
          let provinica = resultado[2].long_name;
          let pais = resultado[3].long_name;
          change.docs[0].registros[i].ciudad = ciudad;
          change.docs[0].registros[i].provinica = provinica;
          change.docs[0].registros[i].pais = pais;
          hayQuePedirAlgo++;
        });
      }
      i++;
    }
    if(hayQuePedirAlgo != 0){
        db.put(change.docs[0]).then(function () {
          console.log('listo');
        }).catch(function (err) {
          console.log(err);
          // error (not a 404 or 409)
        });
    }
 }

 public geocodeLatLng(latitud,longitud,fn) {
  var latlng = {lat: latitud, lng: longitud};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        fn(results[1].address_components);
      } else {
        console.log('No results found');
      }
    } else {
     console.log('Geocoder failed due to: ' + status);
    }
  });
}

  public noExiste(id,fn){
    db.get(id).then(function (configDoc) {
        fn(configDoc);
      }).catch(function (err) {
          fn('1');
      });
  }

  public myDeltaFunction(doc) {
    return doc;
  }


  public crear(fotoPaisaje,fotoMuestra,patudos,elmidos,plecopteros,tricopteros,latitud,longitud,observaciones){

      var fecha = new Date();
      var id = this.idUsuario;
      var doc = {
        "_id": id,
        "registros":[], 
      };
      var registro = {
        "_attachments": {
            'fotoPaisaje.png': {
              content_type: 'image/png',
              data: fotoPaisaje
            },
            'fotoMuestra.png': {
              content_type: 'image/png',
              data: fotoMuestra
            },
          },
        "patudos":patudos,
        "elmidos":elmidos,
        "plecopteros":plecopteros,
        "tricopteros":tricopteros,
        "latitud":latitud,
        "longitud":longitud,
        "observaciones":observaciones,
        "fecha":fecha,
        "ciudad":null,
        "provincia":null,
        "pais":null,
      };


      this.noExiste(doc._id,function(noTa){
          if(noTa === '1'){
            doc.registros.push(registro);
            db.put(doc).then(function (response) {
              console.log(JSON.stringify(response));
            }).catch(function (err) {
              console.log(err);
            });
          }
          else{
            console.log('intentado acualizar');
            noTa.registros.push(registro);
            db.put(noTa).then(function () {
              console.log('listo');
            }).catch(function (err) {
              console.log(err);
              // error (not a 404 or 409)
            });
          }
      });
  
        

  // "_attachments": {},
    // for(let pic of pics){
    //   doc._attachments['foto'+i+'.png']={content_type: 'image/png',data:pic};
    //   i++;
    // }
  }


 
  

  public getTodos(){
  return new Promise (resolve => {
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      var docs = result.rows.map(function (row) { return row.doc; });  
      resolve(docs)
    }).catch(function (err) {
      console.log(err);
    });
  });
}

  public destruirDB(){
    db.destroy().then(function () {
      console.log('DB Hecha Mierda');
    }).catch(function (err) {
      console.log('No se pudo Romper');
    })
  }
}
