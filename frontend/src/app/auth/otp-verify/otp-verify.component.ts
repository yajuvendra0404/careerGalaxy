import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth-service.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent {
  
  assets: string = environment.ASSETS_PATH + "/";
  loginImg: string = this.assets + "login.avif"; 
  signUpImg: string = this.assets + "signUp.avif"
  verifyingForm: FormGroup;

  constructor(
    private _authService : AuthService ,
    private _router: Router
  ) { 
    this.verifyingForm = new FormGroup({
      "enter_OTP":new FormControl( null, [ Validators.required ]),
    })
  }

  onSubmit (verifyingForm : FormGroup) {
    if(!verifyingForm.valid) return;
    this._authService.signUp(this.verifyingForm.value).subscribe({
      next : (data) => {
        console.log("data", data)
        // this._router.navigate(["/home"])
      },
      error: (err) => {
        console.log("err ---", err);
      }
    })
    verifyingForm.reset();
  }
}
