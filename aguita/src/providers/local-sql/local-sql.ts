import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import { Events } from 'ionic-angular';
import { SocketProvider } from '../../providers/socket/socket';
import * as configServer from '../../server'

@Injectable()
export class LocalSqlProvider {
  db: SQLiteObject = null;

  constructor(public http: Http,
    public socketPrv: SocketProvider,
    public events: Events,
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
    let sql = `CREATE TABLE IF NOT EXISTS tasks
    (idRegistro INTEGER PRIMARY KEY AUTOINCREMENT, 
      indice int(11) NOT NULL,
      fecha timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      latitud float NOT NULL,
      longitud float NOT NULL,
      latitudFoto float NOT NULL,
      longitudFoto float NOT NULL,
      fotoPaisaje longblob NOT NULL,
      fotoMuestra longblob NOT NULL,
      fotoMapa longblob NOT NULL,
      observacion text,
      elmido varchar(2),
      patudo varchar(2),
      plecoptero varchar(2),
      tricoptero varchar(2),
      idUsuario int(11) NOT NULL)`;
    return this.db.executeSql(sql, []);
  }

  async getAll() {
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
    let sql = 'INSERT INTO tasks(indice, fecha, latitud, longitud, latitudFoto, longitudFoto, fotoPaisaje,fotoMuestra, fotoMapa, observacion, elmido, patudo, plecoptero, tricoptero, idUsuario) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    return this.db.executeSql(sql, [task.indice, task.fecha, task.latitud, task.longitud, task.latitudFoto, task.longitudFoto, task.fotoPaisaje, task.fotoMuestra, task.fotoMapa, task.observacion, task.elmidos, task.patudos, task.plecopteros, task.tricopteros, task.idUsuario]).then(res => {
      console.log('registro agregado con exito')
      return Promise.resolve(res);
    }).catch(error => Promise.reject(error));
  }

  update(task: any) {
    let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

  delete(reg: any) {
    let sql = 'DELETE FROM tasks WHERE idRegistro=?';
    this.db.executeSql(sql, [reg.idRegistro]).then((regEliminado) => {
      console.log('Registro eliminado exitosamente.')
      this.events.publish('registro:eliminado', reg, Date.now());
      reg.idRegistro = reg.idRegistroOnline;
      delete reg.fotoMuestra;
      delete reg.fotoPaisaje;
      setTimeout(() => {
        this.socketPrv.publicar(reg);
      }, 1000);
    });
  }

  dame(id) {
    let sql = 'SELECT * FROM tasks WHERE idRegistro ==' + id;
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

  public sincronizarDB() {
    return new Promise((resolve: any, reject) => {
      this.http.get(configServer.data.urlServidor + '/api/sincronizarDB')
        .map(res => res.json())
        .subscribe(data => {
          console.log('respuesta sincronizacion', data)
          this.eliminarTablaUsuarios().then(() => {
            this.crearTablaUsuarios()
              .then(() => {
                this.insertarUsuarios(data)
                  .then(() => {
                    resolve("ok");
                  });
              });
          })
            .catch((err) => reject(err))
        }, (err) => {
          reject(err);
        });
    });
  }

  eliminarTablaUsuarios() {
    console.log("eliminartabla")
    return this.db.executeSql(`DROP TABLE IF EXISTS usuarios;`, [])
      .then((res) => { console.log("res eliminar", res); return Promise.resolve() })
  }

  crearTablaUsuarios() {
    let sql = `CREATE TABLE usuarios
      (idUsuario INTEGER PRIMARY KEY, 
        usuario varchar(150),
        contrasenia varchar(250))`;
    return this.db.executeSql(sql, [])
      .then(res => { console.log("res crear tabka", res); return Promise.resolve() })
  }

  insertarUsuarios(usuarios) {
    let arrayUsuarios = new Array();
    for (let usuario of usuarios) {
      arrayUsuarios.push(['INSERT INTO usuarios (idUsuario,usuario,contrasenia) VALUES (?,?,?)', [usuario.idUsuario, usuario.usuario, usuario.contrasenia]])
    }
    return this.db.sqlBatch(arrayUsuarios)
      .then(() => { return Promise.resolve() })
  }

  listarUsuarios() {
    return this.db.executeSql('SELECT * FROM usuarios', [])
      .then((res) => {
        let usuarios = [];
        for (let index = 0; index < res.rows.length; index++) {
          usuarios.push(res.rows.item(index));
        }
        console.log("lista de usuarios", usuarios);
        return Promise.resolve(usuarios);
      })
  }

  fakeRegistro() {
    return Observable.create(observer => {
      let sql = 'INSERT INTO tasks(indice, fecha, latitud, longitud,fotoPaisaje,fotoMuestra,fotoMapa, observacion, elmido, patudo, plecoptero, tricoptero, idUsuario) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
      this.db.executeSql(sql, [3, '2017/12/25', -26.81, -65.25, -26.81, -65.25, 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'hola', 'si', 'si', 'si', 'si', 2]).then(res => {
        console.log('registro agregado con exito')
        this.dame(res.insertId).then((reg) => {
          observer.next(reg);
        })
      }).catch(error => observer.next(error));
    });
  }



}