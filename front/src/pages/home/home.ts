import { Component, ViewChild, ElementRef } from '@angular/core';
//ActionSheetController menu de opciones nativas.
//ToastController modal nativo
import { ModalController, ViewController, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Mapajshtml } from '../pages/mapajshtml/mapajshtml';


import { ModalPage } from '../modal/modal';

declare var cordova: any;


@Component({
    selector: 'home-page',
    templateUrl: 'home.html',
})

export class HomePage {
    imagenes = [];
    listaFotos = [];
    public base64Image: string;
    lastImage: string = null;
    loading: Loading;
    

    constructor(public navCtrl: NavController, 
                public actionSheetCtrl: ActionSheetController, 
                public toastCtrl: ToastController, 
                public platform: Platform, 
                public loadingCtrl: LoadingController,
                public modalCtrl: ModalController,
                ){
                    this.imagenes = [{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/2.jpg'
                    },{
                        src: '../assets/img/3.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    },{
                        src: '../assets/img/1.jpg'
                    }];
                }


    ionViewDidLoad(){
    
    }

    openModal(caminofoto) {
        console.log("caminofoto: ");
        console.log(caminofoto);
        let modal = this.modalCtrl.create(ModalPage, {foto: caminofoto});
        modal.present();
    }
        
  
   public presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Subir Imagen desde',
            buttons: [
                {
                    text: 'Libreria',
                    handler: () => {
                        this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Camara',
                    handler: () => {
                        this.takePicture(Camera.PictureSourceType.CAMERA);
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

public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
        quality: 100,
        allowEdit: true,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        targetWidth: 1080,
        targetHeight: 1080
        };

    // Get the data of an image
    Camera.getPicture(options).then((imagePath) => {
        // Special handling for Android library
        if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
            FilePath.resolveNativePath(imagePath)
            .then(filePath => {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = filePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
    }, (err) => {
        this.presentToast('Error al seleccionar foto.');
    });
}

// Create a new name for the image
private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
    File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
        this.lastImage = newFileName;
        this.listaFotos.push(this.lastImage);
    }, error => {
        this.presentToast('Error al guardar foto.');
    });
}
 
private presentToast(text) {
    let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'top'
    });
        toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
    if (img === null) {
        return '';
    } else {
        return cordova.file.dataDirectory + img;
    }
} 


public uploadImage() {
    // Destination URL
    var url = "http://rickybruno.sytes.net/proyectofinal/back/public/subirFoto.php";

    for (let entry of this.listaFotos) {
        // File for Upload
        var targetPath = this.pathForImage(entry);

        // File name only
        var filename = entry;

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {'fileName': filename}
        };

        const fileTransfer = new Transfer();

        this.loading = this.loadingCtrl.create({
            content: 'Subiendo...',
        });
        this.loading.present();

        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(data => {
            this.loading.dismissAll()
            this.presentToast('Imagen Subida Correctamente');
        }, err => {
            this.loading.dismissAll()
            this.presentToast('Error al Subir Imagen.');
        });
    }  
}


 
}