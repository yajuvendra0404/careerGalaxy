import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  IJobData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { WalletService } from '@app/services/wallet/wallet.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs-view',
  templateUrl: './jobs-view.component.html',
  styleUrls: ['./jobs-view.component.scss', '../dialogs-common.scss']
})
export class JobsViewComponent {
  panelOpenState = false;
  jobData: IJobData[]=[]; 
  subscriptionStore : Subscription[] =[];
  constructor (
    private _apiService : ApiService,
    @Inject(MAT_DIALOG_DATA) public data: IJobData[],
    private _walletService : WalletService,
    private _notifier : NotifierService
  ) {
    this.jobData = [...data];
  }
 
  getJobId (index: number, item: any) {
    return item._id; 
  }
  addToWallet (job: IJobData) {
    try {
      this._walletService.addToWallet(job);
      this._notifier.open( job.title+" added to the wallet.", "done")
    } catch (e:any) {
      this._notifier.open(e,"error");
    }
  }
  ngOnInit() {} 
}
