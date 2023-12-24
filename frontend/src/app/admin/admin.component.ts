import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlanetsData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  planetAppearanceFormGroup:FormGroup;
  subscriptionStore: Subscription[] = [];
  skillPassportFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  
  isEditable = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService
  ) {
    this.planetAppearanceFormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      size: [null, Validators.required],
      texture: [null],
      position: [null, Validators.required],
      rotationSpeed: [null, Validators.required],
      orbitingSpeed: [null, Validators.required],
    });
  }
  
  onSubmit () {
    this.subscriptionStore.push(
      this._apiService.createPlanet(this.planetAppearanceFormGroup.value).subscribe(data => {
        console.log("subscription data --", data);
      })
    );
    console.log("-- data --", this.planetAppearanceFormGroup.value);
  }
  ngDestroy() {
    this.subscriptionStore.forEach(el => {
      el.unsubscribe();
    })
  }
}
