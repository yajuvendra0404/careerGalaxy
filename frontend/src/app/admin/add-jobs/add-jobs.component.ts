import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IJobData, ILanesData, ISkillData } from '@app/interface/common.interface';
import { ApiService } from '@app/services/api/api.service';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss']
})
export class AddJobsComponent {
  selectedLane: string = "";
  selectedPrepLevel: string = "";
  selectedExpYear: string ="";

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
  prepLevelList: number[] =[
    1,2,3,4,5
  ]; 
  experienceYearList: number[] =[
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
  ]; 
  
  constructor (
      private _formBuilder : FormBuilder,
      private _apiService: ApiService,
      private _notifier: NotifierService
    ) {

    this.jobsFormGroup =  _formBuilder.group(
      {
        lane: [null, [Validators.required]],
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
        salary: [null, [Validators.required]],
        qualification: [null, [Validators.required]],
        
        certification: [null, [Validators.required]],
        responsibilites: [null, [Validators.required]],
        experience : [null, [Validators.required]],
        levelOfPrep: [null, [Validators.required]],
       
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
        console.log(" --- data -- on submit save", data);
        this.jobsFormGroup.reset();
        // this._notifier.open(data.message,"done");
      },
      error: (err) => {
        this._notifier.open(err.message, "error");
      }
    })
    
  }

  ngOnInit () {
    this.createSkillsFields();
    this.fetchLanes();
  }

}
