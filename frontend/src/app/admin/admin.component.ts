import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  lanesAndJobsFormGroup: FormGroup;
  
  initLanesAndJobsFormGroup  = {
    lanes: new FormArray([]),
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService
  ) {
    this.planetAppearanceFormGroup = this._formBuilder.group({
      name: [null,Validators.required],
      size: [null,Validators.required],
      texture: [null,Validators.required],
      position: [null,Validators.required],
      rotationSpeed: [null,Validators.required],
      orbitingSpeed: [null,Validators.required],
    });
    this.lanesAndJobsFormGroup = this._formBuilder.group(this.initLanesAndJobsFormGroup);
  }
  get lanesControl () {
    return (<FormArray>this.lanesAndJobsFormGroup.get('lanes')).controls;
  }
  addNewLane() {
    let formControl = new FormControl(null,[Validators.required]); 
    (<FormArray>this.lanesAndJobsFormGroup.get('lanes')).push(formControl);
  }
  onSubmit () {

    const formData = new FormData();
    
    formData.append('name', this.planetAppearanceFormGroup.value.name);
    formData.append('size', this.planetAppearanceFormGroup.value.size);
    formData.append('texture', this.selectedFile);
    formData.append('position', this.planetAppearanceFormGroup.value.position);
    formData.append('rotationSpeed', this.planetAppearanceFormGroup.value.rotationSpeed);
    formData.append('orbitingSpeed', this.planetAppearanceFormGroup.value.orbitingSpeed);
    formData.append('lanes', JSON.stringify(this.lanesAndJobsFormGroup.value.lanes));


    this.subscriptionStore.push(
      this._apiService.createPlanet(formData).subscribe({
        next :(data) => {
          this.planetAppearanceFormGroup.reset();
          this.lanesAndJobsFormGroup.reset(this.initLanesAndJobsFormGroup);
        },
        error: (err) => console.log(" error occured", err) 
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
