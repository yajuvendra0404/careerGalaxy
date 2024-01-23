import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILanesData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-lanes',
  templateUrl: './add-lanes.component.html',
  styleUrls: ['./add-lanes.component.scss']
})
export class AddLanesComponent {
  
  selectedFile!: File;
  subscriptionStore: Subscription[] = [];
  lanesFormGroup: FormGroup;
  selectedLaneImage: File[] = [];

  selectedPlanet: string = "";
  selectedCar: string="";

  planetList: {_id: String, name: String}[] = [];
  isPlanetSelected: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _apiService: ApiService,
    private _notifier : NotifierService
  ) {
    this.lanesFormGroup = this._formBuilder.group({
      lanes: new FormArray([]),
    });
  }

  get lanesControl () {
    return (<FormArray>this.lanesFormGroup.get('lanes')).controls as FormGroup[];
  }
  initLaneFormGroup() {
    return this._formBuilder.group({
      laneName: [null, Validators.required],
      laneImage: [null, Validators.required],
    });
  }
  addNewLane() {
    const lanesArray = this.lanesFormGroup.get('lanes') as FormArray;
    lanesArray.push(
      this._formBuilder.group({
        ['laneName']: [null, Validators.required],
        ['laneImage']: [null, Validators.required],
      })
    );
  }
  getPlanetList () {
    this.subscriptionStore.push(
      this._apiService.fetchPlanets("").subscribe({
        next: (data) => {
          data.forEach(ele => {
            if(ele.name != "home") this.planetList.push({ _id:ele._id, name:ele.name});
          })
        },
        error: (err) => {

        }
      })
    )
  }
  onSubmit() {
    const formData = new FormData();
    this.lanesFormGroup.value.lanes.forEach((ele:ILanesData ) => {
      ele.planetId = this.selectedPlanet;
    });
    this.selectedLaneImage.forEach( ( ele,index ) => {
      this.lanesFormGroup.value.lanes[index].laneImage = ele.name;
    })
    formData.append("data", JSON.stringify(this.lanesFormGroup.value.lanes));

    this.selectedLaneImage.forEach((ele: File,index: number) => {
      formData.append(`images_${index}`,ele);
    });

    this.subscriptionStore.push(
      this._apiService.createLanes(formData).subscribe({
        next :(data) => {

          this.removeAllItems();

        },
        error: (err) =>  this._notifier.open(err.message, "error")
      })
    );
  }
  onLaneImageSelected (event:any) {
    this.selectedLaneImage.push(event.target.files[0]);
  }
  removeItem(index: number) {
    const lanesArray = this.lanesFormGroup.get('lanes') as FormArray;
    // Remove the item at the specified index from the FormArray
    lanesArray.removeAt(index);
    // Remove the corresponding selectedLaneImage
    this.selectedLaneImage.splice(index, 1);
  }
  removeAllItems () {
    /* remove all images from the array*/
    this.selectedLaneImage = [];
    /*reset the form fields*/
    this.lanesFormGroup.reset();

    /*reset the planet seletctor "Mat-select"*/
    this.selectedPlanet = "";

    /* remove all controls inside FormArray inside laneFormGroup */
    const lanesArray = this.lanesFormGroup.get('lanes') as FormArray;
    lanesArray.clear();
  }
  ngOnInit() {
    this.getPlanetList();
  }
  ngOnDestroy() {
    this.subscriptionStore.forEach(el => {
      el.unsubscribe();
    })
  }

}
