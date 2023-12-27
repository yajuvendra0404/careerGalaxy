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
  selectedFile!: File;
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
      name: [null],
      size: [null, Validators.required],
      texture: [null, Validators.required],
      position: [null, Validators.required],
      rotationSpeed: [null, Validators.required],
      orbitingSpeed: [null, Validators.required],
    });
  }
  
  onSubmit () {
    const formData = new FormData();

    formData.append('name', this.planetAppearanceFormGroup.value.name);
    formData.append('size', this.planetAppearanceFormGroup.value.size);
    formData.append('texture', this.selectedFile);
    formData.append('position', this.planetAppearanceFormGroup.value.position);
    formData.append('rotationSpeed', this.planetAppearanceFormGroup.value.rotationSpeed);
    formData.append('orbitingSpeed', this.planetAppearanceFormGroup.value.orbitingSpeed);

    this.subscriptionStore.push(
      this._apiService.createPlanet(formData).subscribe(data => {
        console.log("subscription data --", data);
      })
    );
    console.log("-- data --", {...this.planetAppearanceFormGroup.value});
  }
  onFileSelected (event:any) {
    this.selectedFile = event.target.files[0];
  }
  ngOnDestroy() {
    this.subscriptionStore.forEach(el => {
      el.unsubscribe();
    })
  }
}
