import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth-service.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  let _authService = inject(AuthService);
  let _router = inject(Router);
  return _authService.userSubject
    .pipe(
      take(1),
      map( user => {
        let isAuth = !!user;
        if (isAuth) return true
        else return _router.createUrlTree(["/auth"]);

        /* !!user it return true .. if the value is trueish .... i.e 
         * if the variable has any value that that value is considered as truish.*/
      })
    );
};
