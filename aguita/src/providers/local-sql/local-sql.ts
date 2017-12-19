import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class LocalSqlProvider {
  db: SQLiteObject = null;

  constructor(public http: Http,
    private sqlite: SQLite) {
  }

  public createDatabase() {
    this.sqlite.create({
      name: 'local.db',
      location: 'default'
    }).then((db) => {
      this.setDatabase(db);
      this.createTable();
    }).catch(error => {
      console.log(error);
    });
  }

  setDatabase(db: SQLiteObject) {
    if (this.db === null) {
      this.db = db;
    }
  }

  public destruirDB() {
    this.sqlite.deleteDatabase({
      name: 'local.db',
      location: 'default'
    }).then((db) => {
      console.log(db)
    }).catch(error => {
      console.log(error);
    });
  }

  createTable() {
    console.log('creadnod tabla')
    let sql = `CREATE TABLE IF NOT EXISTS tasks
    (idRegistro INTEGER PRIMARY KEY AUTOINCREMENT, 
    indice int(11) NOT NULL,
    fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    latitud float NOT NULL,
    longitud float NOT NULL,
    fotoPaisaje longblob NOT NULL,
    fotoMuestra longblob NOT NULL,
    observacion text,
    elmido varchar(2),
    patudo varchar(2),
    plecoptero varchar(2),
    tricoptero varchar(2),
    idUsuario int(11) NOT NULL)`;
    return this.db.executeSql(sql, []);
  }

  getAll() {
    let sql = 'SELECT * FROM tasks';
    return this.db.executeSql(sql, [])
      .then(response => {
        let tasks = [];
        for (let index = 0; index < response.rows.length; index++) {
          tasks.push(response.rows.item(index));
        }
        return Promise.resolve(tasks);
      })
      .catch(error => Promise.reject(error));
  }

  create(task: any) {
    let sql = 'INSERT INTO tasks(indice, fecha, latitud, longitud,fotoPaisaje,fotoMuestra, observacion, elmido, patudo, plecoptero, tricoptero, idUsuario) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
    this.db.executeSql(sql, [task.indice, task.fecha,task.latitud,task.longitud,task.fotoPaisaje,task.fotoMuestra,task.observacion,task.elmido,task.patudo,task.plecoptero,task.tricoptero,task.idUsuario]);
    console.log('registro agregado con exito')
  }

  update(task: any) {
    let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

  delete(task: any) {
    let sql = 'DELETE FROM tasks WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }

}
