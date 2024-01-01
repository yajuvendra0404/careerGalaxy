import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ILanesData, IPlanetsData } from '@app/interface/common.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _httpService: HttpService) {}

  fetchPlanets( id: string = "" ): Observable<IPlanetsData[]>{
    return this._httpService.fetchPlanets("planets",id);
  }
  createPlanet( formData: FormData ): Observable<{[key:string]:string}>{
    return this._httpService.createPlanets("planet", formData);
  }
  createLanes (formData: FormData) : Observable<{[key:string]:string}> {
    return this._httpService.createLanes("lanes", formData);
  }
  fetchLanesByPlanetId(planetId : string) : Observable<ILanesData[]> {
    return this._httpService.fetchLanesByPlanetId('lanesByPlanetId',planetId);
  }
}
