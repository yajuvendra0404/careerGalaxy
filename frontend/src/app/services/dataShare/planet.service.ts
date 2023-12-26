import { Injectable } from '@angular/core';
import { IPlanetsData } from '@app/interface/common.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  data: Subject<IPlanetsData[]> = new Subject<IPlanetsData[]>();
  isDataAvailable:Boolean = false;
  constructor() { }
}
