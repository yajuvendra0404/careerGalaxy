import { Injectable } from '@angular/core';
import { IPlanetsData } from '@app/interface/common.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  data: BehaviorSubject<IPlanetsData[]> = new BehaviorSubject<IPlanetsData[]>([]);
  isDataAvailable:Boolean = false;
  constructor() { }
}
