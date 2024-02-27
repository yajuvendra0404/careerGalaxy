import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth-service.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode: boolean = true;
  assets: string = environment.ASSETS_PATH + "/";
  loginImg: string = this.assets + "login.avif"; 
  signUpImg: string = this.assets + "signUp.avif"
  loginForm: FormGroup;

  constructor(
    private _authService : AuthService ,
    private _router: Router
  ) { 
    this.loginForm = new FormGroup({
      "email":new FormControl( null,[ Validators.required ]),
      "password": new FormControl( null, [ Validators.required ])
    })
  }

  onSubmit (loginForm : FormGroup) {
    if(!loginForm.valid) return;
    this._authService.signIn(loginForm.value.email, loginForm.value.password).subscribe({
      next : (data) => {
        console.log("data", data)
        this._router.navigate(["/home"])
      },
      error: (err) => {
        console.log("err ---", err);
      }
    })
    loginForm.reset();
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
