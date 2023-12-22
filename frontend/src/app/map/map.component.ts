import { Component } from '@angular/core';
import { IPlanetsData } from '@app/interface/common.interface';
import { PlanetService } from '@app/services/dataShare/planet.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  
  planetsData: IPlanetsData[] = [
    {name:"earth",size: 20.8, position: 0, texture: "earth.jpg",rotation: 0.003, revolve: 0.01},
    {name:"mars",size: 5.8, position: 42, texture: "mars.jpg",rotation: 0.004, revolve: 0.015},
    {name:"pluto",size: 4.0, position: 62, texture: "pluto.jpg",rotation: 0.002, revolve: 0.012},
    {name:"jupiter",size: 4.8, position: 82, texture: "jupiter.jpg",rotation: 0.001, revolve: 0.014}
  ] 

  constructor(private planetService : PlanetService) {}

  ngOnInit(): void {
    this.planetService.data.next(this.planetsData);
  }
}
