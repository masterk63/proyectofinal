import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import PouchDB from 'pouchdb';



@Injectable()
export class Localsave {

  db: any;
  remote: any;
  data: any;

  constructor(public http: Http) {
    this.db = new PouchDB('proyectofinal');
    this.remote = 'http://192.168.1.12:5984/proyectofinal';
 
    let options = {
      live: true,
      retry: true,
      continuous: true
    };
 
    this.db.sync(this.remote, options);
  }
 
  public crear(fotoPaisaje,fotoMuestra,patudos,elmidos,plecopteros,tricopteros,latitud,longitud,observaciones){
    var id = new Date().toISOString();
    var i = 1;
    var doc = {
      "_id": id,
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
      "observaciones":observaciones
    };

  
    this.db.put(doc).then(function (response) {
      console.log(JSON.stringify(response));
    }).catch(function (err) {
      console.log(err);
    });

  // "_attachments": {},
    // for(let pic of pics){
    //   doc._attachments['foto'+i+'.png']={content_type: 'image/png',data:pic};
    //   i++;
    // }
  }


 
  

  public getTodos(){
  return new Promise (resolve => {
    this.db.allDocs({
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
    this.db.destroy().then(function () {
      console.log('DB Hecha Mierda');
    }).catch(function (err) {
      console.log('No se pudo Romper');
    })
  }
}
