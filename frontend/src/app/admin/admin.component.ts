import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlanetsData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  planetAppearanceFormGroup:FormGroup;
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
      texture: [null, Validators.required],
      position: [null, Validators.required],
      rotationSpeed: [null, Validators.required],
      orbitingSpeed: [null, Validators.required],
    });
  }
  
  onSubmit () {
    // let data = this._apiService.createPlanets();
    // let data: IPlanetsData = {...this.planetAppearanceFormGroup.value};
    this._apiService.createPlanets(this.planetAppearanceFormGroup.value);
    // console.log("-- data --", data);
  }

}
