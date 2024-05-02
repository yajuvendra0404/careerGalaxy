import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth-service.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  assets: string = environment.ASSETS_PATH + "/";
  loginImg: string = this.assets + "login.avif"; 
  signUpImg: string = this.assets + "signUp.avif"
  signInForm: FormGroup;

  constructor(
    private _authService : AuthService ,
    private _router: Router
  ) { 
    this.signInForm = new FormGroup({
      "email":new FormControl( null, [ Validators.required ]),
      "password": new FormControl( null, [ Validators.required ])
    })
  }

  onSubmit (signInForm : FormGroup) {
    if(!signInForm.valid) return;
    this._authService.signIn(signInForm.value.email, signInForm.value.password).subscribe({
      next : (data) => {
        console.log("data", data)
        this._router.navigate(["/home"])
      },
      error: (err) => {
        console.log("err ---", err);
      }
    })
    signInForm.reset();
  }
}
