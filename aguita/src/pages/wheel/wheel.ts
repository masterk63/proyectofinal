import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { MisRegistrosPage } from '../mis-registros/mis-registros';
import { TabsPage } from '../tabs/tabs';

var isStopped = false;
var myReq;
var contarVueltas = 0;



@Component({
   selector: 'wheel',
   templateUrl: 'wheel.html'
})

export class Wheel {
   public cover: any;
   public mostrar = false;
   public indice;
   public riverCartoon: any;
   public colorVector = ['#BD393C', '#CF6D31', '#F8F131', '#31B353', '#3F3470'];
   public colorArrow: any;
   public nivelDeContaminacion: any;
   public nivelDeContaminacionVector = ['Muy Contaminado', 'Contaminado', 'con Contaminacion Media', 'en Buen Estado', 'en Excelente Estado'];

   constructor(public navCtrl: NavController,
      public platform: Platform,
      public navParams: NavParams) {
      this.indice = navParams.get('indice');
      this.colorArrow = this.calcularColorArrow();
      this.nivelDeContaminacion = this.calcularNivelDeContaminacion();
      if (this.platform.is('android') || this.platform.is('ios')) {
         this.cover = "../www/assets/img/cover2.png";
      } else {
         this.cover = "../assets/img/cover2.png";
      }
      if (this.platform.is('android') || this.platform.is('ios')) {
         this.riverCartoon = "../www/assets/img/riverCartoon.png";
      } else {
         this.riverCartoon = "../assets/img/riverCartoon.png";
      }  
   }


   ionViewWillEnter() {

   }

   ionViewWillLeave() {
      //Evita que el proceso se siga ejecutando, incluso al salir de la vista
      // el proceso se seguia ejucutando
      window.cancelAnimationFrame(myReq);
   }

   ionViewDidLoad() {
      var canvas: any = document.getElementById('canvas');
      var color = ['#97907C', '#97907C', '#97907C', '#97907C', '#97907C', '#BD393C', '#CF6D31', '#F8F131', '#31B353', '#3F3470'];
      var label = ['0', '1', '2', '3', '4', '', '', '', '', ''];
      var slices = color.length;
      var sliceDeg = 360 / slices;
      var deg = this.rand(0, 360);
      var speed = 0;
      var slowDownRand = 0;
      var ctx = canvas.getContext('2d');
      var width = canvas.width; // size
      var center = width / 2;      // center
      var inicioProcesoFin = true;
      var parar = false;
      var lock = false;

      //Llama a la animacion una vez, cuando se inicia la vista
      // luego se llama recusivamente, todo se guarda en myreq
      // entonces para denter la animacion cancelo desde la primera llamada
      myReq = requestAnimationFrame(() => {
         this.anim(ctx, width, slices, deg, color, center, sliceDeg, label, speed, lock, slowDownRand, inicioProcesoFin, parar);
      });
   }

   public siguiente() {
      this.navCtrl.setRoot(TabsPage);
   }

   public rand(min, max) {
      return (max - min) + min;
   }

   public randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
   }

   public deg2rad(deg) {
      return deg * Math.PI / 180;
   }

   public drawSlice(deg, color, ctx, center, sliceDeg, width) {
      ctx.beginPath();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.fillStyle = color;
      ctx.moveTo(center, center);
      //x    y   rad startAng endAng
      ctx.arc(center, center, width / 2, this.deg2rad(deg), this.deg2rad(deg + sliceDeg));
      ctx.lineTo(center, center);
      ctx.fill();
      //ctx.stroke();
   }

   public drawText(deg, text, ctx, center) {
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(this.deg2rad(deg));
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = 'bold 30px sans-serif';
      ctx.fillText(text, 130, 10);
      ctx.restore();
   }

   public drawImg(ctx, width, slices, deg, color, center, sliceDeg, label) {
      ctx.clearRect(0, 0, width, width);
      for (var i = 0; i < slices; i++) {
         this.drawSlice(deg, color[i], ctx, center, sliceDeg, width);
         this.drawText(deg + sliceDeg / 2, label[i], ctx, center);
         deg += sliceDeg;
      }
   }

   public anim(ctx, width, slices, deg, color, center, sliceDeg, label, speed, lock, slowDownRand, inicioProcesoFin, parar) {
      deg += speed;
      deg %= 360;

      // Increment speed
      if (!isStopped && speed < 5) {
         speed = 5;
      }
      // Decrement Speed
      if (isStopped) {
         if (!lock) {
            lock = true;
            slowDownRand = this.rand(0.994, 0.998);
         }
         speed = speed > 0.2 ? speed *= slowDownRand : 0;
         if (speed < 2) {
            var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
            ai = (slices + ai) % slices; // Fix negative index
            if (label[ai] === this.indice.toString()) {
               if (inicioProcesoFin) {
                  inicioProcesoFin = false;
                  var comienzo = deg;
                  parar = comienzo + sliceDeg / 2;
               }
               if (deg > parar) {
                  speed = 0;
               }
            }
         }
      }

      // Stopped!
      if (lock && !speed) {
         var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
         ai = (slices + ai) % slices; // Fix negative index
         //Seteo todos los valores a 0 para poder instanciarlo nuevamente
         lock = false;
         isStopped = false;
         contarVueltas = 0;
         this.mostrar = true;
         return this;
         //return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
      }

      this.drawImg(ctx, width, slices, deg, color, center, sliceDeg, label)

      if (contarVueltas < 350) {
         contarVueltas++;
      }
      else {
         isStopped = true;
      }

      // Se llama recursivamente para poder animar la rueda.
      myReq = requestAnimationFrame(() => {
         this.anim(ctx, width, slices, deg, color, center, sliceDeg, label, speed, lock, slowDownRand, inicioProcesoFin, parar);
      });
   }

   public calcularColorArrow() {
      switch (this.indice) {
         case 0:
            return this.colorVector[0];
         case 1:
            return this.colorVector[1];
         case 2:
            return this.colorVector[2];
         case 3:
            return this.colorVector[3];
         case 4:
            return this.colorVector[4];
      }
   }

   public calcularNivelDeContaminacion() {
      switch (this.indice) {
         case 0:
            return this.nivelDeContaminacionVector[0];
         case 1:
            return this.nivelDeContaminacionVector[1];
         case 2:
            return this.nivelDeContaminacionVector[2];
         case 3:
            return this.nivelDeContaminacionVector[3];
         case 4:
            return this.nivelDeContaminacionVector[4];
      }
   }
}










