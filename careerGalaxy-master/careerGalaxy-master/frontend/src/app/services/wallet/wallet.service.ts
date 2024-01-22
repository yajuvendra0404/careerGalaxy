import { Injectable } from '@angular/core';
import { IJobData } from '@app/interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  jobsInWallet: IJobData[]=  [];

  addToWallet (jobs: IJobData) {
    console.log(" ------ wallet ------",  jobs);
    this.jobsInWallet.push(jobs);
  }

  getJobsInWallet (): IJobData[] {
    return this.jobsInWallet;
  }

  constructor() { }

}
