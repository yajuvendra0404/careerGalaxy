import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { ICertificate, IJobData, ILanesData, IPlanetsData, IQualification } from '@app/interface/common.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private _httpService: HttpService) {}

  fetchPlanets( id: string = "" ): Observable<IPlanetsData[]>{
    return this._httpService.fetchPlanets("planets",id);
  }
  fetchLanes( ): Observable<ILanesData[]>{
    return this._httpService.fetchLanes("lanes");
  }
  createPlanet( formData: FormData ): Observable<{[key:string]:string}>{
    return this._httpService.createPlanets("planet", formData);
  }
  createLanes (formData: FormData) : Observable<{[key:string]:string}> {
    return this._httpService.createLanes("lanes", formData);
  }
  createJobs (data: IJobData) : Observable<{[key:string]:string}> {
    return this._httpService.createJobs("jobs", data);
  }
  fetchJobsByLaneId (laneId : string) : Observable<IJobData[]> {
    return this._httpService.fetchJobsByLaneId('jobsByLaneId',laneId);
  } 
  fetchLanesByPlanetId(planetId : string) : Observable<ILanesData[]> {
    return this._httpService.fetchLanesByPlanetId('lanesByPlanetId',planetId);
  }
  fetchCertifications(): Observable<ICertificate[]>{
    return this._httpService.fetchCertificateList('certificate');
  }
  fetchQualifications(): Observable<IQualification[]>{
    return this._httpService.fetchQualificationList('qualification');
  }
  addCertifications(list:ICertificate[]): Observable<{[key:string]:string}> {
    return this._httpService.addCertifications("certificate", list)
  }
  addQualifications(list:ICertificate[]): Observable<{[key:string]:string}> {
    return this._httpService.addQualifications("qualification", list)
  }

}
