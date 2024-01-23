import { Injectable, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '@app/notifier/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(
    private _snackBar:  MatSnackBar,

  ) { }

  
  open(message : string, action: string) {
    this._snackBar.openFromComponent(NotifierComponent,  {
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
