import { Component, ViewChild, ElementRef } from '@angular/core';
//ActionSheetController menu de opciones nativas.
//ToastController modal nativo
import { ModalController, ViewController, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Mapjshtml } from '../pages/mapajshtml/mapajshtml';
import { ModalPage } from '../modal/modal';
import { Camara } from '../../providers/camara';
import { Localsave } from '../../providers/localsave';

var base64Temp = '';

@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
})

export class HomePage {
    imagenes = [];
    listaFotos = [];
    todo = "hola";
    listaDBlocal:any;
    public imagenenBase64: string;


    constructor(public navCtrl: NavController, 
                public actionSheetCtrl: ActionSheetController, 
                public toastCtrl: ToastController, 
                public platform: Platform, 
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                public camaraCtrl:Camara,
                public localSaveCtrl:Localsave
                ){
                    this.localSaveCtrl.getTodos().then((data) => {
                        this.listaDBlocal = data;
                    });

                    

                    if(this.platform.is('android') || this.platform.is('ios')){
                        this.imagenes = [{
                        src: '../www/assets/img/1.jpg'
                    },{
                        src: '../www/assets/img/2.jpg'
                    },{
                        src: '../www/assets/img/1.jpg'
                    },{
                        src: '../www/assets/img/2.jpg'
                    },{
                        src: '../www/assets/img/1.jpg'
                    },{
                        src: '../www/assets/img/2.jpg'
                    },{
                        src: '../www/assets/img/1.jpg'
                    },{
                        src: '../www/assets/img/2.jpg'
                    },];
                        
                    }else{
                        this.imagenes = [{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/2.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/2.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/2.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/2.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    }];
                    }
                }


    ionViewDidLoad() {
    //Zone Run Refresaca la pagina
        this.camaraCtrl.getFotos().subscribe((data) => {
        this.listaFotos = data;
        });
    }

    openModal(pics,i) {
        let pathOfPics = [];
        for (let p of pics) {
            pathOfPics.push(this.camaraCtrl.pathForImage(p));
        }
        let modal = this.modalCtrl.create(ModalPage, {foto: pathOfPics,index: i});
        modal.present();
    }
        
  
   public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Subir Imagen desde',
            buttons: [
                {
                    text: 'Libreria',
                    handler: () => {
                        this.camaraCtrl.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Camara',
                    handler: () => {
                        this.camaraCtrl.takePicture(Camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }

 toDataUrl(url, callback) {
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

getConvertion(){
    this.toDataUrl('../assets/img/1.jpg', function(base64Img) {
        base64Temp = base64Img;
    });
    this.imagenenBase64 = base64Temp;
    console.log(this.imagenenBase64);
}

 
}