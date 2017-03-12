import { Component, ViewChild, ElementRef } from '@angular/core';
//ActionSheetController menu de opciones nativas.
//ToastController modal nativo
import { ModalController, ViewController, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Mapjshtml } from '../pages/mapajshtml/mapajshtml';
import { ModalPage } from '../modal/modal';
import { Camara } from '../../providers/camara';
import { Ubicacion } from '../../providers/ubicacion';
import { Localsave } from '../../providers/localsave';
import { PhotoViewer } from 'ionic-native';
import { Paso2Page } from '../paso2/paso2';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';



@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
})

export class HomePage {
    imagenes = [];
    listaFotos = [];
    listaFotosbase64 = [];
    fotoPaisajeURL = 'data:image/jpeg;base64,';
    fotoPaisaje:any;
    fotoMuestra:any;
    fotoMuestraURL = 'data:image/jpeg;base64,';
    listaDBlocal:any;
    latitud:any;
    longitud:any;
    coordenadas: any;
    imagenenBase64 = '';

    constructor(public navCtrl: NavController, 
                public actionSheetCtrl: ActionSheetController, 
                public toastCtrl: ToastController, 
                public platform: Platform, 
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                public camaraCtrl:Camara,
                public authService: Auth,
                public ubicacionCtrl:Ubicacion,
                public localSaveCtrl:Localsave
                ){
                    this.ubicacion();
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

    openModal(pic) {
        let modal = this.modalCtrl.create(ModalPage, {foto: pic});
        modal.present();
    }

   takefotoPaisaje(){
       this.camaraCtrl.takePicture64().then((data) => 
       {this.fotoPaisaje = data;
       this.fotoPaisajeURL = this.fotoPaisajeURL + this.fotoPaisaje;}); 
       
   }

    takefotoMuestra(){
       this.camaraCtrl.takePicture64().then((data) => 
       {this.fotoMuestra = data;
       this.fotoMuestraURL = this.fotoMuestraURL + this.fotoMuestra;});
       
   }
    
    mostrarFoto(pic){
        let picture = 'data:image/jpeg;base64,'+pic;
        PhotoViewer.show(picture);
    }

    deleteFoto(del){
        if(del==='paisaje'){
            this.fotoPaisaje = null;
            this.fotoPaisajeURL= 'data:image/jpeg;base64,';
        }
        else{
            this.fotoMuestra = null;
            this.fotoMuestraURL= 'data:image/jpeg;base64,';
        }  
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

    public paso2(){
        
        this.navCtrl.push(Paso2Page,{
            foto1: this.fotoPaisaje,
            foto2: this.fotoMuestra,
            latitud: this.latitud,
            longitud: this.longitud
        });
    }

    ubicacion(){
        console.log("provider ubicacion");
       this.ubicacionCtrl.obtenerCoordenadas().then((data) => 
       {
           this.coordenadas = data;
           this.latitud = this.coordenadas.latitude;
           this.longitud = this.coordenadas.longitude;
        }); 
   }

   logout(){
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}