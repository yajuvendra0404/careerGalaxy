import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseURL: string= environment.DOMAIN;
  constructor(private _http: HttpClient) {}

  fetchPlanets(url: string, id: string): Observable<any> {
    return this._http.get<any>(`${this.baseURL}${url}/${id}`)
    .pipe(catchError(this.errorHandler.bind(this)))
  }
  
  createPlanets(url: string, Json:any) : Observable<any> {
    return this._http.post<any>(`${this.baseURL}${url}`,Json)
    .pipe(catchError(this.errorHandler.bind(this)))
  }

  private errorHandler() {
    return "error occured";
  }
}
