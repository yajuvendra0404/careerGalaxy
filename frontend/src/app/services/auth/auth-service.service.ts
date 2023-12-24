import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap , Subject, throwError, BehaviorSubject} from 'rxjs';
import { IAuthResponseData } from '@interfaces/common.interface';
import { User } from '@model/user.model';
import { Router } from '@angular/router';

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

  constructor( 
    private _http: HttpClient,
    private _router: Router
  ) { }

  signUp (email: string, password: string): Observable<IAuthResponseData> {
    return this._http.post<IAuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZFgYFCm4c6LfqMyTYdulA3JTDFF0J21s", {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe ( 
      tap( res => {
      let expiresIn = new Date().getTime() + +res.expiresIn * 1000; // the + plus sign in ""+res.expiresIn"" is used to convert the string into number
      let user  = new User(res.email, res.localId, res.idToken, expiresIn);
      this.userSubject.next(user);
    })) 
  }

  signIn(email: string, password: string): Observable<IAuthResponseData> {
    return this._http.post<IAuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZFgYFCm4c6LfqMyTYdulA3JTDFF0J21s", {
      email: email,
      password: password,
      returnSecureToken: true
    })
    .pipe (
      tap( res => {
      let expiresIn = new Date().getTime() + +res.expiresIn * 1000; // the + plus sign in ""+res.expiresIn"" is used to convert the string into number
      let user  = new User(res.email, res.localId, res.idToken, expiresIn);
      this.userSubject.next(user);
    } ))
  } 
  
  logout () {
    this.userSubject.next(null);
    this._router.navigate(["/auth"]);
  }
}



