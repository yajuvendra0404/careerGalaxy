import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWalletComponent } from './job-wallet.component';

describe('JobWalletComponent', () => {
  let component: JobWalletComponent;
  let fixture: ComponentFixture<JobWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobWalletComponent]
    });
    fixture = TestBed.createComponent(JobWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
