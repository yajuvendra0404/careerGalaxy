import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHabitComponent } from './work-habit.component';

describe('WorkHabitComponent', () => {
  let component: WorkHabitComponent;
  let fixture: ComponentFixture<WorkHabitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkHabitComponent]
    });
    fixture = TestBed.createComponent(WorkHabitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
