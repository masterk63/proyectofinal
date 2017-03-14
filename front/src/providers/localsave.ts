import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import PouchDB from 'pouchdb';
import { Storage } from '@ionic/storage';

var db;

@Injectable()
export class Localsave {

  
  remote: any;
  data: any;
  idUsuario:any;


  constructor(public http: Http,public storage: Storage) {
     db = new PouchDB('proyectofinal'); 
    this.storage.get('idUsuario').then((value) => {
      this.idUsuario = value;
     
      this.remote = 'http://192.168.1.11:5984/proyectofinal';

      let options = {
      live: true,
      retry: true,
      continuous: true
      };

      db.replicate.to(this.remote, options);

      db.replicate.from(this.remote, {
        live: true,
        retry: true,
        continuous: true,
        doc_ids: [this.idUsuario]
      });
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
        "fecha":fecha
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
