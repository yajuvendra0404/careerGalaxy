import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { IPlanetsData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-planet',
  templateUrl: './add-planet.component.html',
  styleUrls: ['./add-planet.component.scss']
})
export class AddPlanetComponent {
  planetAppearanceFormGroup:FormGroup;
  selectedFile!: File;
  subscriptionStore: Subscription[] = [];
  @ViewChild(MatStepper) stepper!: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _notifier : NotifierService
  ) {
    this.planetAppearanceFormGroup = this._formBuilder.group({
      name: [null,Validators.required],
      size: [null,Validators.required],
      texture: [null,Validators.required],
      position: [null,Validators.required],
      rotationSpeed: [null,Validators.required],
      orbitingSpeed: [null,Validators.required],
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
      this._apiService.createPlanet(formData).subscribe({
        next :(data) => {
          this.planetAppearanceFormGroup.reset();
          this._notifier.open(data['message'],"done");
        },
        error: (err) => this._notifier.open(err.message, "error") 
      })
    );

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
