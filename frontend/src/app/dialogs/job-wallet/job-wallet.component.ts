import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { IJobData } from '@app/interface/common.interface';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { WalletService } from '@app/services/wallet/wallet.service';

@Component({
  selector: 'app-job-wallet',
  templateUrl: './job-wallet.component.html',
  styleUrls: ['./job-wallet.component.scss']
})
export class JobWalletComponent {
  constructor (
    @Inject(MAT_DIALOG_DATA) public jobsInWallet :IJobData[]
  ) {}

  trackByIdFn ( index: number, element: IJobData) {
    return element._id;
  }

  ngAfterViewInit () {

  }
  

}
