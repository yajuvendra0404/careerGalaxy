import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessNotifierComponent } from './success-notifier.component';

describe('SuccessNotifierComponent', () => {
  let component: SuccessNotifierComponent;
  let fixture: ComponentFixture<SuccessNotifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessNotifierComponent]
    });
    fixture = TestBed.createComponent(SuccessNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
