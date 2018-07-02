import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImageCropperComponent, CropperSettings } from "ngx-img-cropper";
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-cropper',
  templateUrl: 'cropper.html',
})
export class CropperPage {

  @ViewChild('cropper') ImageCropper: ImageCropperComponent;
  public cropperSettings;
  public data: any;
  width: any;
  height: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams) {
    // Si recibo 1 el aspectRatio es cradrado,
    // Si recibo 0 el aspectRatio es 16:9
    let aspectRatio = this.params.get("aspectRatio");
    if (aspectRatio) {
      this.height = 800;
      this.width = 800;
    } else {
      this.height = 1080;
      this.width = 1920;
    }
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.cropOnResize = true;
    this.cropperSettings.fileType = 'image/jpeg';
    this.cropperSettings.canvasWidth = 320;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.width = this.width;
    this.cropperSettings.height = this.height;
    this.cropperSettings.croppedWidth = this.width;
    this.cropperSettings.croppedHeight = this.height;

    this.cropperSettings.keepAspect = true;
    this.data = {};
  }

  ionViewDidLoad() {
    let image: any = new Image();
    let imagenaCropper = this.params.get("imagen");
    image.src = 'data:image/jpeg;base64,' + imagenaCropper;
    this.ImageCropper.setImage(image);
  }

  dismiss() {
    let cropped = this.data.image.split(',')[1];
    this.viewCtrl.dismiss(cropped);
  }


}
