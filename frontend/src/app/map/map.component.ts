import { Component } from '@angular/core';
import { IPlanetsData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { PlanetService } from '@app/services/dataShare/planet.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  
  subscriptionStore: Subscription[] = [];
  planetsData: IPlanetsData[] = []; 
  isDataAvailable:boolean = false;
  
  // {name:"earth",size: 20.8, position: 0, texture: "earth.jpg",rotationSpeed: 0.003, orbitingSpeed: 0.01},
  // {name:"mars",size: 5.8, position: 42, texture: "mars.jpg",rotationSpeed: 0.004, orbitingSpeed: 0.015},
  // {name:"pluto",size: 4.0, position: 62, texture: "pluto.jpg",rotationSpeed: 0.002, orbitingSpeed: 0.012},
  // {name:"jupiter",size: 4.8, position: 82, texture: "jupiter.jpg",rotationSpeed: 0.001, orbitingSpeed: 0.014}

  constructor(
    private _planetService : PlanetService,
    private _apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.subscriptionStore.push(
      this._apiService.fetchPlanets().subscribe(( data ) => {
        console.log('map - conponent ---', data);
        this._planetService.data.next(data);
        this.isDataAvailable = true;
      })
    )
  }
  
  ngOnDestroy() {
    this.subscriptionStore.forEach( (ele) => {
      ele.unsubscribe();
    })
  }
}
