import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComparatorComponent } from '@app/dialogs/comparator/comparator.component';
import { JobWalletComponent } from '@app/dialogs/job-wallet/job-wallet.component';
import { SkillPassportComponent } from '@app/dialogs/skill-passport/skill-passport.component';
import { WorkHabitComponent } from '@app/dialogs/work-habit/work-habit.component';
import { IPlanetsData } from '@app/interface/common.interface';
import { faCircleCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faCircleCheck = faCircleCheck;
  faCircleInfo = faCircleInfo;

  constructor (private _dialog: MatDialog) {}
  planetsData: IPlanetsData[] = [
    {name:"some", size: 20, position: 0, texture: "../../assets/mars_surface.jpg", rotation: 0.004, revolve: 0},
    {name:"some", size: 3.2, position: 58, texture: "../../assets/mercury.jpg", rotation: 0.004, revolve: 0.04},
    {name:"some", size: 5.8, position: 70, texture: "../../assets/mercury.jpg", rotation: 0.004, revolve: 0.01}
  ];
  openSkillPassportDialog () {
    const dialogRef = this._dialog.open(SkillPassportComponent,{
      enterAnimationDuration:"500ms",
      exitAnimationDuration:"500ms",
      panelClass: ['my-outlined-dialog']
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 
  openWorkHabitDialog () {
    const dialogRef = this._dialog.open(WorkHabitComponent,{
      enterAnimationDuration:"500ms",
      exitAnimationDuration:"500ms",
      panelClass: ['my-outlined-dialog']
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 
  openJobWalletDialog () {
    const dialogRef = this._dialog.open(JobWalletComponent,{
      enterAnimationDuration:"500ms",
      exitAnimationDuration:"500ms",
      panelClass: ['my-outlined-dialog']
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 
  openComparatorDialog () {
    const dialogRef = this._dialog.open(ComparatorComponent,{
      enterAnimationDuration:"500ms",
      exitAnimationDuration:"500ms",
      panelClass: ['my-outlined-dialog']
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 
}
