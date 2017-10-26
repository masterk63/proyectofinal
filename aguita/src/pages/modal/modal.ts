import { Directive, Component, ViewChild, ElementRef, } from '@angular/core';
import { ModalController, NavParams, 
ViewController, NavController, ActionSheetController, ToastController, Platform,
 LoadingController, Loading,Slides } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SwipeVertical } from '../../components/swipe-vertical/swipe-vertical';


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
  isActive  = true;

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
        this.descripcion = "Familia de coleópteros acuáticos. Larvas y adultos"+
                            " coexisten en el mismo tipo de ambiente. Las larvas pueden"+
                            " variar entre 1 y 10 mm de longitud, con una forma"+
                            " del cuerpo alargada y más o menos cilíndrica. El adulto"+
                            " posee la cabeza retraída dentro del protórax y tiene patas"+
                            " relativamente largas con uñas tarsales prominentes que"+
                            " le facilitan la sujeción hacia el sustrato. Se alimentan principalmente"+
                            " de perifiton y respiran mediante el mecanismo"+
                            " de plastrón. El cuerpo está recubierto por pelos finos o"+
                            " en forma de escamas que repelen el agua, manteniendo"+
                            " una capa fina de aire en su superficie. A través de ésta"+
                            " y por difusión se realiza el intercambio de gases con el"+
                            " agua rica en oxígeno que la rodea.";
      }
      if(this.nombre === "patudo"){
        this.titulo = "PATUDOS!!!! (MEGALOPTERA)";
        this.descripcion = "Las larvas son grandes y pueden alcanzar los 6 cm de longitud."+
                          " Vulgarmente se los conoce como patudos debido a sus"+
                          " proyecciones abdominales que el ojo profano confunde con"+
                          " largas patas. Poseen mandíbulas fuertes que pueden, incluso,"+
                          " hendir la mano de quien ose manipularlos (¡damos testimonio"+
                          " de ello!). Son activos depredadores y el examen de su contenido"+
                          " estomacal revela una preferencia amplia de presas a las"+
                          " que devora en forma entera. El adulto es alado y representa"+
                          " una fase aérea tanto reproductiva como dispersiva.";
      }
      if(this.nombre === "plecoptero"){
        this.titulo = "PLECOPTEROS!!!!";
        this.descripcion = "Las larvas acuáticas prefieren zonas turbulentas de"+
                            " los cursos montañosos de agua. Son de tamaño mediano"+
                            " con cuerpo aplanado y tienen la capacidad de desplazarse"+
                            " sobre las rocas expuestas a condiciones de alta"+
                            " energía hidráulica. Las larvas se reconocen fácilmente por sus"+
                            " tres placas dorsales en el tórax y el par de cercos con el cual"+
                            " termina el abdomen. El adulto es alado y vive en las inmediaciones"+
                            " de su sitio de emergencia. Reviste especial interés su"+
                            " conducta reproductiva, consistente en la percusión de sonidos"+
                            " sobre rocas a título de llamadas sensuales que ejecuta el macho.";
      }
      if(this.nombre === "tricoptero"){
        this.titulo = "TRICOPTEROS!!!!";
        this.descripcion = "Es uno de los órdenes de insectos de agua dulce más"+
                            " diversificados. Sus larvas son acuáticas y viven en refugios"+
                            " fijos o transportables elaborados con seda; mientras"+
                            " que los adultos constituyen la fase dispersiva aérea. Son"+
                            " verdaderos arquitectos del mundo acuático continental."+
                            " Representan un componente conspicuo de la biomasa en"+
                            " estos ecosistemas: las larvas dentro del curso de agua y"+
                            " los adultos en las adyacencias. Viven preferentemente en cursos"+
                            " torrentosos de montaña.";
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
    // this.isActive = !this.isActive;
  }

}
