import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

interface ISnackBar { 
  message:string, 
  snackBar: MatSnackBar, 
  action:string 
}
@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent {
  notifierData : ISnackBar;
  icon : string= "";
  constructor( 
    @Inject(MAT_SNACK_BAR_DATA) data: ISnackBar
  ){
    this.notifierData = {...data};
  }

}
