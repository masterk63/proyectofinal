import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import PouchDB from 'pouchdb';
import { Storage } from '@ionic/storage';


//Variable global de Google definida en su js
declare var google;
var geocoder = new google.maps.Geocoder;
//Variable global para nuestros metodos
var db;
var registrosLocales;
declare var navigator: any;
declare var Connection: any;

//Convertir imagenURL de internet a base64
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

//funcion que se define en una variable porque, de esa manera
// puedo llamarlo recursivamente. (registros,tam,hayQuePedirAlgo,fn)
// fn, es una funcion de callBack, donde la uso para devolver un 
//parametro asincronico
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


//Obitne Fotos de los mapas con google Statics Maps 
// uso tambien fn callBack
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

function manejarElCambio(change){
 
  let changedDoc = null;
  let changedIndex = null;
 
  registrosLocales.forEach((doc, index) => {
 
    if(doc._id === change.id){
      changedDoc = doc;
      changedIndex = index;
    }
 
  });
 
  //A document was deleted
  if(change.deleted){
    registrosLocales.splice(changedIndex, 1);
  } 
  else {
 
    //A document was updated
    if(changedDoc){
      registrosLocales[changedIndex] = change.doc;
    } 
 
    //A document was added
    else {
      registrosLocales.push(change.doc); 
    }
 
  }
 
}


@Injectable()
export class Localsave {
  remote: any;
  idUsuario:any;
  public entrar = true;

  constructor(public http: Http,
              public storage: Storage) {
    this.init();   
  }


  public comprobarConexion(){
    // Como navigator.connection es nativo, no anda para browser,
    // Pero lo necesito para saber si puedo hacer la consulta en el navegador,
    // Por lo que lo encierro en un try catch, si da error seguramente esta en un navegador
    // y por ende tiene internet.
        try{
            var networkState = navigator.connection.type;
            if (networkState !== Connection.NONE) {
              console.log('HAY conexion');
               return true;
            }else{
              console.log('no hay conexion');
              return false;
            }
        }catch(Exception){
            return true;
        }   
  }

  // No defino esto en el constructor porque necesito instancialo
  // antes, en otra clase.
  init(){
    db = new PouchDB('proyectofinal');
    this.storage.get('idUsuario').then((value) => {
      this.idUsuario = value.toString();

      this.remote = 'http://rickybruno.sytes.net:5984/proyectofinal';

      let options = {
      live: true,
      retry: true,
      continuous: true
      };

      //obtengo todo los eventos de la base de datos
      db.replicate.to(this.remote, options).on('paused', (err) =>{
        console.log('paused');
        if (err) {
          console.log(`No connection! ${err}`);
        }
        // replication was paused, usually because of a lost connection
      }).on('change', (change)=>{
        console.log('cambio detectado');
        //this.geoInvImgMap(change);
      }).on('active', (info)=>{
          console.log('volvi perras');
          this.controlarRegistros();
      }).on('error', (err)=>{
        console.log('todo roto');
      });

      db.replicate.from(this.remote, {
        live: true,
        retry: true,
        continuous: true});
    });
}

public controlarRegistros(){
  if(this.comprobarConexion()){
      for(let r of registrosLocales){
        if(r.ciudad === null){
            db.get(r._id).then(function(doc) {
              console.log('registro a actualizar',doc)
              doc.ciudad = 'hola';
              return db.put(doc);
            }).then(function(response) {
                console.log('actualizado',response)
            }).catch(function (err) {
              console.log(err);
            });
        }
      }
  }
}


// Cada vez que dectecta un cambo se llama a esta funcion
public geoInvImgMap(change){
  let tam = change.docs[0].registros.length;
  tam = tam -1 ;
  let hayQuePedirAlgo = 0;
  let registros = change.docs[0].registros;
  obtenerDireccion(registros,tam,hayQuePedirAlgo,function(respuesta){
      // En respuesta[1] esta la varialbe 'hayQuePedirAlgo'
      // que me dice si tengo que entrar a recorrer la segunda funcion
      // evita lopps infinitos.
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

 
// Se fija si el registro existe, si no existe lo crea
// si existe, lo devuelve, de esa manera se actualiza
public noExiste(id,fn){
  db.get(id).then(function (configDoc) {
      fn(configDoc);
    }).catch(function (err) {
        fn('1');
    });
}

  // Crear un nuevo  registro
  public crear(fotoPaisaje,fotoMuestra,patudos,elmidos,plecopteros,tricopteros,latitud,longitud,observaciones){
    return new Promise((resolve, reject) => {
      var indice = this.calcularIndice(patudos,elmidos,plecopteros,tricopteros);
      var fecha = new Date();
      var id = this.idUsuario;
      db.put({
          _id: Date.now().toString(),
          _attachments: {
            'fotoPaisaje.png': {
              content_type: 'image/png',
              data: fotoPaisaje
            },
            'fotoMuestra.png': {
              content_type: 'image/png',
              data: fotoMuestra
            }
          },
          idUsuario:id,
          patudos:patudos,
          elmidos:elmidos,
          plecopteros:plecopteros,
          tricopteros:tricopteros,
          latitud:latitud,
          longitud:longitud,
          observaciones:observaciones,
          fecha:fecha,
          ciudad:null,
          provincia:null,
          pais:null,
          indice:indice
        }).then(function (response) {
            console.log(JSON.stringify(response));
            db.compact().then(function (info) {
            }).catch(function (err) {
              console.log(err);
            });
            resolve(1);
          }).catch(function (err) {
            console.log(err);
            resolve(err);
        });
    });
  }

  public calcularIndice(patudos,elmidos,plecopteros,tricopteros){
    let i = 0;
    if(patudos === 'si'){
      i++;
    }
    if(elmidos === 'si'){
      i++;
    }
    if(plecopteros === 'si'){
      i++;
    }
    if(tricopteros === 'si'){
      i++;
    }
    return i;
  }



  //Obtener los registros de la base de datos Locales
  public getTodos(){

    //Si ya se consulto se devuelve, sin consultar nuevamente la base 
    // de datos
    // if (registrosLocales) {
    //   this.registrosObersables = new Observable(observer => {
    //     observer.next(registrosLocales);
    //   });
    // }

    // Consulte la base de Datos
  return Observable.create(observer => { 
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      registrosLocales= [];
      let docs = result.rows.map((row) => {
        registrosLocales.push(row.doc);
      });
      console.log('llamados desde la bd',registrosLocales);
      if(registrosLocales.length != 0){
        registrosLocales.sort(function(a,b) { //La funcion sort ordena numeros, si quiero de menor a mayor a es 'a-b', si quiero de mayo a menor b-a
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime() 
        });
        observer.next(registrosLocales);
      }
      db.changes({live: true, since: 'now', include_docs: true,attachments: true}).on('change', (change) => {
        manejarElCambio(change);
        registrosLocales.sort(function(a,b) { 
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime() 
        });
        observer.next(registrosLocales);
      });
    }).catch(function (err) {
      console.log(err);
    });
  });
}




  // Destruye la base datos, y limpia el array de registrosLocales
  public destruirDB(){
    db.destroy().then(function () {
      console.log('DB Hecha Mierda');
      registrosLocales = null;
    }).catch(function (err) {
      console.log('No se pudo Romper');
    })
  }

  
}
