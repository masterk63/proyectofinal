import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import PouchDB from 'pouchdb';
import { Storage } from '@ionic/storage';

declare var google;
var db;
var geocoder = new google.maps.Geocoder;
var registrosLocales;

function imgURLtoBase64(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

var obtenerDireccion = function (registros,tam,hayQuePedirAlgo,fn) {
  if(tam < 0){
    let respuesta=[registros,hayQuePedirAlgo];
    fn(respuesta);
  }else{
    if(registros[tam].ciudad === null){
       var latlng = {lat: registros[tam].latitud, lng: registros[tam].longitud};
       geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            let resultado = results[1].address_components;
            let ciudad = resultado[0].long_name;
            let provinica = resultado[2].long_name;
            let pais = resultado[3].long_name;
            registros[tam].ciudad = ciudad;
            registros[tam].provincia = provinica;
            registros[tam].pais = pais;
            console.log(results[1].formatted_address);
          } else {
            console.log('No results found');
          }
        } else {
        console.log('Geocoder failed due to: ' + status);
      }
        return obtenerDireccion(registros,tam-1,hayQuePedirAlgo+1,fn);
      });
      
    }else{
      return obtenerDireccion(registros,tam-1,hayQuePedirAlgo,fn);
    }
  }
}


var obtenerFotoMapa = function (registros,tam,fn) {
   if(tam < 0){
    fn(registros);
   }else{
      if(registros[tam]._attachments['fotoMapa.png'].data === null){
        let position = registros[tam].latitud+','+registros[tam].longitud;
        let mapaURL = 'https://maps.googleapis.com/maps/api/staticmap?center='+position+'&zoom=16&size=640x400&markers=color:red%7Clabel:%7C'+position+'&key=AIzaSyCmp-2Bj3yexAf_L5HN6G7TOzgIh_mKe7I';
        console.log(mapaURL);
        imgURLtoBase64(mapaURL, function(base64Img) {
          let imagenDB = base64Img.split('data:image/png;base64,');
          registros[tam]._attachments['fotoMapa.png'].data = imagenDB[1];
          return obtenerFotoMapa(registros,tam-1,fn);
        });
      }else{
        return obtenerFotoMapa(registros,tam-1,fn);
      }
   }
}
@Injectable()
export class Localsave {

  
  remote: any;
  data: any;
  idUsuario:any;
  public registrosObersables:Observable<Array<any>>;

  constructor(public http: Http,public storage: Storage) {
    this.init();
  }

  init(){
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
      }).on('change', (change)=>{
        console.log('cambio detectado desde el servidor');
       
      });
    });
}

 
 public geoInvImgMap(change){
    let tam = change.docs[0].registros.length;
    tam = tam -1 ;
    let hayQuePedirAlgo = 0;
    let registros = change.docs[0].registros;
    obtenerDireccion(registros,tam,hayQuePedirAlgo,function(respuesta){
        if(respuesta[1] != 0){
          let tam2 = respuesta[0].length;
          tam2 = tam2 -1 ;
          obtenerFotoMapa(respuesta[0],tam2,function(repuesta2){
            change.docs[0].registros = repuesta2;
            db.put(change.docs[0]).then(function () {
              console.log('registos actualizados con reverse');
            }).catch(function (err) {
              console.log(err);
              // error (not a 404 or 409)
            });
          });
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
            'fotoMapa.png': {
              content_type: 'image/png',
              data: null
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

    if (registrosLocales) {
      this.registrosObersables = new Observable(observer => {
        observer.next(registrosLocales);
      });
    }

  return Observable.create(observer => { 
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      var docs = result.rows.map(function (row) { return row.doc; }); 
      registrosLocales = docs[0].registros;
       observer.next(registrosLocales);
      db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        registrosLocales = change.doc.registros;
        observer.next(registrosLocales);
      });
    }).catch(function (err) {
      console.log(err);
    });
  });
}

  public destruirDB(){
    db.destroy().then(function () {
      console.log('DB Hecha Mierda');
      registrosLocales = null;
    }).catch(function (err) {
      console.log('No se pudo Romper');
    })
  }

}
