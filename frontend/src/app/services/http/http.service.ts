import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJobData } from '@app/interface/common.interface';
import { environment } from 'environments/environment.development';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseURL: string= environment.DOMAIN;
  constructor(private _http: HttpClient) {}

  fetchPlanets(url: string, id: string = ""): Observable<any> {
    return this._http.get<any>(`${this.baseURL}${url}/${id}`)
    .pipe(
      tap((data) => {
        console.log("--tap data respose--", data );
      }),
      catchError(this.errorHandler.bind(this)))
  }

  createPlanets(url: string, formData:FormData) : Observable<any> {
    return this._http.post<any>(`${this.baseURL}${url}`,formData)
    .pipe(catchError(this.errorHandler.bind(this)))
  }

  createLanes(url : string, formData:FormData): Observable<any> {
    return this._http.post<any>(`${this.baseURL}${url}`,formData)
    .pipe(catchError(this.errorHandler.bind(this)))
  }
  createJobs(url : string, data:IJobData): Observable<any> {
    return this._http.post<any>(`${this.baseURL}${url}`,data)
    .pipe(catchError(this.errorHandler.bind(this)))
  }

  fetchLanesByPlanetId(url : string, planetId: string): Observable<any> {
    return this._http.get<any>(`${this.baseURL}${url}/${planetId}`)
    .pipe(catchError(this.errorHandler.bind(this)))
  }

  fetchLanes(url: string, id: string = ""): Observable<any> {
    return this._http.get<any>(`${this.baseURL}${url}`)
    .pipe(
      tap((data) => {
        console.log("--tap data respose--", data );
      }),
      catchError(this.errorHandler.bind(this)))
  }
  private errorHandler() {
    return "error occured";
  }
}