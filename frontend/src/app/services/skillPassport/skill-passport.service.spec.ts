import { TestBed } from '@angular/core/testing';

import { SkillPassportService } from './skill-passport.service';

describe('SkillPassportService', () => {
  let service: SkillPassportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillPassportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
