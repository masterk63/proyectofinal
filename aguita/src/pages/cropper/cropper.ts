import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import Cropper from 'cropperjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'crop-image',
  templateUrl: 'cropper.html'
})
export class CropperPage {
  @ViewChild('image') input: ElementRef;
  imageBase64: any;
  width: number;
  height: number;
  cropper: Cropper;
  cropperOptions: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public sanitizer: DomSanitizer) {
    this.imageBase64 = 'data:image/jpeg;base64,' + this.navParams.get('imagen');
    this.imageBase64 = this.sanitizer.bypassSecurityTrustUrl(this.imageBase64);
    let aspectRatio = this.navParams.get('aspectRatio');
    if (aspectRatio) {
      this.width = 1000;
      this.height = 1000;
    } else {
      this.width = 1920;
      this.height = 1080;
    }
    //Set your required cropperJS options as seen here https://github.com/fengyuanchen/cropperjs/blob/master/README.md#options
    this.cropperOptions = {
      dragMode: 'move',
      aspectRatio: this.width / this.height,
      modal: true,
      guides: false,
      highlight: true,
      center: true,
      background: true,
      autoCrop: true,
      movable: false,
      zoomable: false,
      autoCropArea: 0.8,
      responsive: true,
      cropBoxMovable: true,
      cropBoxResizable: true,
      scalable: false,
      crop: (e) => { }
    };
  }

  ionViewDidLoad() {
  }

  cargarCropper() {
    this.cropper = new Cropper(this.input.nativeElement, this.cropperOptions);
  }


  cropperReset() { this.cropper.reset() }

  imageRotate() { this.cropper.rotate(90); }

  cancel() { this.viewCtrl.dismiss(); }

  finish() {
    let croppedImgB64String = this.cropper.getCroppedCanvas({ width: this.width, height: this.height }).toDataURL('image/jpeg', (100 / 100));
    this.viewCtrl.dismiss(croppedImgB64String.split(',')[1]);
  }
}