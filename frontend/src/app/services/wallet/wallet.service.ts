import { Injectable } from '@angular/core';
import { IJobData } from '@app/interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  jobsInWallet: IJobData[]=[];

  addToWallet (jobs: IJobData) {
    if(this.jobsInWallet.length == 3) 
      throw "User cannot add more that 3 jobs in the wallet.";

    let existingJobs = this.jobsInWallet.filter( (ele) => ele._id  == jobs._id );
    if( existingJobs.length > 0 ) 
      throw "Job already exists in the wallet."

    this.jobsInWallet.push(jobs);
  }

  getJobsInWallet (): IJobData[] {
    if(this.jobsInWallet.length == 0) throw "No job have been added to the wallet.";
    return this.jobsInWallet;
  }

  constructor() { }

}
