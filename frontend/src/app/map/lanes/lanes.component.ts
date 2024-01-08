import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobsViewComponent } from '@app/dialogs/jobs-view/jobs-view.component';
import { ILanesData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { PlanetService } from '@app/services/dataShare/planet.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-lanes',
  templateUrl: './lanes.component.html',
  styleUrls: ['./lanes.component.scss',]
})
export class LanesComponent {

  selectedPlanetId: string = "";
  lanesData:ILanesData[] = [];
  baseURL: string= environment.DOMAIN;
  isLaneSelected: boolean = false;
  constructor(
    private _planetService : PlanetService,
    private _apiService : ApiService,
    private _dialog: MatDialog,
  ) {}

  fetchLanesData (planetId:string) {
    this._apiService.fetchLanesByPlanetId(planetId).subscribe({
      next: (data) => {
        this.lanesData = data;
      },
      error: (error) => {
        console.log("-- error --", error);
      }
    });
  }

  openJobsViewDialog () {
    const dialogRef = this._dialog.open(JobsViewComponent,{
      enterAnimationDuration:"500ms",
      exitAnimationDuration:"500ms",
      panelClass: ['my-outlined-dialog']
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this._planetService.planetId.subscribe({
      next: (data:string) => {
        this.fetchLanesData(data); 
      },
      error: (error) => {
        console.log("error", error);
      }
    })
  }
}
