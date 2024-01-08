import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IJobData, ILanesData, ISkillData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss']
})
export class AddJobsComponent {
  selectedLane: string = "";
  laneList: ILanesData[] = [];
  jobsFormGroup : FormGroup;
  skillArray: string[] = [ 
    "Reading",
    "Writing", 
    "Document Use", 
    "Digital Technology", 
    "Oral Communication", 
    "Money Math", 
    "Scheduling",
    "Budgeting",
    "Accounting",
    "Measurement",
    "Calculations",
    "Data Analysis",
    "Numerical Estimation",
    "Job Task Planning",
    "Problem Solving",
    "Finding Info",
    "Critical Thinking",
    "Work Safety",
    "Team Work",
    "Reliability",
    "Organization",
    "Work Independently",
    "Initiation",
    "Self-Advocacy",
    "Customer Service",
    "Enterpeneurship"
  ]; 

  constructor (
      private _formBuilder : FormBuilder,
      private _apiService: ApiService
    ) {

    this.jobsFormGroup =  _formBuilder.group(
      {
        laneId: [null, [Validators.required]],
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
        salary: [null, [Validators.required]],
        qualification: [null, [Validators.required]],
        skills: new FormArray([]),
      }
    )
  }

  createSkillsFields () {

    this.skillArray.forEach( ele => {
      const skillFormArray = this.jobsFormGroup.get('skills') as FormArray;
      skillFormArray.push(
        this._formBuilder.group({
          skillName: [ele, Validators.required],
          skillLevel: [null, Validators.required],
        })
      );
    })
    console.log("-jobs -form -group-",this.jobsFormGroup);

  }
  
  get skillControls () {
    return (<FormArray>this.jobsFormGroup.get('skills')).controls as FormGroup[];
  }

  fetchLanes () {
      this._apiService.fetchLanes().subscribe({
        next: (data) => {
          this.laneList = [...data];
          console.log(" --------- lane List --------", data);
        },
        error: (err) => {
          console.log("--------- err -------", err);
        }
      })
  }
  
  onSubmit () {

    this._apiService.createJobs(this.jobsFormGroup.getRawValue()).subscribe({
      next: (data)=> {
        console.log("data saved", data);
        this.jobsFormGroup.reset();
      },
      error: (err) => {
        console.log("error === ", err);
      }
    })
    
  }

  ngOnInit () {
    this.createSkillsFields();
    this.fetchLanes();
  }

}
