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
    return this.personalskill;
  }

}
