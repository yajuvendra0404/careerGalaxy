import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobsViewComponent } from '@app/dialogs/jobs-view/jobs-view.component';
import { IJobData, ILanesData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { PlanetService } from '@app/services/dataShare/planet.service';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { environment } from 'environments/environment.development';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lanes',
  templateUrl: './lanes.component.html',
  styleUrls: ['./lanes.component.scss',],
  encapsulation: ViewEncapsulation.None

})
export class LanesComponent {

  selectedPlanetId: string = "";
  lanesData:ILanesData[] = [];
  baseURL: string= environment.DOMAIN;
  isLaneSelected: boolean = false;
  jobData: IJobData[]=[]; 
  subscriptionStore : Subscription[] = [];
  constructor(
    private _planetService : PlanetService,
    private _apiService : ApiService,
    private _dialog: MatDialog,
    private _notifier: NotifierService 
  ) {}

  fetchLanesData (planetId:string) {
    this.subscriptionStore.push (
      this._apiService.fetchLanesByPlanetId(planetId).subscribe({
        next: (data) => {
          this.lanesData = data;
        },
        error: (e) => {
          this.lanesData = [];
          this._notifier.open(e.message, "error")
        }
      })
    );
  }

  getJobsData (laneId : string = "") {
    console.log(" --- lane id ---", laneId);
    this._apiService.fetchJobsByLaneId(laneId).subscribe({
        next: (data) => {
          this.jobData = data;
          this.openJobsViewDialog ();
        },
        error: (e) => {
          this.jobData = [];
          this._notifier.open(e.message, "error")
        }
    })

  }
  openJobsViewDialog () {
    
    const dialogRef =  this._dialog.open(JobsViewComponent,{
      data: this.jobData,
      enterAnimationDuration:"200ms",
      exitAnimationDuration:"200ms",
      panelClass: ['my-outlined-dialog']
    });

    this.subscriptionStore.push(
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
    )
  }
  ngOnInit(): void {
    this.subscriptionStore.push(
      this._planetService.planetId.subscribe({
        next: (data:string) => {
          console.log("-- planet ID --", data);
          if( data != "home" && data != "" && data != null){
            this.fetchLanesData(data);
          }
        },
        error: (error) => {
          console.log(" --- no data found error --- ", error);
        }
      })
    )
  }
  ngOnDestroy() {
    this.subscriptionStore.forEach( (ele) => {
      ele.unsubscribe();
    })
  }
  
}
