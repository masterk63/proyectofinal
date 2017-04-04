import { Component, ViewChild, ElementRef } from '@angular/core';
//ActionSheetController menu de opciones nativas.
//ToastController modal nativo
import { ModalController, ViewController, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Mapjshtml } from '../pages/mapajshtml/mapajshtml';
import { MapasnativoPage } from '../pages/mapasnativo/mapasnativo';
import { ModalPage } from '../modal/modal';
import { Camara } from '../../providers/camara';
import { Ubicacion } from '../../providers/ubicacion';
import { Localsave } from '../../providers/localsave';
import { PhotoViewer } from 'ionic-native';
import { Paso2Page } from '../paso2/paso2';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
    
})

export class HomePage {
    fotoPaisajeURL = 'data:image/jpeg;base64,';
    fotoPaisaje:any;
    fotoMuestra:any;
    fotoMuestraURL = 'data:image/jpeg;base64,';
    listaDBlocal:any;
    latitud:any;
    longitud:any;
    coordenadas: any;
    imagenenBase64 = '';
    fotoPaisajeURLSafe:any;
    fotoMuestraURLSafe:any;
    muestroMapaNativo = false;
    loading: any;

    constructor(public navCtrl: NavController, 
                public actionSheetCtrl: ActionSheetController, 
                public toastCtrl: ToastController, 
                public platform: Platform, 
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                public camaraCtrl:Camara,
                public authService: Auth,
                private sanitizer:DomSanitizer,
                public ubicacionCtrl:Ubicacion,
                public localSaveCtrl:Localsave
                ){
                    this.ubicacion();
                    if(this.platform.is('android') || this.platform.is('ios')){
                        this.muestroMapaNativo = true;
                    }              
                }

    ngOnInit(){
        
    }

    ionViewDidLoad() {

    }
    
    openModal(pic) {
        let modal = this.modalCtrl.create(ModalPage, {foto: pic});
        modal.present();
    }

   takefotoPaisaje(){
       this.camaraCtrl.takePicture64().then((data) => 
       {this.fotoPaisaje = data;
       this.fotoPaisajeURL = this.fotoPaisajeURL + this.fotoPaisaje;
       this.fotoPaisajeURLSafe= this.sanitizer.bypassSecurityTrustUrl(this.fotoPaisajeURL );}); 
   }

    takefotoMuestra(){
       this.camaraCtrl.takePicture64().then((data) => 
       {this.fotoMuestra = data;
       this.fotoMuestraURL = this.fotoMuestraURL + this.fotoMuestra;
       this.fotoMuestraURLSafe= this.sanitizer.bypassSecurityTrustUrl(this.fotoMuestraURL );});
       
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
        if(this.fotoPaisaje != null && this.fotoMuestra != null){
            this.navCtrl.push(Paso2Page,{
                foto1: this.fotoPaisaje,
                foto2: this.fotoMuestra,
                latitud: this.latitud,
                longitud: this.longitud
            });
        }else{
            if(this.fotoPaisaje == null && this.fotoMuestra == null){
                let mensajeToast = "Debe caputar las fotos correspondientes";
                this.abrirToast(mensajeToast);
            }else{
                if(this.fotoPaisaje == null){
                    let mensajeToast = "Debe caputar una foto del paisaje";
                    this.abrirToast(mensajeToast);
                }else{
                    if(this.fotoMuestra == null){
                        let mensajeToast = "Debe caputar una foto de la muestra";
                        this.abrirToast(mensajeToast);
                    }
                }
            }
        }
    }

    abrirToast(mensaje) {
    let toast = this.toastCtrl.create({
        message: mensaje,
        duration: 3000,
        position: 'middle'
    });

    toast.present();
    }

    ubicacion(){
        this.showLoader();
        this.obtenerUbicacion();
   }

   public obtenerUbicacion(){
        this.ubicacionCtrl.obtenerCoordenadas().then((data) => 
        {
            console.log("ubicacion home");
            console.log(data);
            if(data != -1){
                this.coordenadas = data;
                this.latitud = this.coordenadas.latitude;
                this.longitud = this.coordenadas.longitude;
                this.loading.dismiss();
            }else{
                this.obtenerUbicacion();
            }
            

        }); 
   }
   
   logout(){
    console.log('saliendo logout');
    this.authService.logout().then(()=>{
      console.log('listo borrado, dirijiendo a registrar');
      this.navCtrl.setRoot(LoginPage);
    });
  }

    showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Espere mientras cargamos la ubicacion'
    });
    this.loading.present();
    }
}