import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Camera} from "ionic-native";
 
@Component({
    templateUrl: 'home.html'
})
export class HomePage {
 
    public base64Image: string;
 
    constructor(private navController: NavController) {
        this.base64Image = "https://placehold.it/150x150";
    }
 
    public takePicture() {
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
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }
 
}