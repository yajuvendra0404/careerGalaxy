import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { skillPassportGuard } from './skill-passport.guard';

describe('skillPassportGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => skillPassportGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
