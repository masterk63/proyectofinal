import { Directive, Component, ViewChild, ElementRef, } from '@angular/core';
import { ModalController, NavParams, 
ViewController, NavController, ActionSheetController, ToastController, Platform,
 LoadingController, Loading,Slides } from 'ionic-angular';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { SwipeVertical } from '../components/swipe-vertical/swipe-vertical';


@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})

export class ModalPage {
  foto: any;
  nombre: any;
  titulo: any;
  descripcion: any;
  index: any;
  isActive  = false;

  @ViewChild(Slides) slides: Slides;

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController) 
    { 
      this.foto = params.get("foto");
      this.nombre = params.get("nombre");
    }

    ionViewDidLoad(){

      if(this.nombre === "elmido"){
        this.titulo = "EMILDOS!!!!";
        this.descripcion = "son unos bichos raros";
      }
     
    }



  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSwipeUp(e) {
	  this.viewCtrl.dismiss();
	}
	
	onSwipeDown(e) {
	  this.viewCtrl.dismiss();
	}

  show(){
    this.isActive = !this.isActive;
  }

}
