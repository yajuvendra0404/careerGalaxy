import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '@app/model/user.model';
import { AuthService } from '@app/services/auth/auth-service.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let _authService = inject(AuthService);
  let _router = inject(Router);

  return _authService.userSubject
    .pipe(
      take(1),
      map( user => {
        let userData = user;
        let isAuth = !!user;
        if (isAuth) {
          /* If the route doesnot have any role based restrictions */
          if(Object.keys(route.data).length === 0) return true;  

          /* Get the users role from User models */ 
          let currentRole = userData?.getRole();

          let isAuthorized = route.data['role'].filter( (ele:string) => {
            return ele === currentRole;
          })
          if (isAuthorized.length > 0 ) return true
          else return false

        }
        else return _router.createUrlTree(["/auth"]);

        /* !!user it return true .. if the value is trueish .... i.e 
         * if the variable has any value that that value is considered as truish.*/
      })
    );
};
