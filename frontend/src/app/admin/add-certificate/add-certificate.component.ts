import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICertificate, ILanesData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-add-certificate',
  templateUrl: './add-certificate.component.html',
  styleUrls: ['./add-certificate.component.scss']
})
export class AddCertificateComponent {

  subscriptionStore: Subscription[] = [];
  certificateFormGroup: FormGroup;
  certificates: ICertificate[] = [];


  
// certificate
// qualification
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
    this._apiService.addCertifications(this.certificates).subscribe({
      next: (data)=> {
        console.log("-------data----",data)
        this.removeAllItems();
      },
      error: (err)=> {
        console.log("-------error---",err)
        this.removeAllItems();
      }
    })

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
