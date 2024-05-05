import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth-service.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  assets: string = environment.ASSETS_PATH + "/";
  loginImg: string = this.assets + "login.avif"; 
  signUpImg: string = this.assets + "signUp.avif"
  loginForm: FormGroup;

  constructor(
    private _authService : AuthService ,
    private _router: Router
  ) { 
    this.loginForm = new FormGroup({
      "user_email":new FormControl( null, [ Validators.required ]),
      "user_password": new FormControl( null, [ Validators.required ])
    })
  }

  onSubmit (loginForm : FormGroup) {
    if(!loginForm.valid) return;
    this._authService.loginIn(loginForm.value.user_email, loginForm.value.user_password).subscribe({
      next : (data) => {
        console.log("login ----data-------------", data)
        this._router.navigate(["/home"])
      },
      error: (err) => {
        console.log("err ---", err);
      }
    })
    loginForm.reset();
  }
}
