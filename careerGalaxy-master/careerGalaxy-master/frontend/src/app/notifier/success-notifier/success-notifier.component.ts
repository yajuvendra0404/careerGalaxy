import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

interface ISnackBar { 
  message:string, 
  snackBar: MatSnackBar, 
  action:string 
}

@Component({
  selector: 'app-success-notifier',
  templateUrl: './success-notifier.component.html',
  styleUrls: ['./success-notifier.component.scss']
})
export class SuccessNotifierComponent {
  notifierData : ISnackBar;
  icon : string= "";
  constructor( 
    @Inject(MAT_SNACK_BAR_DATA) data: ISnackBar
  ){
    this.notifierData = {...data};
    
  }


}
