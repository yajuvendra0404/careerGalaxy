import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQualificationsComponent } from './add-qualifications.component';

describe('AddQualificationsComponent', () => {
  let component: AddQualificationsComponent;
  let fixture: ComponentFixture<AddQualificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQualificationsComponent]
    });
    fixture = TestBed.createComponent(AddQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
