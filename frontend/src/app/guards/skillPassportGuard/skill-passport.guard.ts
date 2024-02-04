import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NotifierService } from '@app/services/notifier/notifier.service';
import { SkillPassportService } from '@app/services/skillPassport/skill-passport.service';

export const skillPassportGuard: CanActivateFn = (route, state) => {

  let _skillPassportService = inject(SkillPassportService);
  let _notifier = inject(NotifierService);
  let _router = inject(Router);

    if( _skillPassportService.getSkillPassport() && _skillPassportService.getSkillPassport().stamped ) return true;
    else {
      _notifier.open("Please fill up the skill passport.", "warning");
      return _router.createUrlTree(["/home"]);
    }
};
