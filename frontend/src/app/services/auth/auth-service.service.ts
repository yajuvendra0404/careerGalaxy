import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap , Subject, throwError, BehaviorSubject} from 'rxjs';
import { IAuthResponseData, IUserData } from '@interfaces/common.interface';
import { User } from '@model/user.model';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*
    BehaviorSubject has the characteristic that it stores the “current” value. 
    This means that you can always directly get the last emitted value from the BehaviorSubject.
    so, if a component is loaded after the value has been emited. It will still get the previous value of the logged in user.
  */
  userSubject= new BehaviorSubject<User | null>(null); 

  private baseURL: string= environment.DOMAIN;

  constructor( 
    private _http: HttpClient,
    private _router: Router
  ) { }

  signUp (userData: IUserData): Observable<IAuthResponseData> {
    return this._http.post<IAuthResponseData>(`${this.baseURL}signup`,userData).pipe ( 
        tap( res => {
          console.log(" --------- res --------", res)
        }
      )
    ) 
  }

  loginIn(user_email: string, user_password: string): Observable<IAuthResponseData> {
    return this._http.post<IAuthResponseData>(`${this.baseURL}login`, {
      user_email,
      user_password,
    })
    .pipe (
      tap( res => {
        console.log("res ---- while authenticating",res);
      // let expiresIn = new Date().getTime() + +res.expiresIn * 1000; // the + plus sign in ""+res.expiresIn"" is used to convert the string into number
        let user  = new User(res.data.user_email, res.data.user_first_name, res.data.user_last_name, res.data.user_role);
        this.userSubject.next(user);
    } ))
  } 
  
  logout () {
    this.userSubject.next(null);
    this._router.navigate(["/auth"]);
  }
}



