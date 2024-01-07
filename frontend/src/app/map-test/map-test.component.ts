import { Component } from '@angular/core';
// import {} from 'google-maps';
// import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
// import   { google }  from "google-maps";
@Component({
  selector: 'app-map-test',
  templateUrl: './map-test.component.html',
  styleUrls: ['./map-test.component.scss']
})
export class MapTestComponent {
  canvas: any;
  context: any;
  element: any;
  map: any;
  xAxisValue: any;
  yAxisValue: any;
  startPoint: string = "";
  endPoint: string = "";
  distance: any;
  // map: google.maps.Map;

  // directionsService = new google.maps.DirectionsService();
  // directionsRenderer = new google.maps.DirectionsRenderer();

  // showDirection() {

  //   this.directionsRenderer.setMap(this.map);

  //   var start = this.startPoint;
  //   var end = this.endPoint;
  //   var request:any = {
  //     origin: start,
  //     destination: end,
  //     travelMode: 'DRIVING'
  //   };
  //   this.directionsService.route(request, (result, status) => {
  //     if (status == 'OK') {
  //       this.directionsRenderer.setDirections(result);
  //       this.distance = result.routes[0].legs[0].distance;
  //     }
  //   });

  //   // var start = "301 bluevale street north";
  //   // var end = "conestoga college waterloo";
  //   // var request: any = {
  //   //   origin: this.startPoint,
  //   //   destination: this.endPoint,
  //   //   travelMode: 'DRIVING'
  //   // };
  //   // directionsService.route(request, (result: any, status) => {
  //   //   if (status == 'OK') {
  //   //     var path = [];
  //   //     result.routes[0].legs[0].steps.forEach((element) => {
  //   //       var array = [];
  //   //       array.push(element.start_location.lat());
  //   //       array.push(element.start_location.lng());
  //   //       path.push(array);

  //   //     });
  //   //     var polygon = L.polygon(path,{
  //   //       color: '#F88379',
  //   //       fillColor: '#f03',
  //   //       fillOpacity: 0.1,
  //   //     });
  //   //     polygon.addTo(this.map);

  //   //       console.log("---- direction api Data -----", result);
  //   //       console.log("----- distance ------", result.routes[0].legs[0].distance);
  //   //       console.log("----- start lat ------", result.routes[0].legs[0].steps[0].start_location.lat());
  //   //       console.log("----- start lng ------", result.routes[0].legs[0].steps[0].start_location.lng());
  //   //       console.log("----- end lat ------", result.routes[0].legs[0].steps[0].end_location.lat());
  //   //       console.log("----- end lng ------", result.routes[0].legs[0].steps[0].end_location.lng());
  //   //   }
  //   // });

  // }
  // showDistance() {
  //     window.alert('diistance in (KM)' + this.distance.text + ", distance in (M)"+ this.distance.value)
  // }

        // async initMap(): Promise<void> {
        //   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        //   this.map = new Map(document.getElementById("myMap") as HTMLElement, {
        //     center: { lat: -34.397, lng: 150.644 },
        //     zoom: 8,
        //   });
        // }
  ngAfterViewInit () {

    // const loader = new Loader({
    //   apiKey: "AIzaSyC6t4c0n7jCxG73k3nVdCmrJkRpyQeUcc0",
    //   version: "weekly",
    //   // ...additionalOptions,
    // });

    // const mapOptions = {
    //   center: {
    //     lat: 0,
    //     lng: 0
    //   },
    //   zoom: 4
    // };

    // let element = document.getElementById('myMap');

    // loader
    // .importLibrary('maps')
    // .then((google) => {
    //   if(element !== null){
    //     this.map = new google.Map(element, mapOptions);
    //   }
    // })
    // .catch(e => {
    //   // do something
    // });
    // loader.load().then(async () => {
    //   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    //   map = new Map(document.getElementById("map") as HTMLElement, {
    //     center: { lat: -34.397, lng: 150.644 },
    //     zoom: 8,
    //   });
    // });
    // this.initMap();
  }
  // ngOnInit(): void {

  //   var waterloo = new google.maps.LatLng(43.4826724, -80.5004661);
  //   var mapOptions = {
  //     zoom:4,
  //     center:waterloo
  //   }
  //   let element = document.getElementById('myMap');
  //   if(element !== null){
  //     this.map = new google.maps.Map(element, mapOptions);
  //   }


  //   // this.map = L.map('myMap').setView([43.4826724, -80.5004661], 15);
  //   // L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  //   //   detectRetina: true,
  //   //   subdomains:['mt0','mt1','mt2','mt3']
  //   // }).addTo(this.map);

  // }
  constructor(private http: HttpClient) { }
}
