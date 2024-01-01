import { Injectable } from '@angular/core';
import { ILanesData, IPlanetsData } from '@app/interface/common.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  planetData: BehaviorSubject<IPlanetsData[]> = new BehaviorSubject<IPlanetsData[]>([]);
  laneData : BehaviorSubject<ILanesData[]> = new BehaviorSubject<ILanesData[]>([]);
  isDataAvailable:Boolean = false;
  constructor() { }
}
