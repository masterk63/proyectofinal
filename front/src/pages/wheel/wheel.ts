import { Component } from '@angular/core';
import { NavController, NavParams,Platform} from 'ionic-angular';

var isStopped = false;
var myReq;
var contarVueltas = 0;
var indice;


@Component({
  selector: 'wheel',
  templateUrl: 'wheel.html'
})
export class Wheel {
  public cover:any;
  public mostrar = true;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams) {
                indice = navParams.get('indice'); 
                console.log('el indice es:',indice);
                if(this.platform.is('android') || this.platform.is('ios')){
                    this.cover = "../www/assets/img/cover2.png";
                }else{
                    this.cover = "../assets/img/cover2.png";
                }
  }
  
 
 ionViewWillLeave(){
   //Evita que el proceso se siga ejecutando, incluso al salir de la vista
   // el proceso se seguia ejucutando
   window.cancelAnimationFrame(myReq);
 }

  ionViewDidLoad() {
    
    function rand(min, max) {
      return (max - min) + min;
    }

    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    var canvas:any = document.getElementById('canvas');
    var color = ['#97907C','#97907C','#97907C','#97907C','#97907C','#BD393C','#CF6D31','#F8F131','#31B353','#3F3470'];
    var label = ['0', '1', '2', '3', '4', '', '', '','',''];
    var slices = color.length;
    var sliceDeg = 360/slices;
    var deg = rand(0, 360);
    var speed = 0;
    var slowDownRand = 0;
    var ctx = canvas.getContext('2d');
    var width = canvas.width; // size
    var center = width/2;      // center
    var inicioProcesoFin = true;
    var parar= false;
    var lock = false;
  

    function deg2rad(deg) {
      return deg * Math.PI/180;
    }

    function drawSlice(deg, color) {
      ctx.beginPath();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth   = 1;
      ctx.fillStyle = color;
      ctx.moveTo(center, center);
      //x    y   rad startAng endAng
      ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
      ctx.lineTo(center, center);
      ctx.fill();
      //ctx.stroke();
    }

    function drawText(deg, text) {
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(deg2rad(deg));
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText(text, 130, 10);
      ctx.restore();
    }

    function drawImg() {
      ctx.clearRect(0, 0, width, width);
      for(var i=0; i<slices; i++){
        drawSlice(deg, color[i]);
        drawText(deg+sliceDeg/2, label[i]);
        deg += sliceDeg;
      }
    }

    function anim() {
      deg += speed;
      deg %= 360;

      // Increment speed
      if(!isStopped && speed<5){
        speed = 5;
      }
      // Decrement Speed
      if(isStopped){
        if(!lock){
          lock = true;
          slowDownRand = rand(0.994, 0.998);
        } 
        speed = speed>0.2 ? speed*=slowDownRand : 0;
         if(speed <2){
            var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
            ai = (slices+ai)%slices; // Fix negative index
            if (label[ai] === '2'){
            //if (label[ai] === indice.toString()){
              if(inicioProcesoFin){
                inicioProcesoFin=false;
                var comienzo = deg;
                parar = comienzo+sliceDeg/2;
              }
              if(deg>parar){
                speed=0;
              }
            }
          }
      }

      // Stopped!
      if(lock && !speed){
        var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
        ai = (slices+ai)%slices; // Fix negative index
        //Seteo todos los valores a 0 para poder instanciarlo nuevamente
        lock = false;
        isStopped = false;
        contarVueltas = 0;
        return this;
        //return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
      }

      drawImg();

      if(contarVueltas < 350){
        contarVueltas++;
      }
      else{
        isStopped = true;
      }
      // Se llama recursivamente para poder animar la rueda.
      myReq = requestAnimationFrame(anim);
    }
    //Llama a la animacion una vez, cuando se inicia la vista
    // luego se llama recusivamente, todo se guarda en myreq
    // entonces para denter la animacion cancelo desde la primera llamada
    myReq = requestAnimationFrame(anim);
  }

  public detener(){
     this.mostrar = false;
  }

}










