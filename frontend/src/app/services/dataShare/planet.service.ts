import { Injectable } from '@angular/core';
import { ILanesData, IPlanetsData } from '@app/interface/common.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
/* should be used to send data to --- planet.component.ts --- */
  planetData: BehaviorSubject<IPlanetsData[]> = new BehaviorSubject<IPlanetsData[]>([]);

/* should be used to send data outside --- planet.component.ts ---*/   
  planetId : BehaviorSubject<string> = new BehaviorSubject<string>("");

  isDataAvailable:Boolean = false;
  constructor() { }
}
