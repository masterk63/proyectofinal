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
 
  public crear(){
    var id = new Date().toISOString();
    this.db.put({
      _id: id,
      title: 'fotosMuestra',
    }).then(function (response) {
     
    }).catch(function (err) {
      console.log(err);
    });
    return id;
  }

  public agregarImagenes(){
    
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
