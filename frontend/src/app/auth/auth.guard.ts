import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "@app/services/auth/auth-service.service";
import { Observable, map, tap,take } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

    constructor (
        private _authService: AuthService,
        private _router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this._authService.userSubject
        .pipe(
            take(1), 
            map( user => {
            let isAuth =   !!user;
            if(isAuth) return true
            else return this._router.createUrlTree(["/auth"]); 
            
            /* !!user it return true .. if the value is trueish .... i.e 
             * if the variable has any value that that value is considered as truish.*/
        })
        // ,
        // tap( isAuth => {
        //     console.log("isAuth - ", isAuth);
        //     if(!isAuth) this._router.navigate(["/auth"])
        // })
        )

    }
}