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
 
  public crear(todo){
    this.db.post({
      title: todo
    }).then(function (response) {
      // handle response
    }).catch(function (err) {
      console.log(err);
    });
  }
  

  public getTodos(){
  return new Promise (resolve => {
    this.db.allDocs({
      include_docs: true,
    }).then(function (result) {
      var docs = result.rows.map(function (row) { return row.doc; });  
      resolve(docs)
    }).catch(function (err) {
      console.log(err);
    });
  });
  }
}
