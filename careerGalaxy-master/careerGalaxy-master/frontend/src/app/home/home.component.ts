import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComparatorComponent } from '@app/dialogs/comparator/comparator.component';
import { JobWalletComponent } from '@app/dialogs/job-wallet/job-wallet.component';
import { SkillPassportComponent } from '@app/dialogs/skill-passport/skill-passport.component';
import { WorkHabitComponent } from '@app/dialogs/work-habit/work-habit.component';
import { IPlanetsData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { PlanetService } from '@app/services/dataShare/planet.service';
import { faCircleCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  faCircleCheck = faCircleCheck;
  faCircleInfo = faCircleInfo;

  constructor (
    private _dialog: MatDialog,
    private _apiService: ApiService,
    private _planetService : PlanetService,  
  ) {}
  planetsData: IPlanetsData[] = [
    {_id:"home", name:"earth",size: 70, position: 0, texture: "uploads/earth.jpg",rotationSpeed: 0.0, orbitingSpeed: 0.002}
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

  ngOnInit() {
    this._planetService.planetData.next(this.planetsData);
  }

}

//{_id:"home", name:"earth",size: 70, position: 0, texture: "earth.jpg",rotationSpeed: 0.0, orbitingSpeed: 0.002}
