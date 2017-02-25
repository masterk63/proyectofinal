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

  }
 
  public crear(pics){
    var id = new Date().toISOString();
    var i = 1;
    var doc = {
      "_id": id,
      "_attachments": {},
      "title": 'fotosMuestra',
    };
    for(let pic of pics){
      doc._attachments['foto'+i+'.png']={content_type: 'image/png',data:pic};
      i++;
    }
    this.db.put(doc).then(function (response) {
      console.log(JSON.stringify(response));
    }).catch(function (err) {
      console.log(err);
    });

//console.log(JSON.stringify(arrayFotos[0]));
      // this.db.putAttachment(id, 'myattachment.png', fotos[0], 'image/png');
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
