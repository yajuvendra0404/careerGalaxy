import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICertificate, IJobData } from '@app/interface/common.interface';
import { environment } from 'environments/environment.development';
import { Observable, catchError, tap, throwError } from 'rxjs';

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
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  createPlanets(url: string, formData:FormData) : Observable<any> {
    return this._http.post<any>(`${this.baseURL}${url}`,formData)
    .pipe(
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  createLanes(url : string, formData:FormData): Observable<any> {
    return this._http.post<any>(`${this.baseURL}${url}`,formData)
    .pipe(
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  createJobs(url : string, data:IJobData): Observable<any> {
    return this._http.post<any>(`${this.baseURL}${url}`,data)
    .pipe(
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  fetchLanesByPlanetId(url : string, planetId: string): Observable<any> {
    return this._http.get<any>(`${this.baseURL}${url}/${planetId}`)
    .pipe(
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  fetchLanes(url: string, id: string = ""): Observable<any> {
    return this._http.get<any>(`${this.baseURL}${url}`)
    .pipe(
      tap((data) => {
        console.log("--tap data respose--", data );
      }),
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  fetchJobsByLaneId(url: string, laneId: string = ""): Observable<any> {
    return this._http.get<any>(`${this.baseURL}${url}/${laneId}`)
    .pipe(
      tap((data) => {
        console.log("--tap data respose--", data );
      }),
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  fetchCertificateList(url: string): Observable<any>{
    return this._http.get<any>(`${this.baseURL}${url}`)
    .pipe(
      tap((data) => {
        console.log("--tap data respose--", data );
      }),
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  fetchQualificationList(url: string): Observable<any>{
    return this._http.get<any>(`${this.baseURL}${url}`)
    .pipe(
      tap((data) => {
        console.log("--tap data respose--", data );
      }),
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  addQualifications(url: string, list: ICertificate[]): Observable<any> {
    return this._http.post<any>(`${this.baseURL}${url}`,list)
    .pipe(
      tap((data) => {
        console.log("--tap data respose--", data );
      }),
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  addCertifications(url: string, list: ICertificate[]): Observable<any> {
    return this._http.post<any>(`${this.baseURL}${url}`,list)
    .pipe(
      tap((data) => {
        console.log("--tap data respose--", data );
      }),
      catchError(err => {
        throw err.error.error;
      })
    )
  }
  private errorHandler(error : HttpErrorResponse) {
    console.log("-----err handle 0---", error);
    throw error;
  }
}