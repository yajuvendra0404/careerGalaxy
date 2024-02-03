import { Injectable } from '@angular/core';
import { ISkillPassport } from '@app/interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillPassportService {
  personalskill!: ISkillPassport;

  addToSkillPasport (skills: ISkillPassport) {
    this.personalskill = {...skills};
  }

  getSkillPassport (): ISkillPassport {
    if(!this.personalskill) throw "Please fill up the skill passport .";
    return this.personalskill;
  }

}
