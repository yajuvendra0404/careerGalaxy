import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IJobData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.scss']
})
export class JobsViewComponent {
  panelOpenState = false;
  jobData: IJobData[]=[]; 
  subscriptionStore : Subscription[] =[];
  constructor (
    private _apiService : ApiService,
    @Inject(MAT_DIALOG_DATA) public data: IJobData[]
  ) {
    this.jobData = [...data];
  }

  getJobId (index: number, item: any) {
    return item._id; 
  }
  addToWallet () {
    console.log("added to wallet");
  }
  ngOnInit() {} 
}
