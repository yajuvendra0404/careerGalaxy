import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth-service.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  
  assets: string = environment.ASSETS_PATH + "/";
  loginImg: string = this.assets + "login.avif"; 
  signUpImg: string = this.assets + "signUp.avif"
  signInForm: FormGroup;

  constructor(
    private _authService : AuthService ,
    private _router: Router
  ) { 
    this.signInForm = new FormGroup({
      "user_email":new FormControl( null, [ Validators.required ]),
      "user_first_name":new FormControl( null, [ Validators.required ]),
      "user_last_name":new FormControl( null, [ Validators.required ]),
      "user_password": new FormControl( null, [ Validators.required ]),
      "user_re-password": new FormControl( null, [ Validators.required ]),
      "user_role": new FormControl( "STUDENT", [ Validators.required ])
    })
  }

  onSubmit (signInForm : FormGroup) {
    if(!signInForm.valid) return;
    this._authService.signUp(this.signInForm.value).subscribe({
      next : (data) => {
        console.log("data", data)
        // this._router.navigate(["/home"])
      },
      error: (err) => {
        console.log("err ---", err);
      }
    })
    signInForm.reset();
  }
}
