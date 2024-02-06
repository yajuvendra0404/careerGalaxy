import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SkillPassportService } from '@app/services/skillPassport/skill-passport.service';

@Component({
  selector: 'app-skill-passport',
  templateUrl: './skill-passport.component.html',
  styleUrls: ['./skill-passport.component.scss']
})
export class SkillPassportComponent {

  selectedLane: string = "";
  selectedPrepLevel: string = "";
  selectedExpYear: string ="";
  skillPassportFormGroup : FormGroup;

  prepLevelList: number[] =[
    1,2,3,4,5
  ]; 
  experienceYearList: number[] =[
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
  ]; 
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
    private _skillPassport : SkillPassportService) {
    this.skillPassportFormGroup =  _formBuilder.group(
      {
        
        qualification: [null, [Validators.required]],
        certification: [null, [Validators.required]],
        experience : [null, [Validators.required]],
        levelOfPrep: [null, [Validators.required]],
        skills: new FormArray([]),
      
      }
    )
  }

  createSkillsFields () {
    this.skillArray.forEach( ele => {
      const skillFormArray = this.skillPassportFormGroup.get('skills') as FormArray;
      skillFormArray.push(
        this._formBuilder.group({
          skillName: [ele, Validators.required],
          skillLevel: [null, Validators.required],
        })
      );
    })
  }

  get skillControls () {
    return (<FormArray>this.skillPassportFormGroup.get('skills')).controls as FormGroup[];
  }


  onSubmit () {
    this._skillPassport.addToSkillPasport({...this.skillPassportFormGroup.value, stamped: true });
    this.skillPassportFormGroup.reset();
  }

  ngOnInit () {
    this.createSkillsFields();
  }
}
