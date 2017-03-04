import { Component, ViewChild, ElementRef } from '@angular/core';
//ActionSheetController menu de opciones nativas.
//ToastController modal nativo
import { ModalController, ViewController, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Mapjshtml } from '../pages/mapajshtml/mapajshtml';
import { ModalPage } from '../modal/modal';
import { Camara } from '../../providers/camara';
import { Localsave } from '../../providers/localsave';

@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
})

export class HomePage {
    imagenes = [];
    listaFotos = [];
    listaFotosbase64 = [];
    fotoPaisaje:any;
    fotoMuestra:any;
    listaDBlocal:any;
    imagenenBase64 = '';

    constructor(public navCtrl: NavController, 
                public actionSheetCtrl: ActionSheetController, 
                public toastCtrl: ToastController, 
                public platform: Platform, 
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                public camaraCtrl:Camara,
                public localSaveCtrl:Localsave
                ){
                    // this.localSaveCtrl.getTodos().then((data) => {
                    //     this.listaDBlocal = data;
                    //     //console.log(JSON.stringify(this.listaDBlocal));
                    //     // for(let i of this.listaDBlocal){
                    //     //             for(var j=0;j<Object.keys(i._attachments).length;j++){
                    //     //                 //console.log(i._attachments['meowth'+j+'.png'].data);
                    //     //                 this.listaFotosbase64.push(i._attachments['foto'+(j+1)+'.png'].data);
                    //     //             }        
                    //     // }
                        
                    // });

                    
                    // if(this.platform.is('android') || this.platform.is('ios')){
                    //     this.imagenes = [{src: '../www/assets/img/1.jpg'},{src: '../www/assets/img/2.jpg'}];
                    // }else{
                    //     this.imagenes = [{src: '../assets/img/1.jpg'},{src: '../assets/img/2.jpg'}];
                    // }
                }


    ionViewDidLoad() {
        // this.camaraCtrl.getPics64().subscribe((data) => {
        //     this.listaFotosbase64 = data;
        // });
    }

    openModal(pics,i) {
        let modal = this.modalCtrl.create(ModalPage, {foto: pics,index: i});
        modal.present();
    }

   takefotoPaisaje(){
       this.camaraCtrl.takePicture64().then(data => this.fotoPaisaje = data); 
   }

    takefotoMuestra(){
       this.camaraCtrl.takePicture64().then(data => this.fotoMuestra = data);
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
                        //this.camaraCtrl.takePicture64();
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
}