// import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';


// @Injectable()
// export class Todos {

//   constructor(public http: Http) {
//     console.log('Hello Todos Provider');
//   }

// }


import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
 
@Injectable()
export class Todos {
 
  data: any;
  db: any;
  remote: any;
 
  constructor() {
 
    this.db = new PouchDB('proyectofinal');
 
    this.remote = 'http://rickybruno.sytes.net:5984/proyectofinal';
 
    let options = {
      live: true,
      retry: true,
      continuous: true
    };
 
    this.db.sync(this.remote, options);
 
  }
 
  getTodos() {

     if (this.data) {
      return Promise.resolve(this.data);
    }
 
  return new Promise(resolve => {
 
    this.db.allDocs({
 
      include_docs: true
 
    }).then((result) => {
 
      this.data = [];
 
      let docs = result.rows.map((row) => {
        this.data.push(row.doc);
      });
 
      resolve(this.data);
 
      this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
        this.handleChange(change);
        console.log('cambio detectado');
         console.log(change);
      });
 
    }).catch((error) => {
 
      console.log(error);
 
    }); 
 
  });
 
  }
 
createTodo(todo){
  this.db.post(todo);
}
 
updateTodo(todo){
  this.db.put(todo).catch((err) => {
    console.log(err);
  });
}
 
deleteTodo(todo){
  this.db.remove(todo).catch((err) => {
    console.log(err);
  });
}
 
  handleChange(change){

  let changedDoc = null;
  let changedIndex = null;
 
  this.data.forEach((doc, index) => {
 
    if(doc._id === change.id){
      changedDoc = doc;
      changedIndex = index;
    }
 
  });
 
  //A document was deleted
  if(change.deleted){
    this.data.splice(changedIndex, 1);
  } 

  else {
 
    //A document was updated
    if(changedDoc){
      this.data[changedIndex] = change.doc;
    } 
 
    //A document was added
    else {
      this.data.push(change.doc); 
    }
 
  }
 
  }
 
}