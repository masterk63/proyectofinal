import { Component, ViewChild, ElementRef,Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { ConnectivityService } from '../../providers/connectivity-service';

declare var google;


@Component({
  selector: 'mapajshtml',
  templateUrl: 'mapajshtml.html'
})
export class Mapajshtml {
  @Input() latitud;
  @Input() longitud;
  mapInitialised: boolean = false;
  apiKey: any = 'AIzaSyA4h0qNqE_K6GuDT5-BH2g2Mx_XcwbLSys';

  constructor(public navCtrl: NavController,
              public connectivityService: ConnectivityService) {

  }
 
  ngOnChanges(){
    this.loadGoogleMaps();
    // this.loadMap();
  }
 
public loadGoogleMaps(){
  this.addConnectivityListeners();
   if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();
 
    if(this.connectivityService.isOnline()){
      console.log("online, loading map");
 
      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }
 
      let script = document.createElement("script");
      script.id = "googleMaps";
 
      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
      }
 
      document.body.appendChild(script);  
 
    } 
  }
  else {
 
    if(this.connectivityService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }
 
  }
}



public addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }

 
  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }


 public initMap(){
      this.mapInitialised = true;
      let latLng = new google.maps.LatLng(this.latitud, this.longitud);
      let mapOptions = {
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
        center: latLng,
        zoom: 15, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
  
      var mapa = new google.maps.Map(document.getElementById('map'), mapOptions);

      let marker = new google.maps.Marker({
        map: mapa,
        animation: google.maps.Animation.DROP,
        position: mapa.getCenter()
      });
  
      let content = "<h4>Information!</h4>";  

      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
    
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(mapa, marker);
      });    

        //Repinta el mapa cuando cambio de pestaña
        google.maps.event.addListenerOnce(mapa, 'idle', function () {
            google.maps.event.trigger(mapa, 'resize');
            mapa.setCenter(latLng);
            mapa.setZoom(15);
        });   
      };

      
}

 