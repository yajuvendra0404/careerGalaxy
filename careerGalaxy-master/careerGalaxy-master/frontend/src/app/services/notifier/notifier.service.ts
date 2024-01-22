import { Injectable, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { ErrorNotifierComponent } from '@app/notifier/error-notifier/error-notifier.component';
import { SuccessNotifierComponent } from '@app/notifier/success-notifier/success-notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(
    private _snackBar:  MatSnackBar,

  ) { }

  
  open(message : string, action: string) {
    this._snackBar.openFromComponent(SuccessNotifierComponent,  {
      duration: 2000,
      data: {
        message: message,
        snackBar: this._snackBar,
        action: action.toLowerCase()
      },
      panelClass: action.toLowerCase()
    });
  }
}
