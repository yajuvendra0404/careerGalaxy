import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComparatorComponent } from '@app/dialogs/comparator/comparator.component';
import { JobWalletComponent } from '@app/dialogs/job-wallet/job-wallet.component';
import { SkillPassportComponent } from '@app/dialogs/skill-passport/skill-passport.component';
import { WorkHabitComponent } from '@app/dialogs/work-habit/work-habit.component';
import { IPlanetsData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { PlanetService } from '@app/services/dataShare/planet.service';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { WalletService } from '@app/services/wallet/wallet.service';
import { faCircleCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { environment } from 'environments/environment.development';

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
    private _walletService : WalletService,
    private _notifier: NotifierService
  ) {}
  planetsData: IPlanetsData[] = [
    {_id:"home", name:"earth",size: 70, position: 0, texture: `uploads/earth.jpg`,rotationSpeed: 0.0, orbitingSpeed: 0.002}
  ];
  
  // try{
  //   this.jobsInWallet = this._walletService.getJobsInWallet();
  //   console.log("this.jobInWallet---------", this.jobsInWallet)
  // } catch (e: any) {
  //   this._notifier.open(e, "error")
  // } 
  openSkillPassportDialog () {
    const dialogRef = this._dialog.open(SkillPassportComponent,{
      enterAnimationDuration:"200ms",
      exitAnimationDuration:"200ms",
      panelClass: ['my-outlined-dialog']
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 
  openWorkHabitDialog () {
    const dialogRef = this._dialog.open(WorkHabitComponent,{
      enterAnimationDuration:"200ms",
      exitAnimationDuration:"200ms",
      panelClass: ['my-outlined-dialog']
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 
  // try{
  //   this.jobsInWallet = this._walletService.getJobsInWallet();
  //   console.log("this.jobInWallet---------", this.jobsInWallet)
  // } catch (e: any) {
  //   this._notifier.open(e, "error")
  // } 
  openJobWalletDialog () {
    try {
      let jobsInWallet = this._walletService.getJobsInWallet();
      const dialogRef = this._dialog.open(JobWalletComponent,{
        data: jobsInWallet,
        enterAnimationDuration:"200ms",
        exitAnimationDuration:"200ms",
        panelClass: ['my-outlined-dialog']
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } catch (e: any) {
        this._notifier.open(e, "warning")
    } 

  } 
  openComparatorDialog () {
    const dialogRef = this._dialog.open(ComparatorComponent,{
      enterAnimationDuration:"200ms",
      exitAnimationDuration:"200ms",
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
