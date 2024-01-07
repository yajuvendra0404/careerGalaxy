import { Component } from '@angular/core';
import { ILanesData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { PlanetService } from '@app/services/dataShare/planet.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-lanes',
  templateUrl: './lanes.component.html',
  styleUrls: ['./lanes.component.scss']
})
export class LanesComponent {

  selectedPlanetId: string = "";
  lanesData:ILanesData[] = [];
  baseURL: string= environment.DOMAIN;

  constructor(
    private _planetService : PlanetService,
    private _apiService : ApiService
  ) {}

  fetchLanesData (planetId:string) {
    this._apiService.fetchLanesByPlanetId(planetId).subscribe({
      next: (data) => {
        this.lanesData = data;
      },
      error: (error) => {
        console.log("-- error --", error);
      }
    });
  }

  ngOnInit(): void {
    this._planetService.planetId.subscribe({
      next: (data:string) => {
        this.fetchLanesData(data); 
      },
      error: (error) => {
        console.log("error", error);
      }
    })
  }
}
