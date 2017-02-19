import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, Slides} from 'ionic-angular';

var fotos;

@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html'
})
export class SlidePage {

  constructor(
              public platform: Platform,
              public params: NavParams) 
              { 
                fotos = params.get("foto");
              }

}
