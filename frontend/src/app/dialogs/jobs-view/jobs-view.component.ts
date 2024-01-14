import { Component } from '@angular/core';
import { IJobData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.scss']
})
export class JobsViewComponent {
  panelOpenState = false;
  jobData: IJobData[]=[]; 
  constructor (
    private _apiService : ApiService,
    // private _dataShareService : 
  ) {}

  getJobs() {
    this._apiService.fetchJobsByLaneId("1704069990719-banking lane").subscribe({
      next: (data) => {
        this.jobData = data;
      },
      error: (err) => {

      }
    })
  }
  getJobId (index: number, item: any) {
    return item._id; 
  }
  addToWallet () {
    console.log("added to wallet");
  }
  ngOnInit() {
    this.getJobs();
  } 
}
