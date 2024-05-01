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
  qualificationFormGroup: FormGroup;
  qualifications: IQualification[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _notifier : NotifierService
  ) {
    this.qualificationFormGroup = this._formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  remove(qualificationName: any): void {
    this.qualifications = this.qualifications.filter( ele => {
      return ele.name != qualificationName
    })
  }

  addNewQualification() {
    let qualificationName = this.qualificationFormGroup.value;
    if(qualificationName.name == null) {
      this._notifier.open("Please type the name of the certificate before adding", "error")
      return
    }
    this.qualifications.push(qualificationName);
    this.qualificationFormGroup.reset();
  }

  onSubmit() {
    this._apiService.addQualifications(this.qualifications).subscribe({
      next: (data) => {
        this.removeAllItems()
        console.log("data --------- ", data)
      },
      error: (err)=>{
        this.removeAllItems()
        console.log("error --------- ", err)
      }
    })
  }


  removeAllItems () {
    this.qualifications = []
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscriptionStore.forEach(el => {
      el.unsubscribe();
    })
  }
}
