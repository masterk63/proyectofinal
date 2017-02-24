import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { Platform,ToastController,LoadingController, Loading  } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

declare var cordova: any;

@Injectable()
export class Camara {
    imagenes = [];
    listaFotos = [];
    public base64Image: string;
    lastImage: string = null;
    loading: Loading;

  constructor(public http: Http,
                public toastCtrl: ToastController, 
                public platform: Platform, 
                public loadingCtrl: LoadingController) {
    console.log('Hello Camara Provider');
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
        quality: 100,
        allowEdit: true,
        sourceType: sourceType,
        destinationType: 1,
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
          this.getFotos();
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

    public getFotos(){
        return Observable.create(observer => {
            observer.next(this.listaFotos);
        });
    }

}
