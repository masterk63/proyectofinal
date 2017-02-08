import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from "ionic-native";
import { Transfer } from 'ionic-native';

 
@Component({
    templateUrl: 'home.html'
})
export class HomePage {
 
    public base64Image: string;
 
    constructor(private navController: NavController) {
        this.base64Image = "https://placehold.it/150x150";
    }
 
    public takePicture() {
        console.log('antes de llamar a la funcion');
        Camera.getPicture({ 
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then(imageData => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
            
            this.subirFoto(this.base64Image);
             console.log('despues de llamar a la funcion');
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error)); 
        });
    }

 


public subirFoto(urlfoto){
  const fileTransfer = new Transfer();
  var options: any;

  options = {
    fileKey: 'file',
    fileName: 'name.jpg',
    chunkedMode: false,
    mimeType: "image/png"
  } 
  fileTransfer.upload("urlfoto", "http://rickybruno.sytes.net/proyectofinal/back/public/subirfoto", options)
   .then((data) => {
     // success
      console.log("SUCCESS: " + JSON.stringify(data));
   }, (err) => {
     // error
     console.log("ERROR: " + JSON.stringify(err));
   })
}
    
 
}