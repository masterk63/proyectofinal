import { Component } from '@angular/core';
import { NavController, NavParams,Platform} from 'ionic-angular';

var isStopped = false;

@Component({
  selector: 'wheel',
  templateUrl: 'wheel.html'
})
export class Wheel {
  public cover:any;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public navParams: NavParams) {
    if(this.platform.is('android') || this.platform.is('ios')){
        this.cover = "../www/assets/img/cover2.png";
    }else{
        this.cover = "../assets/img/cover2.png";
    }
  }

  ionViewDidLoad() {
    
    function rand(min, max) {
      return Math.random() * (max - min) + min;
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
      ctx.fillStyle = color;
      ctx.moveTo(center, center);
      ctx.arc(center, center, width/2, deg2rad(deg), deg2rad(deg+sliceDeg));
      ctx.lineTo(center, center);
      ctx.fill();
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

    (function anim() {
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
            if (label[ai]==='2'){
              if(inicioProcesoFin){
                inicioProcesoFin=false;
                var comienzo = deg;
                console.log(comienzo);
                parar = comienzo+sliceDeg/2;
                console.log(parar);
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
        return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
      }

      drawImg();
      window.requestAnimationFrame( anim );
      }());

      document.getElementById("spin").addEventListener("mousedown", function(){
        isStopped = true;
      }, false);
  }

  detener(){
     isStopped = true;
  }
}










