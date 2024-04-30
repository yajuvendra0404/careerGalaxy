import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILanesData, IQualification } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-add-qualifications',
  templateUrl: './add-qualifications.component.html',
  styleUrls: ['./add-qualifications.component.scss']
})
export class AddQualificationsComponent {
  subscriptionStore: Subscription[] = [];
  certificateFormGroup: FormGroup;
  certificates: IQualification[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _notifier : NotifierService
  ) {
    this.certificateFormGroup = this._formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  remove(certificate: any): void { debugger;
    this.certificates = this.certificates.filter( ele => {
      return ele.name != certificate
    })
  }

  addNewCertificate() {
    let certificateName = this.certificateFormGroup.value;
    if(certificateName.name == null) {
      this._notifier.open("Please type the name of the certificate before adding", "error")
      return
    }
    this.certificates.push(certificateName);
    this.certificateFormGroup.reset();
  }

  onSubmit() {

  }


  removeAllItems () {
    this.certificates = []
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscriptionStore.forEach(el => {
      el.unsubscribe();
    })
  }
}
