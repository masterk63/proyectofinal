import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  //El ViewChild trae un elemento por ID, y con
  // ElementRef le ponemos un nombre, por ejemplo mapElement
  @ViewChild('map') mapElement: ElementRef;
    map: any;

  constructor(public navCtrl: NavController) {
    
  }

    ionViewDidLoad(){
        this.loadMap();
    }

  loadMap(){

    Geolocation.getCurrentPosition().then((position) => {

    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
    }, (err) => {
      console.log(err);
    });

  }

  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";          

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
