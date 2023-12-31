import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanesComponent } from './add-lanes.component';

describe('AddLanesComponent', () => {
  let component: AddLanesComponent;
  let fixture: ComponentFixture<AddLanesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLanesComponent]
    });
    fixture = TestBed.createComponent(AddLanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
