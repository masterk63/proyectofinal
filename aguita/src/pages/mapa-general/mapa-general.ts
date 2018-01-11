import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Ubicacion } from '../../providers/ubicacion';
import { ConnectivityService } from '../../providers/connectivityService';

declare var google;
declare var MarkerClusterer;


var locations = [
  {lat: -31.563910, lng: 147.154312},
  {lat: -33.718234, lng: 150.363181},
  {lat: -33.727111, lng: 150.371124},
  {lat: -33.848588, lng: 151.209834},
  {lat: -33.851702, lng: 151.216968},
  {lat: -34.671264, lng: 150.863657},
  {lat: -35.304724, lng: 148.662905},
  {lat: -36.817685, lng: 175.699196},
  {lat: -36.828611, lng: 175.790222},
  {lat: -37.750000, lng: 145.116667},
  {lat: -37.759859, lng: 145.128708},
  {lat: -37.765015, lng: 145.133858},
  {lat: -37.770104, lng: 145.143299},
  {lat: -37.773700, lng: 145.145187},
  {lat: -37.774785, lng: 145.137978},
  {lat: -37.819616, lng: 144.968119},
  {lat: -38.330766, lng: 144.695692},
  {lat: -39.927193, lng: 175.053218},
  {lat: -41.330162, lng: 174.865694},
  {lat: -42.734358, lng: 147.439506},
  {lat: -42.734358, lng: 147.501315},
  {lat: -42.735258, lng: 147.438000},
  {lat: -43.999792, lng: 170.463352}
]

@Component({
  selector: 'page-mapa-general',
  templateUrl: 'mapa-general.html'
})
export class MapaGeneralPage {
  markers:any;
  mapInitialised: boolean = false;
  apiKey: any = 'AIzaSyA4h0qNqE_K6GuDT5-BH2g2Mx_XcwbLSys';
 

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public connectivityService: ConnectivityService,
              public ubicacionCtrl:Ubicacion) {
    
  }

  ionViewDidLoad() {
    this.loadGoogleMaps();
  }

  public loadGoogleMaps(){
  this.addConnectivityListeners();
   if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
    console.log("Google maps JavaScript necesita ser cargado.");
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

  // 
  
  initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: -28.024, lng: 140.887}
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }

//  initMap() {
    //       this.ubicacionCtrl.obtenerTodasLasCoordenadas().then((resultado) => {
  
    //           this.markers = resultado;
  
    //           let mapOptions = {
    //             scrollwheel: false,
    //             navigationControl: false,
    //             mapTypeControl: false,
    //             scaleControl: false,
    //             draggable: false,
    //             mapTypeId: google.maps.MapTypeId.ROADMAP
    //           }
        
    //           var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
    //           var infowindow = new google.maps.InfoWindow();
  
    //           var bounds = new google.maps.LatLngBounds();
  
    //           for (let m of this.markers) {
    //               var marker = new google.maps.Marker({
    //                 position: new google.maps.LatLng(m.latitud, m.longitud),
    //                 map: map
    //               });
  
    //               bounds.extend(marker.position);
                  
    //               google.maps.event.addListener(marker, 'click', (function (marker) {
    //                 console.log(m);
    //                   var content = '<div><img src="data:image/jpeg;base64,'+m.fotoPaisaje+'">'+ m.idRegistro+'</div>';
    //                   return function () {
    //                       infowindow.setContent(content);
    //                       infowindow.open(map, marker);
    //                   }
    //               })(marker));
    //           }
  
    //           map.fitBounds(bounds);
    //         }
    //       );
    //   }
  
}
